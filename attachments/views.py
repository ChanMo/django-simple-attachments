import logging
from django.core.files.images import ImageFile
from django.http import HttpResponse, HttpResponseNotFound

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.viewsets import ModelViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.decorators import api_view

from attachments.models import Attachment
from sorl.thumbnail import get_thumbnail


from .models import *
from .serializers import *

logger = logging.getLogger(__name__)

class AttachmentViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer

    def get_permissions(self):
        " 上传权限开放, 其他权限仅限Admin "
        if self.action in ['create', 'list']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        from django.db.models import Q
        qs = super().get_queryset()
        search = self.request.GET.get('search', None)
        if search:
            qs = qs.filter(Q(tags__name=search) | Q(name__contains=search)).order_by('-id').distinct('id')
        return qs


@api_view(['GET'])
def tags_view(request):
    """
    热门标签
    """
    from django.contrib.contenttypes.models import ContentType
    from taggit.models import TaggedItem
    from django.db.models import Count
    from rest_framework.response import Response
    content_type = ContentType.objects.get_for_model(Attachment)
    tags = TaggedItem.objects.filter(content_type=content_type).values('tag__name').annotate(Count('tag__name')).order_by('-tag__name__count')
    return Response(tags)


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
