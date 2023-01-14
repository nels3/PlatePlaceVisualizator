from django.db import models


class Plate(models.Model):
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country_pl = models.CharField(max_length=100, blank=True)
    city_pl = models.CharField(max_length=100, blank=True)
    longitude = models.CharField(max_length=100)
    latitude = models.CharField(max_length=100)
    info = models.CharField(max_length=1000, blank=True)
    objects = models.Manager()


class Country(models.Model):
    name = models.CharField(max_length=100)
    name_pl = models.CharField(max_length=100)
    capital = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    subregion = models.CharField(max_length=100)
    objects = models.Manager()


class City(models.Model):
    name = models.CharField(max_length=100, null=False)
    name_pl = models.CharField(max_length=100, null=True)
    country = models.CharField(max_length=100, null=False)
    country_pl = models.CharField(max_length=100, null=True)
    region = models.CharField(max_length=100, null=True)
    population = models.CharField(max_length=100, null=True)
    longitude = models.CharField(max_length=100, null=False)
    latitude = models.CharField(max_length=100, null=False)
    objects = models.Manager()
