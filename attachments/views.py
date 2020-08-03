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

    def get_queryset(self):
        qs = super().get_queryset()
        search = self.request.GET.get('search', None)
        if search:
            qs = qs.filter(tags__name=search)
        return qs


def media_view(request, path):
    " 媒体链接 "
    path = 'attachments/'+path
    try:
        obj = Attachment.objects.get(source=path)
        if obj.is_active:
            width = int(request.GET.get('width', 0))
            height = int(request.GET.get('height', 0))
            crop = request.GET.get('crop', 'center')
            quality = int(request.GET.get('quality', 99))

            if width and height:
                size = '{}x{}'.format(width, height)
                img = get_thumbnail(obj.source, size, crop=crop, quality=quality)
                img = ImageFile(img).read()
            elif width and width < obj.source.width:
                size = '{}x{}'.format(width, int(width/obj.source.width*obj.source.height))
                logger.debug(size)
                img = get_thumbnail(obj.source, size, crop=crop, quality=quality)
                img = ImageFile(img).read()
            elif height and height < obj.source.height:
                size = '{}x{}'.format(int(height/obj.source.height*obj.source.width), height)
                img = get_thumbnail(obj.source, size, crop=crop, quality=quality)
                img = ImageFile(img).read()
            else:
                img = obj.source.file

            return HttpResponse(img, content_type='image/jpeg')
    except Exception as e:
        logger.warning(e)
    return HttpResponseNotFound()
