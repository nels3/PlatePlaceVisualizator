import logging
from django.http import FileResponse

from django.http import JsonResponse
from rest_framework import status

from .serializers import *
from .models import *
from rest_framework.decorators import api_view

from .utils.plate.Plate import PlateUtils
from .utils.country.Country import CountryUtils
from .utils.city.City import CityUtils
from .exceptions import *


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def plate_detail(request):
    if request.method == 'GET':
        id = request.query_params.get('id', None)
        if id is None:
            return JsonResponse(status=status.HTTP_404_NOT_FOUND, safe=False, data=None)
        try:
            plate = PlateUtils.get_plate_by_id(id)
        except Exception:
            return JsonResponse(status=status.HTTP_404_NOT_FOUND, safe=False, data=None)

        serializer = PlateSerializer(plate, many=False)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)

    elif request.method == 'POST':
        PlateUtils.save_plate(request.data)
        return JsonResponse(status=status.HTTP_200_OK, safe=False, data="Created")

    elif request.method == 'PUT':
        PlateUtils.add_new_plate(request.data)
        return JsonResponse(status=status.HTTP_200_OK, safe=False, data="Created")

    elif request.method == 'DELETE':
        id = request.query_params.get('id', None)
        PlateUtils.delete_plate(id)
        return JsonResponse(status=status.HTTP_200_OK, safe=False, data="Deleted")


@api_view(['GET'])
def plate_statistics(request):
    if request.method == 'GET':
        try:
            language = request.query_params.get('language', 'en')
            plate = PlateUtils.get_statistics(language)
        except Exception:
            return JsonResponse(status=status.HTTP_404_NOT_FOUND, safe=False, data=None)

        serializer = PlateStatisticsSerializer(plate, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET', 'DELETE'])
def plate_image_detail(request):
    if request.method == 'GET':
        try:
            id = request.query_params.get('id', None)
            plate = Plate.objects.get(id=id)
            if not plate.img:
                return JsonResponse(status=status.HTTP_200_OK, safe=False, data="No image")
            else:
                img = open('media/' + str(plate.img), 'rb')
                response = FileResponse(img)
                return response
        except:
            return JsonResponse(status=status.HTTP_404_NOT_FOUND, safe=False, data="Error")

    elif request.method == 'DELETE':
        plate_id = request.query_params.get('id', None)
        PlateUtils.delete_plate_image(plate_id)
        return JsonResponse(status=status.HTTP_404_NOT_FOUND, safe=False, data="Deleted")


@api_view(['GET'])
def plate_list(request):
    if request.method == 'GET':
        plates = Plate.objects.all()
        serializer = PlateSerializer(plates, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def plate_list_by_city(request):
    if request.method == 'GET':
        city = request.query_params.get('city', None)
        city_pl = request.query_params.get('city_pl', None)
        plates = PlateUtils.get_plates_from_city(city, city_pl)
        serializer = PlateSerializer(plates, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def plate_list_by_county(request):
    if request.method == 'GET':
        country = request.query_params.get('country', None)
        country_pl = request.query_params.get('country_pl', None)
        plates = PlateUtils.get_plates_from_country(country, country_pl)
        serializer = PlateSerializer(plates, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def country_list(request):
    if request.method == 'GET':
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(["GET", "DELETE", "POST", "PUT"])
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
        id = request.query_params.get('id', None)
        if Country.objects.filter(id=id).exists():
            Country.objects.get(id=id).delete()
            logging.info(f"Deleted country from database: {id}")
        return JsonResponse(status=status.HTTP_200_OK, data=None, safe=False)

    elif request.method == 'PUT':
        try:
            CountryUtils.save_country(request.POST)
            return JsonResponse(status=status.HTTP_201_CREATED, data="Saved", safe=False)
        except AlreadyExistError:
            return JsonResponse(status=status.HTTP_406_NOT_ACCEPTABLE, data="Already exists", safe=False)
        except NotAllMandatoryFields:
            return JsonResponse(status=status.HTTP_406_NOT_ACCEPTABLE, data="Not all mandatory fields provided", safe=False)
        except Exception as exp:
            logging.error(f"Error: {exp}")
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data=exp, safe=False)

    elif request.method == 'POST':
        try:
            CountryUtils.update_country(request.POST)
            return JsonResponse(status=status.HTTP_201_CREATED, data="Updated", safe=False)
        except NotFoundError:
            return JsonResponse(status=status.HTTP_406_NOT_ACCEPTABLE, data="Not exists", safe=False)
        except NotAllMandatoryFields:
            return JsonResponse(status=status.HTTP_406_NOT_ACCEPTABLE, data="Not all mandatory fields provided", safe=False)
        except Exception as exp:
            logging.error(f"Error: {exp}")
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data=exp, safe=False)


@api_view(["GET"])
def country_selector_check(request):
    if request.method == 'GET':
        name = request.query_params.get('name', None)
        language = request.query_params.get('language', None)
        try:
            country = CountryUtils().get_country(name, language, save_if_found=False)
            serializer = CountrySerializer(country, many=False)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
        except NoConfiguredLanguage:
            logging.error(f"Not configured language: {language}")
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data="Not configured language", safe=False)
        except NotFoundError:
            logging.error(f"Not found country: {name}")
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data="Not found country", safe=False)


@api_view(['GET'])
def city_list(request):
    if request.method == 'GET':
        cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(["GET", "POST", "DELETE", "PUT"])
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

    elif request.method == 'PUT':
        try:
            CityUtils.save_city(request.POST)
            return JsonResponse(status=status.HTTP_201_CREATED, data="Saved", safe=False)
        except AlreadyExistError:
            return JsonResponse(status=status.HTTP_406_NOT_ACCEPTABLE, data="Already exists", safe=False)
        except NotAllMandatoryFields:
            return JsonResponse(status=status.HTTP_406_NOT_ACCEPTABLE, data="Not all mandatory fields provided", safe=False)
        except Exception as exp:
            logging.error(f"Error: {exp}")
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data=exp, safe=False)

    elif request.method == 'POST':
        try:
            CityUtils.update_city(request.POST)
            return JsonResponse(status=status.HTTP_201_CREATED, data="Updated", safe=False)
        except NotFoundError:
            return JsonResponse(status=status.HTTP_406_NOT_ACCEPTABLE, data="Not exists", safe=False)
        except NotAllMandatoryFields:
            return JsonResponse(status=status.HTTP_406_NOT_ACCEPTABLE, data="Not all mandatory fields provided", safe=False)
        except Exception as exp:
            logging.error(f"Error: {exp}")
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data=exp, safe=False)

    elif request.method == 'DELETE':
        id = request.query_params.get('id', None)
        if City.objects.filter(id=id).exists():
            City.objects.get(id=id).delete()
            logging.info(f"Deleted city from database: {id}")
        return JsonResponse(status=status.HTTP_200_OK, data=None, safe=False)