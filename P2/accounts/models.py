from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser
from .managers import CustomUserManager
from django.contrib.auth.models import PermissionsMixin
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
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
    comments = GenericRelation('Comment', related_query_name='User')

# class Notification(models.Model):
#     # property = models.ForeignKey(Property, on_delete=models.SET_NULL)
#     content = models.TextField()
#     belongs_to = models.ForeignKey(User, on_delete=models.SET_NULL)


class Comment(models.Model):
    from_user =  models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    # to_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    reply_to = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(null=True)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()



# class Review(models.Model):
#     from_user =  models.ForeignKey(User, on_delete=models.SET_NULL)
#     to_user = models.ForeignKey(User, on_delete=models.SET_NULL)
#     # property = models.ForeignKey(Property, on_delete=models.SET_NULL)
#     content = models.TextField(blank=True, null=True)
#     rating = models.PositiveIntegerField()