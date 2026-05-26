from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import pandas as pd

from .models import EmissionRecord, Organization


@api_view(['GET'])
def test_api(request):

    records = EmissionRecord.objects.all()

    data = []

    for record in records:

        data.append({
            "id": record.id,
            "organization": record.organization.name if record.organization else "N/A",
            "scope": record.scope,
            "category": record.category,
            "value": record.normalized_value,
            "unit": record.normalized_unit,
            "co2": 75,
            "status": record.status,
        })

    return Response({
        "message": "Breathe ESG API is running",
        "records": data
    })


@api_view(['POST'])
def upload_csv(request):

    file = request.FILES.get('file')

    if not file:
        return JsonResponse({
            "error": "No file uploaded"
        }, status=400)

    organization = Organization.objects.first()

    if not organization:
        organization = Organization.objects.create(
            name="Breathe ESG"
        )

    df = pd.read_csv(file)

    for index, row in df.iterrows():

        EmissionRecord.objects.create(
            organization=organization,
            scope=row['scope'],
            category=row['category'],
            raw_value=row['value'],
            normalized_value=row['value'],
            normalized_unit=row['unit'],
            activity_date='2026-05-26',
            status='PENDING'
        )

    return JsonResponse({
        "message": "CSV uploaded successfully"
    })


@api_view(['POST'])
def approve_record(request, record_id):

    record = EmissionRecord.objects.get(id=record_id)

    record.status = 'APPROVED'

    record.save()

    return Response({
        "message": "Record approved successfully"
    })


@api_view(['POST'])
def flag_record(request, record_id):

    record = EmissionRecord.objects.get(id=record_id)

    record.status = 'FLAGGED'

    record.save()

    return Response({
        "message": "Record flagged successfully"
    })