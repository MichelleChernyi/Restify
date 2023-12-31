from django.shortcuts import get_object_or_404
from rest_framework import exceptions
from rest_framework.serializers import ModelSerializer, Serializer, CharField, IntegerField, ValidationError, SerializerMethodField
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

from .models import CustomUser, GuestComment, Notification
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class GuestCommentCreateSerializer(ModelSerializer):
    class Meta:
        model = GuestComment
        fields = ['content']

class GuestCommentSerializer(ModelSerializer):
    reply = SerializerMethodField()
    date = CharField(source='data')
    user_name = CharField(source='from_user.first_name')
    class Meta:
        model = GuestComment
        fields = ['from_user', 'content', 'reply', 'date', 'user_name']
    
    def get_reply(self, obj):
        replies = obj.replies.all()
        if replies:
            return GuestCommentSerializer(replies[0]).data
        else:
            return None

    
class SignupSerializer(ModelSerializer):
    password2 = CharField( write_only=True, required=True)
    class Meta:
        model = CustomUser
        fields = ['email', 'password','password2','first_name', 'last_name', 'phone_num', 'avatar'] #'avatar'
    def validate(self, data):
        if data['password'] != data['password2']:
            raise ValidationError({"password2": "Passwords didn't match."})

        validate_password(data['password'])
        return data
    def create(self, validated_data): 
        # try: 
        # validate_password(validated_data['password'])
        password = make_password(validated_data['password'])  
        if 'first_name' in validated_data:
            first_name=validated_data['first_name']
        else:
            first_name=None
        if 'last_name' in validated_data:
            last_name=validated_data['last_name']
        else:
            last_name=None
        if 'phone_num'in validated_data:
            phone_num=validated_data['phone_num']
        else:
            phone_num=None
        if 'avatar' in validated_data:
            user = CustomUser.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=validated_data['email'],
                phone_num=phone_num,
                password=password,
                avatar=validated_data['avatar'],
            ) 
        else:
            user = CustomUser.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=validated_data['email'],
            phone_num=phone_num,
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
        fields = ['phone_num', 'first_name', 'last_name', 'email', 'avatar', 'id']   #TODO: AVATAR 
        lookup_field = 'email'
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'phone_num': {'required': False},
            'email': {'required': False},
            'avatar':{'required': False},
        }

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        return obj
    def update(self, instance, validated_data):
        user = self.context['request'].user
        # if user.pk != instance.pk:
        #     raise ValidationError({"authorize": "You dont have permission for this user."})
        print("validated_data: ", validated_data)
        if 'first_name' in validated_data:
            instance.first_name = validated_data['first_name']
        if 'last_name' in validated_data:
            instance.last_name = validated_data['last_name']
        if 'email' in validated_data:
            instance.email = validated_data['email']
        if 'phone_num' in validated_data:
            instance.phone_num = validated_data['phone_num']
        if 'avatar' in validated_data:
            instance.avatar = validated_data['avatar']

        instance.save()

        return instance




class NotificationSerializerOne(ModelSerializer):
    class Meta:
        model = Notification
        fields = ['content', 'belongs_to', 'cleared']  
    def save(self, instance):
        instance.save()



class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = ['content', 'belongs_to', 'cleared']  
