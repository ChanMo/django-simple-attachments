from django.contrib.postgres.fields import ArrayField
from django.db import models
from . import forms
from . import widgets

class RichTextField(models.TextField):
    def formfield(self, **kwargs):
        return super().formfield(**{
            'form_class': forms.RichTextField,
            **kwargs,
        })



class ImagePickerField(models.CharField):
    def __init__(self, verbose_name=None, name=None, **kwargs):
        kwargs.setdefault('max_length', 255)
        super().__init__(verbose_name, name, **kwargs)

    def formfield(self, **kwargs):
        return super().formfield(**{
            'form_class': forms.ImagePickerField,
            **kwargs,
        })



class MultipleImageField(ArrayField):
    def __init__(self, verbose_name=None, base_field=None, size=2, **kwargs):
        kwargs.update({'verbose_name': verbose_name})
        super().__init__(models.CharField(max_length=255), size, **kwargs)

    def formfield(self, **kwargs):
        return super().formfield(**{
            'form_class': forms.MultipleImageField,
            'base_field': self.base_field.formfield(),
            'max_length': self.size,
            **kwargs,
        })
