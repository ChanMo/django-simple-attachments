import logging
from django.dispatch import receiver
from django.core.files.storage import default_storage
from django.db.models.signals import post_save, pre_delete
from sorl.thumbnail import delete
from .models import *

logger = logging.getLogger(__name__)


@receiver(pre_delete, sender=Attachment)
def delete_file(sender, instance=None, **kwargs):
    " 删除Attachment时删除图片文件 "
    default_storage.delete(instance.source.path)
    delete(instance.source.path)

# @receiver(post_save, sender=Attachment)
# def check_image_safe(sender, instance=None, created=False, **kwargs):
#     " 检测图片内容安全 "
#     from wechat.wxa import Wxa
#     if created and instance.source.size < 1024*1024:
#         wx = Wxa()
#         if wx.check_image(instance.source):
#             instance.is_active = True
#         else:
#             instance.is_active = False
#         instance.save()
