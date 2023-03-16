from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import SignupSerializer, LogoutSerializer, ProfileSerializer, NotificationSerializer, NotificationSerializerOne, GuestCommentSerializer
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, CharField, IntegerField, ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from .models import CustomUser, GuestComment, Notification
from rest_framework.pagination import PageNumberPagination

@permission_classes((AllowAny, ))
class GuestCommentView(ListAPIView):
    serializer_class = GuestCommentSerializer
    # pagination_class = PropertiesList

    def get_queryset(self):
        queryset = GuestComment.objects.all().filter(guest=self.kwargs['pk'])
        queryset = queryset.filter(reply_to=None)
        return queryset

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
    def get(self, request, pk, **kwargs):
        actual_user = self.request.user
        user = get_object_or_404(CustomUser, id=pk) 
        if user.pk != actual_user.pk:
            raise ValidationError({"authorize": "You dont have permission for this user."})
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
