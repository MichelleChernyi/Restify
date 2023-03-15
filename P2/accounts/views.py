from django.shortcuts import render

# Create your views here.

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import SignupSerializer, LogoutSerializer, ProfileSerializer
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, CharField, IntegerField, ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser


# function-based view
# @api_view(['GET'])
# def stores_list(request):
#     stores = Store.objects.filter(is_active=True)
#     return Response([{
#         'name' : store.name,
#         'url' : store.url,
#         'is_active' : store.is_active,
#     } for store in stores ])

# class-based view
# class StoresManage(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request):
#         stores = Store.objects.all()
#         serializer = StoreSerializer(stores, many=True)
#         return Response(serializer.data)

# class StoresOwned(ListAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = StoreSerializer
#     def get_queryset(self):
#         return Store.objects.filter(owner=self.request.user)

class SignupView(CreateAPIView):
    permission_classes = []
    serializer_class = SignupSerializer


# class LogoutView(APIView):
#     permission_classes = (IsAuthenticated,)

#     def post(self, request):
#         try:
#             refresh_token = request.data["token_refresh"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()

#             return Response(status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             print("exception: ", e)
#             return Response(status=status.HTTP_400_BAD_REQUEST)


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

    