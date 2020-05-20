import logging
from django.core.files.images import ImageFile
from django.http import HttpResponse, HttpResponseNotFound

from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.mixins import CreateModelMixin

from attachments.models import Attachment
from sorl.thumbnail import get_thumbnail


from .models import *
from .serializers import *

logger = logging.getLogger(__name__)

class AttachmentViewSet(CreateModelMixin, ReadOnlyModelViewSet):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer


def media_view(request, path):
    " 媒体链接 "
    path = 'attachments/'+path
    logger.debug(path)
    try:
        obj = Attachment.objects.get(source=path)
        if obj.is_active:
            width = request.GET.get('width', None)
            height = request.GET.get('height', None)
            if width and height:
                size = '{}x{}'.format(width, height)
                img = get_thumbnail(obj.source, size, crops='center', quality=99)
                img = ImageFile(img).read()
            else:
                img = obj.source.file

            return HttpResponse(img, content_type='image/jpeg')
    except Exception as e:
        logger.warning(e)
    return HttpResponseNotFound()

