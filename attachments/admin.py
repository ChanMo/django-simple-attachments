from django.contrib import admin

from .models import *

@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    list_display = ('show_image', 'name', 'show_size', 'show_tags', 'is_active', 'created')
    list_per_page = 12
    list_filter = ('created', 'is_active')
    search_fields = ('name', 'tags__name')
    readonly_fields = ('size', 'width', 'height')

    def show_tags(self, instance):
        return ','.join(i.name for i in instance.tags.all())
