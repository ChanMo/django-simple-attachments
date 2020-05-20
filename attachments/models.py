from django.db import models
from django.utils.html import format_html
from django.conf import settings
from django.utils.translation import gettext_lazy as _
#from sorl.thumbnail import get_thumbnail
from taggit.managers import TaggableManager

class Attachment(models.Model):
    name = models.CharField(_('name'), max_length=200, blank=True)
    source = models.ImageField(
        _('source'), upload_to='uploads/attachments/%Y%m')
    size = models.IntegerField(
        _('image size'), default=0, help_text='单位byte')
    width = models.SmallIntegerField(
        _('image width'), default=0, help_text='单位px')
    height = models.SmallIntegerField(
        _('image height'), default=0, help_text='单位px')
    ftype = models.CharField(
        _('image type'), max_length=50, blank=True, null=True)
    description = models.TextField(_('image desc'), blank=True, null=True)
    # user = models.ForeignKey(
    #     settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
    #     blank=True, null=True)
    created = models.DateTimeField(_('created'), auto_now_add=True)
    updated = models.DateTimeField(_('updated'), auto_now=True)
    tags = TaggableManager(blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = self.source.name
        self.size = self.source.size
        self.width = self.source.width
        self.height = self.source.height
        super().save(*args, **kwargs)

    def show_image(self):
        return format_html(
            "<img src='{}' width='64' height='64' />",
            self.show_thumbnail('128x128').url
        )

    def show_size(self):
        return '{:.2f}KB'.format(self.size / 1024)

    def show_thumbnail(self, size='300x300', crop='center', quality=99):
        try:
            return self.source
            #return get_thumbnail(self.source, size, crops=crop, quality=quality)
        except:
            return self.source


    show_image.short_description = _('image')
    show_size.short_description = _('image size')

    class Meta:
        ordering = ['-created']
        verbose_name = _('attachment')
        verbose_name_plural = _('attachment')
