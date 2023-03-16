
from rest_framework.generics import ListAPIView
# from rest_framework import filters
from .models import Property
from .serializers import PropertyListSerializer

class PropertyListView(ListAPIView):
    serializer_class = PropertyListSerializer
    # filter_backends = (filters.SearchFilter,)
    # search_fields = ['location', '']
    def get_queryset(self):
        queryset = Property.objects.all()
        num_guests = self.request.query_params.get('num_guests')
        if num_guests is not None:
            queryset = queryset.filter(num_guests=num_guests)
        return queryset