# from django.db import models
# from django.contrib.auth.models import User
# # Create your models here.

# # class User (models.Model): #done for us

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