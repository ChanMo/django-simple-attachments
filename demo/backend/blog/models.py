from django.db import models
from attachments.fields import ImagePickerField, MultipleImageField, RichTextField

class Blog(models.Model):
    title = models.CharField(max_length=200)
    cover = ImagePickerField(blank=True, null=True)
    images = MultipleImageField(blank=True, default=list)
    content = RichTextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
