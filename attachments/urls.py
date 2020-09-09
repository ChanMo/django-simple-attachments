from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()

router.register('', AttachmentViewSet, basename='attachment')


urlpatterns = [
    path('tags/', tags_view)
]

urlpatterns += router.urls

