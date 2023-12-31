from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser
from .managers import CustomUserManager
from django.contrib.auth.models import PermissionsMixin
from datetime import date
# # Create your models here.

#for profile
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique = True)
    phone_num = models.PositiveIntegerField(null=True, blank=True)
    first_name = models.CharField( max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

class Notification(models.Model):
    # property = models.ForeignKey(Property, on_delete=models.SET_NULL)
    content = models.TextField()
    belongs_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, db_constraint=False)
    cleared = models.BooleanField(default=False)


class Comment(models.Model):
    from_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    # to_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    reply_to = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name="replies")
    data = models.DateField(auto_now_add=True)
    class Meta:
        abstract = True
    
    def reply(self):
        return Comment.objects.filter(reply_to=self)

class GuestComment(Comment):
    guest = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='guest')


# class Review(models.Model):
#     from_user =  models.ForeignKey(User, on_delete=models.SET_NULL)
#     to_user = models.ForeignKey(User, on_delete=models.SET_NULL)
#     # property = models.ForeignKey(Property, on_delete=models.SET_NULL)
#     content = models.TextField(blank=True, null=True)
#     rating = models.PositiveIntegerField()