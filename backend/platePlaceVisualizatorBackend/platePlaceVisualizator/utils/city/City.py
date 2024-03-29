import requests
import logging
from platePlaceVisualizator.exceptions import *
from platePlaceVisualizator.models import *
from django.db.models import Q
from django.db.utils import IntegrityError

from platePlaceVisualizator.utils.translator.Translator import Translator
from platePlaceVisualizator.utils.country.Country import CountryUtils

from platePlaceVisualizator.constants import city_api_url
from platePlaceVisualizator.secret import api_key


class CityUtils:

    def __init__(self):
        pass

    @staticmethod
    def get_cities(name, name_pl, country, country_pl) -> [City]:
        """
        Returning cities list that match arguments from database or rest_api if any city exists in database
        :param name: Name of city in english, possible option: prefix
        :param name_pl: Name of city in polish
        :param country: Name of country in english
        :param country_pl: Name of country in polish
        :return: Cities list from database or from rest_api
        """

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
                            country_pl_tmp = ""
                            if country_pl is None and city_res["country"] is not None:
                                try:
                                    country_obj = Country.objects.filter(name=city_res["country"]).first()
                                    country_pl_tmp = country_obj.name_pl
                                except Exception:
                                    pass
                            if (country_pl is None or country_pl == "") and country_pl_tmp == "" and city_res["country"]:
                                try:
                                    countryObj = CountryUtils.save_country_by_name(city_res["country"], False)
                                    country_pl_tmp = countryObj.name_pl
                                except Exception:
                                    pass

                            name_pl_tmp = ""
                            if name_pl is None:
                                name_pl_tmp = city_res["name"]

                            city = City(name=city_res["name"],
                                        name_pl = name_pl if name_pl else name_pl_tmp,
                                        country=city_res["country"],
                                        country_pl=country_pl if country_pl else country_pl_tmp,
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
    def update_city(data):
        """
        Saving City in database
        :param data: dictionary with all necessary parameters
        :return:
        """

        id = data.get("id", None)
        if not City.objects.filter(Q(id=id)).exists():
            raise NotFoundError()

        city = City.objects.get(Q(id=id))
        city.name = data.get("name", None)
        city.name_pl = data.get("name_pl", None)
        city.country = data.get("country", None)
        city.country_pl = data.get("country_pl", None)
        city.region = data.get("region", None)
        city.population = data.get("population", None)
        city.longitude = data.get("longitude", None)
        city.latitude = data.get("latitude", None)

        try:
            city.save()
            logging.info(f"Updated city:: {city.name}.")
        except IntegrityError as exp:
            raise NotAllMandatoryFields(exp)
        except Exception as exp:
            raise exp

    @staticmethod
    def save_city(data):
        """
        Saving City in database
        :param data: dictionary with all necessary parameters
        :return:
        """
        city = City(name=data.get("name", None),
                    name_pl=data.get("name_pl", None),
                    country=data.get("country", None),
                    country_pl=data.get("country_pl", None),
                    region=data.get("region", None),
                    population=data.get("population", None),
                    longitude=data.get("longitude", None),
                    latitude=data.get("latitude", None))

        if City.objects.filter(name=data.get("name", None)).exists():
            raise AlreadyExistError()

        country = CountryUtils.save_country_by_name(data.get("country"))
        if city.country_pl is None or city.country_pl == "":
            city.country_pl = country.name_pl

        try:
            city.save()
            logging.info(f"Saved city:: {city.name}.")
        except IntegrityError as exp:
            raise NotAllMandatoryFields(exp)
        except Exception as exp:
            raise exp

