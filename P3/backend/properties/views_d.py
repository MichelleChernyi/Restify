from django.shortcuts import render
from .models import Property, Availability, Image, Reservation, Amenities
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import PropertySerializer, ReservationSerializer
from rest_framework.response import Response
from rest_framework import status
from .paginations import PropertiesList
from django.shortcuts import get_object_or_404
from accounts.models import Notification
from rest_framework.decorators import api_view

@api_view(('GET',))
def get_user_properties(request):
    if not request.user.is_authenticated:
        return Response(data={'authorization': 'You are not authorized.'}, status=403)
    properties = Property.objects.all().filter(owner=request.user)
    data = []
    for p in properties:
        allimages = Image.objects.all().filter(my_property=p)
        images = [request.build_absolute_uri(image.image.url) for image in allimages]
        data.append({
            'id': p.pk,
            'title': p.title,
            'description': p.description,
            'location': p.location,
            'num_bed': p.num_bed,
            'num_bath': p.num_bath,
            'num_guests': p.num_guests,
            'price': p.price,
            'images': images,
        })
    return Response({'properties': data})

# CRUD PROPERTIES
class CreatePropertyView(CreateAPIView):
    serializer_class = PropertySerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.context["owner"] = request.user
        if 'amenities' in request.data:
            serializer.context["amenities"] = request.data['amenities']
        if 'image' in request.data:
            serializer.context['image'] = request.data['image']
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response({'id': instance.pk, 'data': serializer.data})
    
class UpdatePropertyView(UpdateAPIView):
    serializer_class = PropertySerializer
    permission_classes = (IsAuthenticated,)
    queryset = Property.objects.all()

    def update(self, request, *args, **kwargs):
        # auth
        try:
            instance = self.get_object()
        except:
            return Response(data={'property': f'Property with id:{kwargs["pk"]} does not exist'}, status=404)
        if request.user != instance.owner:
            return Response(data={'authorization': f'You are not authorized.'}, status=403)
        if 'amenities' in self.request.data:
            amenity_name_list = list(self.request.data['amenities'].split(','))
            amenity_name_list = [e.strip() for e in amenity_name_list]
            amenities = []
            for amenity_name in amenity_name_list:
                try:
                    am = Amenities.objects.get(name=amenity_name)
                    amenities.append(am)
                except:
                    return Response(data={'amenities': f'{amenity_name} not an amenity'}, status=404)
            instance.amenities.clear()
            for am in amenities:
                instance.amenities.add(am)
        if 'image' in self.request.data:
            i = Image.objects.create(
                image = self.request.data['image'],
                my_property = instance
            )
            i.save()
        return super().update(request, *args, **kwargs)

        
class DeletePropertyView(DestroyAPIView):
    serializer_class = PropertySerializer
    permission_classes = (IsAuthenticated,)
    queryset = Property.objects.all()

    def delete(self, request, *args, **kwargs):
        try:
            r = Property.objects.get(pk=kwargs['pk'])
        except:
            return Response(data={'property': 'This property does not exist.'}, status=404)
        if request.user == r.owner:
            super().delete(request, *args, **kwargs)
            return Response(data={'property': 'Successfully Deleted'}, status=200)
        else:
            return Response(data={'authorization': 'You are not authorized.'}, status=403)

# CRUD RESERVATIONS
class CreateReservationView(CreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            prop = Property.objects.get(pk=kwargs['pk'])
        except:
            return Response(data={'property': f'Property with id:{kwargs["pk"]} does not exist'}, status=404)

            
        serializer = self.serializer_class(data=request.data)
        serializer.context['user'] = request.user
        serializer.context['property'] = prop
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        #     content = models.TextField()
    #     belongs_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, db_constraint=False)
    # c   leared = models.BooleanField(default=False)
        notif = Notification.objects.create(
        belongs_to=prop.owner,
        content=f'User {request.user} reserved Property with id:{kwargs["pk"]}')

        return Response({'id': instance.pk, 'data': serializer.data})
    
class ChangeStatusReservationView(UpdateAPIView):
    
    serializer_class = ReservationSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Reservation.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user != instance.property.owner:
            return Response(data={'authentication': 'You are not authorized.'}, status=403)
        if instance.status == 'approved':
            notif = Notification.objects.create(
            belongs_to=instance.user,
            content=f'User {instance.property.owner} approved reservation for Property with id:{instance.property.id}')
        if instance.status == 'canceled':
            notif = Notification.objects.create(
            belongs_to=instance.property.owner,
            content=f'User {instance.user} cancelled reservation for Property with id:{instance.property.id}')
        if instance.status == 'terminated':
            notif = Notification.objects.create(
            belongs_to=instance.user,
            content=f'User {instance.property.owner} terminated reservation for Property with id:{instance.property.id}')
        return super().patch(request, *args, **kwargs)
        
class DeleteReservationView(DestroyAPIView):
    serializer_class = ReservationSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Reservation.objects.all()

    def delete(self, request, *args, **kwargs):
        try:
            r = Reservation.objects.get(pk=kwargs['pk'])
        except:
            return Response(data={'reservation': 'This reservation does not exist.'}, status=404)
        if request.user == r.user:
            super().delete(request, *args, **kwargs)
            return Response(data={'reservation': 'Successfully Deleted'}, status=200)
        # elif request.user == r.property.owner:
        #     r.staus = 'terminated'
        #     r.save()
        #     return Response({'reservation': f'Reservation {r.pk} has been terminated'}, status=200)
        else:
            return Response(data={'authorization': 'You are not authorized.'}, status=403)
        
class ListReservationView(ListAPIView):
    serializer_class = ReservationSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = PropertiesList

    def get_queryset(self):
        prop_pk = self.request.query_params.get('property')
        state = self.request.query_params.get('state')
        if prop_pk is not None:
            prop = Property.objects.get(pk=prop_pk)
            qset = Reservation.objects.filter(property=prop)
        else:
            qset = Reservation.objects.filter(user=self.request.user)
        if state is not None:
            qset = qset.filter(status=state)
        return qset

    def get(self, request, *args, **kwargs):
        prop_pk = self.request.query_params.get('property')
        state = self.request.query_params.get('state')
        if state is not None and state not in ['pending', 'denied', 'expired', 'approved', 'canceled', 'terminated','completed']:
            return Response(data={'state': 'state value not found'}, status=404)
        if prop_pk is not None:
            try:
                p = Property.objects.get(pk=prop_pk)
            except:
                return Response(data={'property': 'not found'}, status=404)
            if p.owner != request.user:
                return Response(data={'authorization': 'You are not authorized.'}, status=403)
        q = self.get_queryset()
        resp = {'results': [{'pk': x.pk, 'user': x.user.email, 'status': x.status, 'start_date': x.start_date, 'end_date': x.end_date, 'prop': x.property.pk} for x in q]}
        return Response(data=resp)
        # return super().get(request, *args, **kwargs)