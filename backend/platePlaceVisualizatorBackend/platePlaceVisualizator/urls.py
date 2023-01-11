from django.urls import path

from . import views

urlpatterns = [
    path('plate/list', views.plate_list, name='plate_list'),
    path('country/list', views.country_list, name='country_list'),
    path('country/', views.country_selector, name='country_selector'),
]
