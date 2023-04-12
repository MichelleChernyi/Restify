from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
# from rest_framework import filters
from accounts.models import CustomUser
from .models import Property, PropertyComment, Image
from .serializers import PropertyListSerializer, PropertyCommentSerializer, PropertyCommentCreateSerializer
from .paginations import PropertiesList
from rest_framework.response import Response
from rest_framework import status

class PropertyCommentView(ListCreateAPIView):
    serializer_class = PropertyCommentSerializer
    pagination_class = PropertiesList
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PropertyCommentCreateSerializer
        return PropertyCommentSerializer

    def get_queryset(self):
        queryset = PropertyComment.objects.all().filter(property=self.kwargs['pk'])
        queryset = queryset.filter(reply_to=None)
        return queryset
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # if request.user.id == self.kwargs['pk']:
        #     return Response({'Cannot leave a review on yourself'}, status=status.HTTP_401_UNAUTHORIZED)
        property = Property.objects.get(id=self.kwargs['pk'])
        if property.owner == self.request.user:
            return Response({"Cannot leave a review on your own property"}, status=status.HTTP_401_UNAUTHORIZED)
        
        # try:
        #     users_properties = Property.objects.get(owner=request.user.id)
        # except:
        #     return Response({"Cannot leave a review on someone that hasn't stayed at your property"}, status=status.HTTP_401_UNAUTHORIZED)

        reservations = property.reservation_set.all()
        guests = reservations.filter(user=self.request.user)
        if not guests:
            return Response({"Cannot leave a review if you haven't stayed on this property"}, status=status.HTTP_401_UNAUTHORIZED)
        
        guests = guests.filter(status__in=['completed', 'terminated'])
        if not guests:
            return Response({"Cannot leave a review until reservation is complete or reservation has been terminated"}, status=status.HTTP_401_UNAUTHORIZED)
        
        comment = PropertyComment.objects.create(
            from_user=request.user,
            content=serializer.data['content'], 
            property=Property.objects.get(id=self.kwargs['pk']))
        result = PropertyCommentSerializer(comment)
        return Response(result.data, status=status.HTTP_201_CREATED)

class ReplyView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PropertyCommentCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        original_comment = PropertyComment.objects.get(id=self.kwargs['pk'])
        if original_comment.replies.all():
            return Response({"This comment already has a reply"}, status=status.HTTP_400_BAD_REQUEST)
        if (original_comment.property.owner == original_comment.from_user):
            if (original_comment.reply_to.from_user != self.request.user):
                return Response({"Cannot reply to thread that you are not a part of or it is not your turn to comment"}, status=status.HTTP_401_UNAUTHORIZED)
        elif self.request.user == original_comment.from_user and self.request.user != original_comment.property.owner:
            return Response({"Cannot reply to thread that you are not a part of or it is not your turn to comment"}, status=status.HTTP_401_UNAUTHORIZED)
        
        comment = PropertyComment.objects.create(
            from_user=request.user,
            content=serializer.data['content'], 
            property=original_comment.property,
            reply_to=original_comment)
        result = PropertyCommentSerializer(comment)
        return Response(result.data, status=status.HTTP_201_CREATED)

@permission_classes((AllowAny, ))
class PropertyListView(ListAPIView):
    serializer_class = PropertyListSerializer
    pagination_class = PropertiesList
    def get_queryset(self):
        queryset = Property.objects.all()
        num_guests = self.request.query_params.get('num_guests')
        location = self.request.query_params.get('location')
        amenities = self.request.query_params.getlist('amenities')
        price_low_to_high = self.request.query_params.get('price_low_to_high')
        price_high_to_low = self.request.query_params.get('price_high_to_low')
        price_less_than = self.request.query_params.get('price_less_than')
        num_baths = self.request.query_params.get('num_baths')
        if num_guests is not None:
            queryset = queryset.filter(num_guests=num_guests)
        if num_baths is not None:
            queryset = queryset.filter(num_bath__gte=num_baths)
        if location is not None:
            queryset = queryset.filter(location__iexact=location)
        if amenities is not None:
            for i in amenities:
                queryset = queryset.filter(amenities__name = i)
        if price_less_than:
            queryset = queryset.filter(price__lte=price_less_than)
        if price_high_to_low:
            if price_high_to_low.lower() == 'true':
                queryset = queryset.order_by('-price')
        elif price_low_to_high:
            if price_low_to_high.lower() == 'true':
                queryset = queryset.order_by('price')

        for property in queryset:
            images = Image.objects.filter(my_property=property)
            property.images = []
            for image in images:
                property.images.append(self.request.build_absolute_uri(image.image.url))
        return queryset