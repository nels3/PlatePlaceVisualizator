from django.http import JsonResponse
from rest_framework import status

from .serializers import *
from .models import *
from rest_framework.decorators import api_view


@api_view(['GET'])
def plate_list(request):
    if request.method == 'GET':
        plates = Plate.objects.all()
        serializer = PlateSerializer(plates, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)

