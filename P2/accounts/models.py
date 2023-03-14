from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser
from .managers import CustomUserManager
from django.contrib.auth.models import PermissionsMixin
# # Create your models here.

#for profile
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique = True)
    phone_num = models.PositiveIntegerField()
    first_name = models.CharField( max_length=50)
    last_name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

# class Notification(models.Model):
#     # property = models.ForeignKey(Property, on_delete=models.SET_NULL)
#     content = models.TextField()
#     belongs_to = models.ForeignKey(User, on_delete=models.SET_NULL)


# class Comment(models.Model):
#     from_user =  models.ForeignKey(User, on_delete=models.SET_NULL)
#     to_user = models.ForeignKey(User, on_delete=models.SET_NULL)
#     # property = models.ForeignKey(Property, on_delete=models.SET_NULL)
#     content = models.TextField()
#     is_reply = models.BooleanField(default=False)



# class Review(models.Model):
#     from_user =  models.ForeignKey(User, on_delete=models.SET_NULL)
#     to_user = models.ForeignKey(User, on_delete=models.SET_NULL)
#     # property = models.ForeignKey(Property, on_delete=models.SET_NULL)
#     content = models.TextField(blank=True, null=True)
#     rating = models.PositiveIntegerField()