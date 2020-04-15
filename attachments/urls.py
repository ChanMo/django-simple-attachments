from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()

router.register('', AttachmentViewSet, basename='attachment')

urlpatterns = router.urls
