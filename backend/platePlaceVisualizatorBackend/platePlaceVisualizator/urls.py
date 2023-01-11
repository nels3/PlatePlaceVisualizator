from django.urls import path

from . import views

urlpatterns = [
    path('plate/list', views.plate_list, name='plate_list'),
]
