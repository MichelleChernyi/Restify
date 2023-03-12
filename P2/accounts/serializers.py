from rest_framework import exceptions
from rest_framework.serializers import ModelSerializer, Serializer, CharField, IntegerField, ValidationError
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
    
class SignupSerializer(ModelSerializer):
    password2 = CharField( write_only=True, required=True)
    class Meta:
        model = CustomUser
        fields = ['email', 'password','password2','first_name', 'last_name', 'phone_num'] #'avatar'
    def validate(self, data):
        if data['password'] != data['password2']:
            raise ValidationError({"password2": "Passwords didn't match."})

        validate_password(data['password'])
        return data
    def create(self, validated_data): 
        # try: 
        # validate_password(validated_data['password'])
        password = make_password(validated_data['password'])  
        user = CustomUser.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            phone_num=validated_data['phone_num'],
            password=password
        ) 
        return user


class LogoutSerializer(Serializer):
    refresh_token = CharField()

    def validate(self, data):
        self.token = data['refresh_token']
        return data

    def save(self):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError as e:
            raise exceptions.AuthenticationFailed(e)



class ProfileSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['phone_num', 'first_name', 'last_name', 'email']   #TODO: AVATAR #TODO: fill in fields
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'phone_num': {'required': False},
            'email': {'required': False},
        }


    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.pk != instance.pk:
            raise ValidationError({"authorize": "You dont have permission for this user."})
        print("validated_data: ", validated_data)
        if 'first_name' in validated_data:
            instance.first_name = validated_data['first_name']
        if 'last_name' in validated_data:
            instance.last_name = validated_data['last_name']
        if 'email' in validated_data:
            instance.email = validated_data['email']
        if 'phone_num' in validated_data:
            instance.phone_num = validated_data['phone_num']

        instance.save()

        return instance