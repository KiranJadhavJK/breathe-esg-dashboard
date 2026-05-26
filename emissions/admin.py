from django.contrib import admin

from .models import (
    Organization,
    RawRecord,
    EmissionRecord
)


admin.site.register(Organization)
admin.site.register(RawRecord)
admin.site.register(EmissionRecord)