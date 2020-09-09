from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers
from django.conf import settings

from .models import *


class AttachmentSerializer(serializers.ModelSerializer):
    tags = serializers.CharField(max_length=200, required=False, allow_blank=True, allow_null=True)
    source = Base64ImageField()
    class Meta:
        model = Attachment
        fields = '__all__'


    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['source'] = instance.source.url
        ret['tags'] = ','.join(i for i in instance.tags.names())

        return ret


    def update(self, instance, validated_data):
        if 'tags' in validated_data:
            tags = validated_data.pop('tags')
            tags = tags.strip()
            if tags:
                instance.tags.set(*tags.split(','))

        return super().update(instance, validated_data)
