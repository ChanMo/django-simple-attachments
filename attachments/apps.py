from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class AttachmentsConfig(AppConfig):
    name = 'attachments'
    verbose_name = _('attachments')
