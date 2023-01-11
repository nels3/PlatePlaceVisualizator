from django.db import models


class Plate(models.Model):
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country_pl = models.CharField(max_length=100, blank=True)
    city_pl = models.CharField(max_length=100, blank=True)
    longitude = models.CharField(max_length=100)
    latitude = models.CharField(max_length=100)
    objects = models.Manager()


class Country(models.Model):
    name = models.CharField(max_length=100)
    name_pl = models.CharField(max_length=100)
    capital = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    subregion = models.CharField(max_length=100)
    objects = models.Manager()

