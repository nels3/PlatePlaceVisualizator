from django.urls import path

from . import views

urlpatterns = [
    path('plate/', views.plate_detail, name='plate_detail'),
    path('plate/image', views.plate_image_detail, name='plate_image_detail'),
    path('plate/statistics', views.plate_statistics, name='plate_statistics'),
    path('plate/statistics/all', views.plate_statistics_all, name='plate_statistics_all'),
    path('plate/list/all', views.plate_list, name='plate_list'),
    path('plate/list/city/', views.plate_list_by_city, name='plate_list_by_city'),
    path('plate/list/country/', views.plate_list_by_county, name='plate_list_by_county'),
    path('plate/map', views.plate_map, name='plate_map'),
    path('plate/regions', views.plate_regions, name='plate_regions'),
    path('plate/countries', views.plate_countries, name='plate_countries'),
    path('plate/region', views.plate_region, name='plate_region'),
    path('plate/country', views.plate_country, name='plate_country'),
    path('country/list', views.country_list, name='country_list'),
    path('country/', views.country_selector, name='country_selector'),
    path('country/check', views.country_selector_check, name='country_selector_check'),
    path('city/list', views.city_list, name='city_list'),
    path('city/', views.city_selector, name='city_selector'),
]
