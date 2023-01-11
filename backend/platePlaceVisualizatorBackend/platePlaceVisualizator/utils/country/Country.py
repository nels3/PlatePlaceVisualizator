import requests, logging
from platePlaceVisualizator.exceptions import *
from platePlaceVisualizator.models import *

api_url = 'https://restcountries.com/v3.1/'


class CountryUtils:
    possible_language = ['eng', 'pl']

    def __init__(self):
        pass

    @staticmethod
    def refresh():
        url = api_url + 'all'
        response_list = requests.get(url)
        for response in response_list.json():
            print(response)
            print("------")
            #print(response.json())
            #country = Country(name="AA")

    def get_country(self, name, language):
        if language not in self.possible_language:
            raise NoConfiguredLanguage()

        if language == 'eng' and Country.objects.filter(name=name).exists():
            return Country.objects.get(name=name)
        elif language == 'pl' and Country.objects.filter(name_pl=name).exists():
            return Country.objects.get(name_pl=name)
        else:
            if language == 'eng':
                url = api_url + 'name/' + name
                response = requests.get(url)
                if response.status_code == 200:
                    country = Country(name=name,
                                      name_pl=response.json()[0]['translations']['pol']['common'],
                                      capital=response.json()[0]['capital'][0],
                                      region=response.json()[0]['region'],
                                      subregion=response.json()[0]['subregion'])
                    country.save()
                    logging.info(f"Saving new country: {name}")
                    return country
                else:
                    raise NotFoundError()
