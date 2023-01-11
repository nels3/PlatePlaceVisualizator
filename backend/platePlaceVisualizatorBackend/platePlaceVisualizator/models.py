from django.db import models


class Plate(models.Model):
    town = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    town_pl = models.CharField(max_length=100, blank=True)
    city_pl = models.CharField(max_length=100, blank=True)
    longitude = models.CharField(max_length=100)
    latitude = models.CharField(max_length=100)
    objects = models.Manager()
    
