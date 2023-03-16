from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Property, PropertyComment
from rest_framework.serializers import ModelSerializer, ValidationError
from .models import Property, Amenities, Image, Reservation, Availability
from rest_framework import serializers
from datetime import datetime, date

class PropertyListSerializer(ModelSerializer):
    class Meta:
        model = Property
        fields = ['title', 'description', 'location', 'num_bed', 'num_bath', 'num_guests', 'price']

class PropertyCommentCreateSerializer(ModelSerializer):
    class Meta:
        model = PropertyComment
        fields = ['content']

class PropertyCommentSerializer(ModelSerializer):
    reply = SerializerMethodField()
    class Meta:
        model = PropertyComment
        fields = ['from_user', 'content', 'reply']
    
    def get_reply(self, obj):
        replies = obj.replies.all()
        if replies:
            return PropertyComment(replies[0]).data
        else:
            return None
class PropertySerializer(ModelSerializer):
    class Meta:
        model = Property
        fields = ['title', 'description', 'location', 'num_bed', 
                  'num_bath', 'num_guests', 'price',]
        
    def validate(self, data):
        super().validate(data)
        if 'amenities' in self.context:
            amenity_name_list = list(self.context['amenities'].split(','))
            amenity_name_list = [e.strip() for e in amenity_name_list]
            amenities = []
            for amenity_name in amenity_name_list:
                try:
                    am = Amenities.objects.get(name=amenity_name)
                    amenities.append(am)
                except:
                    raise ValidationError({'amenities': f'{amenity_name} not an amenity'})
            data['amenities'] = self.context['amenities']
        if 'image' in self.context:
            data['image'] = self.context['image']
        return data
        
    def create(self, validated_data): 
        created_property = Property.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            location=validated_data['location'],
            owner=self.context['owner'],
            num_bed=validated_data['num_bed'],
            num_bath=validated_data['num_bath'],
            num_guests=validated_data['num_guests'],
            price=validated_data['price'],
        )
        created_property.save()
        if 'amenities' in validated_data:
            for a in validated_data['amenities']:
                created_property.amenities.add(a)
        if 'image' in validated_data:
            image = Image.objects.create(
                image = validated_data['image'],
                my_property = created_property
            )
            image.save()
        return created_property
    
    def update(self, instance, validated_data):
        super().update(instance, validated_data)
        if 'amenities' in validated_data:
            instance.amenities.clear()
            for a in validated_data['amenities']:
                instance.amenities.add(a)
        if 'image' in validated_data:
            image = Image.objects.create(
                image = validated_data['image'],
                my_property = instance.pk
            )
        return instance
    
class ReservationSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['status', 'start_date', 'end_date']

    def validate(self, data):
        return super().validate(data)

    def create(self, validated_data):
        return Reservation.objects.create(
            user=self.context['user'],
            property=self.context['property'],
            start_date=validated_data['start_date'],
            end_date=validated_data['end_date'],
        )
    
    def update(self, instance, validated_data):
        if 'status' in validated_data:
            new_data = {'status': validated_data['status']}
            print(new_data)
            return super().update(instance, new_data)
        else:
            return super().update(instance, dict())