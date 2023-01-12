import requests
import logging
from platePlaceVisualizator.exceptions import *
from platePlaceVisualizator.models import *
from django.db.models import Q
from django.db.utils import IntegrityError

from platePlaceVisualizator.utils.translator.Translator import Translator

from platePlaceVisualizator.constants import city_api_url
from platePlaceVisualizator.secret import api_key


class CityUtils:

    def __init__(self):
        pass

    @staticmethod
    def get_cities(name, name_pl, country, country_pl):

        if City.objects.filter((Q(name=name) & Q(name__isnull=False)) | ( Q(name_pl=name_pl)) & Q(name_pl__isnull=False)).exists():
            return City.objects.filter(Q(name=name) | Q(name_pl=name_pl))

        else:
            if name is None and name_pl is not None:
                try:
                    name = Translator().translate(name_pl, 'pl', 'en')
                except CannotTranslate:
                    raise NotFoundError("There is not such city")

            if country is None and country_pl is not None:
                try:
                    country = Translator().translate(country_pl, 'pl', 'en')
                except CannotTranslate:
                    raise NotFoundError("There is not such country")

            if name is not None:
                url = city_api_url + '?sort=-population&namePrefix=' + name
                headers = {"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com", "X-RapidAPI-Key": api_key}
                response = requests.get(url, headers=headers)
                if response.status_code == 200:
                    city_list = []
                    for city_res in response.json()["data"]:
                        if country is None or city_res["country"].lower() == country.lower():
                            city = City(name=city_res["name"],
                                        name_pl = name_pl,
                                        country=city_res["country"],
                                        country_pl = country_pl,
                                        region=city_res["region"],
                                        population=city_res["population"],
                                        longitude=city_res["longitude"],
                                        latitude=city_res["latitude"])
                            city_list.append(city)
                    logging.info(f"Returning: {len(city_list)} biggest cities")
                    return city_list
                else:
                    raise NotFoundError()

            else:
                raise NotFoundError()

    @staticmethod
    def save_city(data):
        city = City(name=data.get("name", None),
                    name_pl=data.get("name_pl", None),
                    country=data.get("country", None),
                    country_pl=data.get("country_pl", None),
                    region=data.get("region", None),
                    population=data.get("population", None),
                    longitude=data.get("longitude", None),
                    latitude=data.get("latitude", None))

        if City.objects.filter(Q(name=city.name) | Q(country=city.country)).exists():
            raise AlreadyExistError()

        try:
            city.save()
            logging.info(f"Saved city:: {city.name}.")
        except IntegrityError as exp:
            raise NotAllMandatoryFields(exp)
        except Exception as exp:
            raise exp

    @staticmethod
    def delete_city(city, country):
        if City.objects.filter(Q(name=city) | Q(country=country)).exists():
            Country.objects.get(Q(name=city) | Q(country=country)).delete()
            logging.info(f"Deleted country from database: {city}")