import logging
import json

from django.http import JsonResponse
from rest_framework import status

from .serializers import *
from .models import *
from rest_framework.decorators import api_view

from .utils.country.Country import CountryUtils
from .utils.city.City import CityUtils
from .exceptions import *


@api_view(['GET'])
def plate_list(request):
    if request.method == 'GET':
        plates = Plate.objects.all()
        serializer = PlateSerializer(plates, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def country_list(request):
    if request.method == 'GET':
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(["GET", "DELETE"])
def country_selector(request):
    if request.method == 'GET':
        name = request.query_params.get('name', None)
        language = request.query_params.get('language', None)
        try:
            country = CountryUtils().get_country(name, language)
            serializer = CountrySerializer(country, many=False)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
        except NoConfiguredLanguage:
            logging.error(f"Not configured language: {language}")
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data="Not configured language", safe=False)
        except NotFoundError:
            logging.error(f"Not found country: {name}")
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data="Not found country", safe=False)

    elif request.method == 'DELETE':
        name = request.query_params.get('name', None)
        if Country.objects.filter(name=name).exists():
            Country.objects.get(name=name).delete()
            logging.info(f"Deleted country from database: {name}")
        return JsonResponse(status=status.HTTP_200_OK, data=None, safe=False)


@api_view(['GET'])
def city_list(request):
    if request.method == 'GET':
        cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(["GET", "POST", "DELETE"])
def city_selector(request):
    if request.method == 'GET':
        country = request.query_params.get('country', None)
        country_pl = request.query_params.get('country_pl', None)
        name = request.query_params.get('name', None)
        name_pl = request.query_params.get('name_pl', None)

        try:
            cities = CityUtils.get_cities(name, name_pl, country, country_pl)
            serializer = CitySerializer(cities, many=True)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
        except NotFoundError:
            logging.error(f"Not found city: {name}")
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data="Not found city", safe=False)

    elif request.method == 'POST':
        try:
            CityUtils.save_city(request.POST)
            return JsonResponse(status=status.HTTP_201_CREATED, data="Created", safe=False)
        except AlreadyExistError:
            return JsonResponse(status=status.HTTP_406_NOT_ACCEPTABLE, data="Already exists", safe=False)
        except NotAllMandatoryFields:
            return JsonResponse(status=status.HTTP_406_NOT_ACCEPTABLE, data="Not all mandatory fields provided", safe=False)
        except Exception as exp:
            logging.error(f"Error: {exp}")
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data=exp, safe=False)

    elif request.method == 'DELETE':
        name = request.query_params.get('name', None)
        country = request.query_params.get('country', None)
        CityUtils.delete_city(name, country)
        return JsonResponse(status=status.HTTP_200_OK, data=None, safe=False)