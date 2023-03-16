from django.db import models
from accounts.models import CustomUser, Comment
from django.contrib.contenttypes.fields import GenericRelation

# Create your models here.
class Property(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=400)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    num_bed = models.IntegerField()
    num_bath = models.IntegerField()
    num_guests = models.IntegerField()
    price = models.FloatField()
    comments = GenericRelation(Comment, related_query_name='property')

    # amenities
    amenities = models.ManyToManyField('Amenities', null=True, blank=True)

    def __str__(self):
         return self.title

class Amenities(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
         return self.name

class Availability(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    property = models.ForeignKey(Property, on_delete=models.CASCADE)

class Image(models.Model):
    image = models.ImageField(upload_to='property_images/')