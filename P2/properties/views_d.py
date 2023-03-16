from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Property, Availability, Image

# Create your views here.
@api_view(['POST'])
def hello_world(request):
    # TODO: authentication
    if request.method == 'POST':
        # TODO: validate request

        # TODO: make property

        return
    return Response({"message": "Hello, world!"})