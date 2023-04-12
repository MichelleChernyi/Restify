from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListCreateAPIView, DestroyAPIView, UpdateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .serializers import SignupSerializer, LogoutSerializer, ProfileSerializer, NotificationSerializer, NotificationSerializerOne, GuestCommentSerializer, GuestCommentCreateSerializer
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, CharField, IntegerField, ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from .models import CustomUser, GuestComment, Notification
from properties.models import Property
from properties.paginations import PropertiesList
from rest_framework.pagination import PageNumberPagination

# @permission_classes((AllowAny, ))
class GuestCommentView(ListCreateAPIView):
    serializer_class = GuestCommentSerializer
    pagination_class = PropertiesList
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return GuestCommentCreateSerializer
        return GuestCommentSerializer

    def get_queryset(self):
        queryset = GuestComment.objects.all().filter(guest=self.kwargs['pk'])
        queryset = queryset.filter(reply_to=None)
        return queryset
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        if request.user.id == self.kwargs['pk']:
            return Response({'Cannot leave a review on yourself'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            users_properties = Property.objects.get(owner=request.user.id)
        except:
            return Response({"Cannot leave a review on someone that hasn't stayed at your property"}, status=status.HTTP_401_UNAUTHORIZED)

        reservations = users_properties.reservation_set.all()
        guests = reservations.filter(user=self.kwargs['pk'])
        if not guests:
            return Response({"Cannot leave a review on someone that hasn't stayed at your property"}, status=status.HTTP_401_UNAUTHORIZED)
        
        guests = guests.filter(status='completed')
        if not guests:
            return Response({"Cannot leave a review until reservation is complete"}, status=status.HTTP_401_UNAUTHORIZED)
        

        
        comment = GuestComment.objects.create(
            from_user=request.user,
            content=serializer.data['content'], 
            guest=CustomUser.objects.get(id=self.kwargs['pk']))
        result = GuestCommentSerializer(comment)
        return Response(result.data, status=status.HTTP_201_CREATED)

class ReplyView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = GuestCommentCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        original_comment = GuestComment.objects.get(id=self.kwargs['pk'])

        
        if original_comment.replies.all():
            return Response({"This comment already has a reply"}, status=status.HTTP_400_BAD_REQUEST)
        if (original_comment.guest == original_comment.from_user):
            if (original_comment.reply_to.from_user != self.request.user):
                return Response({"Cannot reply to thread that you are not a part of or it is not your turn to comment"}, status=status.HTTP_401_UNAUTHORIZED)
        elif self.request.user == original_comment.from_user and self.request.user != original_comment.guest:
            return Response({"Cannot reply to thread that you are not a part of or it is not your turn to comment"}, status=status.HTTP_401_UNAUTHORIZED)
        
        comment = GuestComment.objects.create(
            from_user=request.user,
            content=serializer.data['content'], 
            guest=original_comment.guest,
            reply_to=original_comment)
        result = GuestCommentSerializer(comment)
        return Response(result.data, status=status.HTTP_201_CREATED)

class SignupView(CreateAPIView):
    permission_classes = []
    serializer_class = SignupSerializer



class LogoutView(APIView):
    serializer_class = LogoutSerializer

    permission_classes = (IsAuthenticated,)

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileView(UpdateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer
    lookup_field = 'email'
    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=self.request.user.pk)
        return obj
    def get(self, request, **kwargs):
        actual_user = self.request.user
        user = get_object_or_404(CustomUser, id=self.request.user.pk) 
        # if user.pk != actual_user.pk:
        #     raise ValidationError({"authorize": "You dont have permission for this user."})
        serializer = ProfileSerializer(user)
        return Response(serializer.data)
 
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 4

class NotificationsListView(ListAPIView):
    permission_classes = [IsAuthenticated]    
    serializer_class = NotificationSerializer
    pagination_class = StandardResultsSetPagination
    def get_queryset(self):
        notifs = Notification.objects.filter(belongs_to=self.request.user, cleared=False)
        return notifs

class NotificationsViewCreate(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer


class NotificationView(RetrieveAPIView, UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = NotificationSerializerOne
    def get_object(self):
        actual_user = self.request.user
        notif = get_object_or_404(Notification, id=self.kwargs['pk']) 
        if notif.belongs_to.pk != actual_user.pk:
            raise ValidationError({"authorize": "You dont have permission for this user."})
        notif.cleared =True
        notif.save()
        return notif
