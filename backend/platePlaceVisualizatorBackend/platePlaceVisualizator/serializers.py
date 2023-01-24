from rest_framework import serializers
from .models import *

from rest_framework.parsers import MultiPartParser, FormParser


class PlateSerializer(serializers.ModelSerializer):
    parser_classes = (MultiPartParser, FormParser)

    class Meta:
        model = Plate
        fields = ['country', 'city', 'country_pl', 'city_pl', 'longitude', 'latitude', 'info', 'image_present', "id"]


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'
