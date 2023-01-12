import requests
import logging
from platePlaceVisualizator.constants import translate_api_url
from platePlaceVisualizator.secret import api_key

from platePlaceVisualizator.exceptions import *


class Translator:

    def __init__(self):
        pass

    @staticmethod
    def translate(text, src_language, dst_language) -> str:
        """
        Method that translates text from one language to another using rest api
        :param text: text to translae
        :param src_language: source language
        :param dst_language: destiny_language
        :return: translated text
        """
        url = f"{translate_api_url}?api-version=3.0&to[0]={dst_language}&from={src_language}&textType=plain&profanityAction=NoAction"
        headers = {"X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
                   "X-RapidAPI-Key": api_key,
                   "content-type": 'application/json'}

        data = '[{"Text":"' + text + '"}]'
        response = requests.post(url, data=data, headers=headers)

        if response.status_code == 200:
            result = response.json()[0]['translations'][0]['text']
            logging.info(f"Translated: {text} {result}")
            return result
        else:
            raise CannotTranslate()

