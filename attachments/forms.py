from django.contrib.postgres.forms import SimpleArrayField
from django.forms.fields import CharField
from .widgets import *


class RichTextField(CharField):
    def __init__(self, **kwargs):
        kwargs.update({'widget': RichTextWidget()})
        return super().__init__(**kwargs)


class ImagePickerField(CharField):
    def __init__(self, **kwargs):
        kwargs.update({'widget': ImagePickerWidget()})
        return super().__init__(**kwargs)


class MultipleImageField(SimpleArrayField):
    widget = MultipleImageWidget
