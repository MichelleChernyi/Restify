from django.db import models
from accounts.models import CustomUser
from django.core.validators import int_list_validator

AMENITIES = {
    'gym': 0,
    'pool': 1,
    'fireplace': 2,
    'num_bed': 3,
    'num_bath': 4,
}

# Create your models here.
class Property(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=400)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)

    # amenities
    amenities = models.CharField(validators=int_list_validator)  

class Availability(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    price = models.FloatField()
    property = models.ForeignKey(Property, on_delete=models.CASCADE)

class Image(models.Model):
    image = models.ImageField(upload_to='property_images/')