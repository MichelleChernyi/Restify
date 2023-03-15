from django.db import models
from accounts.models import CustomUser

# Create your models here.
class Property(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=400)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    num_bed = models.IntegerField()
    num_bath = models.IntegerField()

    # amenities
    amenities = models.ManyToManyField('Amenities')

class Amenities(models.Model):
    name = models.CharField(max_length=100)


class Availability(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    price = models.FloatField()
    property = models.ForeignKey(Property, on_delete=models.CASCADE)

class Image(models.Model):
    image = models.ImageField(upload_to='property_images/')