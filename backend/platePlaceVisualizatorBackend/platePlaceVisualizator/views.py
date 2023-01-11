import logging

from django.http import JsonResponse
from rest_framework import status

from .serializers import *
from .models import *
from rest_framework.decorators import api_view

from .utils.country.Country import CountryUtils
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

