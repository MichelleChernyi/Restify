from django.contrib import admin
# from .models import CustomUser
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from .models import GuestComment, Notification
# Register your models here.
# admin.site.register(CustomUser)
from django.contrib.auth import get_user_model
CustomUser = get_user_model()
admin.site.register(CustomUser)
admin.site.register(GuestComment)
admin.site.register(Notification)
