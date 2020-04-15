from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.mixins import CreateModelMixin

from .models import *
from .serializers import *


class AttachmentViewSet(CreateModelMixin, ReadOnlyModelViewSet):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
