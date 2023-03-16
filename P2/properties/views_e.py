
from rest_framework.generics import ListAPIView
from rest_framework import filters
from .models import Property
from .serializers import PropertyListSerializer

class PropertyListView(ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertyListSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['location', '']