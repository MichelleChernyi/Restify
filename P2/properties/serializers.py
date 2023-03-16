from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Property, PropertyComment

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