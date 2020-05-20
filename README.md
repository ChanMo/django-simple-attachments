# Django 图片存储

## Getting Started

### Install Packages

```
$ pip install sorl-thumbnail
$ pip install django-taggit
$ pip install django-extra-fields
$ pip install djangorestframework
$ pip install django-simple-attachments
```

### Update `settings.py`

```
INSTALLED_APPS = [
    ...
    'taggit',
    'rest_framework',
    'attachments',
    ...
]
```

### Update `urls.py`

```
from attachments.views import media_view

urlpatterns = [
    ...
    path('attachments/', include('attachments.urls')),
    re_path(r'^media/attachments/(?P<path>.*)(/?)?', media_view),
    ...
]
```

## Usage

### Realtime resize image source

```
<img src="/media/attachments/0001.png?width=100&height=100" />
```

## Next

- [ ] AutoClean
- [ ] Premissions
