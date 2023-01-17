import logging
from platePlaceVisualizator.exceptions import *
from platePlaceVisualizator.models import *
from django.db.models import Q
from django.db.utils import IntegrityError


class PlateUtils:

    def __init__(self):
        pass

    @staticmethod
    def get_plate_by_id(id) -> Plate:
        plate = Plate.objects.get(id=id)
        logging.info(f"Returning plate with id {id}.")
        return plate

    @staticmethod
    def get_plates_from_country(country, country_pl) -> [Plate]:
        plates_list = Plate.objects.filter((Q(country=country) & Q(country__isnull=False)) |
                                           (Q(country_pl=country_pl)) & Q(country_pl__isnull=False))
        logging.info(f"Returning {len(plates_list)} from {country}/{country_pl}")
        return plates_list

    @staticmethod
    def get_plates_from_city(city, city_pl) -> [Plate]:
        plates_list = Plate.objects.filter((Q(city=city) & Q(city__isnull=False)) |
                                           (Q(city_pl=city_pl)) & Q(city_pl__isnull=False))
        logging.info(f"Returning {len(plates_list)} from {city}/{city_pl}")
        pass

    @staticmethod
    def save_plate(data):
        plate = Plate(country=data.get("country", None),
                      city=data.get("city", None),
                      country_pl=data.get("country_pl", None),
                      city_pl=data.get("city_pl", None),
                      longitude=data.get("longitude", None),
                      latitude=data.get("latitude", None),
                      info=data.get("info", None))
        if data.get("id", None) is not None:
            plate.id = data.get("id", None)

        try:
            plate.save()
            logging.info(f"Saved plate:: {plate.city} with id {plate.id}.")
        except IntegrityError as exp:
            raise NotAllMandatoryFields(exp)
        except Exception as exp:
            raise exp

    @staticmethod
    def save_plate_image(data):
        plate_id = data.get("id")
        file = data.get('file')

        if not Plate.objects.filter(id=plate_id).exists():
            raise NotFoundError()

        plate = Plate.objects.get(id=plate_id)
        plate.img = file
        plate.save()
        logging.info(f"Saved plate image:: {plate.id}")

    @staticmethod
    def delete_plate(id):
        if Plate.objects.filter(id=id).exists():
            Plate.objects.get(id.id).delete()
            logging.info(f"Deleted plate from database with id: {id}")

    @staticmethod
    def delete_plate_image(id):
        if Plate.objects.filter(id=id).exists():
            plate = Plate.objects.get(id.id)
            plate.image = None
            plate.save()
            logging.info(f"Deleted plate image from database with id: {id}")
