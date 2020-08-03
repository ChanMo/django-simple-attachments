from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import *

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
