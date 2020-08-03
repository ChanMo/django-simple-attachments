from django.forms.widgets import TextInput, Textarea

class RichTextWidget(Textarea):
    def __init__(self, *args, **kwargs):
        super(RichTextWidget, self).__init__(*args, **kwargs)
        self.attrs['class'] = 'richtext'

    class Media:
        js = ('bower_components/tinymce/tinymce.min.js',
                'attachments/widgets/richtext.js')



class ImagePickerWidget(TextInput):
    " 单图 "
    template_name = 'attachments/widgets/image_picker.html'
    #class Media:
    #    js = [
    #        'dist/image_picker.bundle.js'
    #    ]

class MultipleImageWidget(TextInput):
    " 多图 "
    template_name = 'attachments/widgets/multiple_image.html'
