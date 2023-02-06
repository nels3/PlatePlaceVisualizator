from django.urls import path

from . import views

urlpatterns = [
    path('plate/', views.plate_detail, name='plate_detail'),
    path('plate/image', views.plate_image_detail, name='plate_image_detail'),
    path('plate/statistics', views.plate_statistics, name='plate_statistics'),
    path('plate/list/all', views.plate_list, name='plate_list'),
    path('plate/list/city/', views.plate_list_by_city, name='plate_list_by_city'),
    path('plate/list/country/', views.plate_list_by_county, name='plate_list_by_county'),
    path('country/list', views.country_list, name='country_list'),
    path('country/', views.country_selector, name='country_selector'),
    path('country/check', views.country_selector_check, name='country_selector_check'),
    path('city/list', views.city_list, name='city_list'),
    path('city/', views.city_selector, name='city_selector'),
]
