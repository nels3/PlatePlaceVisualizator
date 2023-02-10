import requests, logging
from platePlaceVisualizator.models import *
from platePlaceVisualizator.exceptions import *
from django.db.models import Q
from django.db.utils import IntegrityError

from platePlaceVisualizator.constants import country_api_url
from platePlaceVisualizator.utils.translator.Translator import Translator


class CountryUtils:
    possible_language = ['eng', 'pl']

    def __init__(self):
        pass

    def get_country(self, name, language, save_if_found=False) -> Country:
        """
        Returning existing Country object or using rest api
        :param save_if_found: save found new country if everything alright
        :param name: name of country in language
        :param language: language of name, possible: self.possible_languaage
        :return: Country object
        """
        if language not in self.possible_language:
            raise NoConfiguredLanguage()

        if language == 'eng' and Country.objects.filter(name=name).exists():
            return Country.objects.get(name=name)
        elif language == 'pl' and Country.objects.filter(name_pl=name).exists():
            return Country.objects.get(name_pl=name)
        else:
            name_en = name
            if language == 'pl':
                try:
                    name_en = Translator().translate(name, 'pl', 'en')
                except CannotTranslate:
                    raise NotFoundError()

            url = country_api_url + 'name/' + name_en
            response = requests.get(url)

            if response.status_code == 200:
                country = Country(name=name_en,
                                  name_pl=response.json()[0]['translations']['pol']['common'],
                                  capital=response.json()[0]['capital'][0],
                                  region=response.json()[0]['region'],
                                  subregion=response.json()[0]['subregion'],
                                  latitude=response.json()[0]['capitalInfo']['latlng'][0],
                                  longitude=response.json()[0]['capitalInfo']['latlng'][1])
                if save_if_found:
                    country.save()
                logging.info(f"Saving new country: {name}")
                return country
            else:
                raise NotFoundError()

    @staticmethod
    def save_country(data):
        """
        Saving Country in database
        :param data: dictionary with all necessary parameters
        :return:
        """
        country = Country(name=data.get("name", None),
                          name_pl=data.get("name_pl", None),
                          capital=data.get("capital", None),
                          region=data.get("region", None),
                          subregion=data.get("subregion", None),
                          latitude=data.get("latitude", None),
                          longitude=data.get("longitude", None))
        try:
            country.save()
            logging.info(f"Saved country:: {country.name}.")
        except IntegrityError as exp:
            raise NotAllMandatoryFields(exp)
        except Exception as exp:
            raise exp

    @staticmethod
    def save_country_by_name(name, save=True) -> Country:
        """
        Saving Country in database
        :param data: dictionary with all necessary parameters
        :return:
        """
        if Country.objects.filter(name=name).exists():
            return Country.objects.filter(name=name).first()
        else:

            url = country_api_url + 'name/' + name
            response = requests.get(url)

            if response.status_code == 200:
                country = Country(name=name,
                                  name_pl=response.json()[0]['translations']['pol']['common'],
                                  capital=response.json()[0]['capital'][0],
                                  region=response.json()[0]['region'],
                                  subregion=response.json()[0]['subregion'],
                                  latitude=response.json()[0]['capitalInfo']['latlng'][0],
                                  longitude=response.json()[0]['capitalInfo']['latlng'][1])
                if save:
                    country.save()
                logging.info(f"Saving new country: {name}")
                return country
            else:
                return {}

    @staticmethod
    def update_country(data):
        """
        Updating Country in database
        :param data: dictionary with all necessary parameters
        :return:
        """

        id = data.get("id", None)
        if not Country.objects.filter(Q(id=id)).exists():
            raise NotFoundError()

        country = Country.objects.get(Q(id=id))

        country.name = data.get("name", None)
        country.name_pl = data.get("name_pl", None)
        country.capital = data.get("capital", None)
        country.region = data.get("region", None)
        country.subregion = data.get("subregion", None)
        country.latitude = data.get("latitude", None)
        country.longitude = data.get("longitude", None)

        try:
            country.save()
            logging.info(f"Saved country: {country.name}.")
        except IntegrityError as exp:
            raise NotAllMandatoryFields(exp)
        except Exception as exp:
            raise exp