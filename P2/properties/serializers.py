from rest_framework.serializers import ModelSerializer
from .models import Property

class PropertyListSerializer(ModelSerializer):
    class Meta:
        model = Property
        fields = ['title', 'description', 'location', 'num_bed', 'num_bath', 'price']