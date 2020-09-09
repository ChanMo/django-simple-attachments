from django.conf import settings
from django.db import models
from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from attachments.views import media_view

if settings.DEBUG:
    docs_permissions = ()
else:
    docs_permissions = (permissions.IsAuthenticated,)

schema_view = get_schema_view(
   openapi.Info(
      title="OPEN API",
      default_version='v1'
   ),
   public=False,
   permission_classes=docs_permissions,
)

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('admin/', admin.site.urls),
    path('api/attachments/', include('attachments.urls')),
    re_path(r'^media/attachments/(?P<path>.*)(/?)?', media_view),
    #path('accounts/', include('accounts.urls')),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
