from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.Property)
admin.site.register(models.Amenities)
admin.site.register(models.Availability)
admin.site.register(models.Image)
admin.site.register(models.PropertyComment)
admin.site.register(models.Reservation)