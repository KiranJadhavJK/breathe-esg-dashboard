from django.urls import path
from .views import test_api, upload_csv, approve_record, flag_record

urlpatterns = [
    path('test/', test_api),
    path('upload/', upload_csv),
    path('approve/<int:record_id>/', approve_record),
    path('flag/<int:record_id>/', flag_record),
]