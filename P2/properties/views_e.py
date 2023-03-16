from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView
from rest_framework.decorators import permission_classes
# from rest_framework import filters
from .models import Property
from .serializers import PropertyListSerializer

@permission_classes((AllowAny, ))
class PropertyListView(ListAPIView):
    serializer_class = PropertyListSerializer
    # filter_backends = (filters.SearchFilter,)
    # search_fields = ['location', '']
    def get_queryset(self):
        queryset = Property.objects.all()
        num_guests = self.request.query_params.get('num_guests')
        location = self.request.query_params.get('location')
        amenities = self.request.query_params.getlist('amenities')
        price_low_to_high = self.request.query_params.get('price_low_to_high')
        price_high_to_low = self.request.query_params.get('price_high_to_low')
        price_less_than = self.request.query_params.get('price_less_than')
        if num_guests is not None:
            queryset = queryset.filter(num_guests=num_guests)
        if location is not None:
            queryset = queryset.filter(location__iexact=location)
        if amenities is not None:
            for i in amenities:
                queryset = queryset.filter(amenities__name = i)
        if price_less_than:
            queryset = queryset.filter(price__lte=price_less_than)
        if price_high_to_low:
            if price_high_to_low.lower() == 'true':
                queryset = queryset.order_by('-price')
        elif price_low_to_high:
            if price_low_to_high.lower() == 'true':
                queryset = queryset.order_by('price')
        # if price_high_to_low.lower() == 'true' and price_low_to_high.lower() == 'true':
        #     pass
        # else:
            
        #     else:
        #         queryset = queryset.order_by('-price')
        return queryset