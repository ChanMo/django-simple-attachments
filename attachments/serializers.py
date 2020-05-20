from drf_extra_fields.fields import Base64ImageField
from rest_framework.serializers import ModelSerializer
from django.conf import settings

from .models import *


class AttachmentSerializer(ModelSerializer):
    source = Base64ImageField()
    class Meta:
        model = Attachment
        fields = '__all__'


    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['source'] = instance.source.url

        return ret
