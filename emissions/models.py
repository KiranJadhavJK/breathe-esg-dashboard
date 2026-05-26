from django.db import models


class Organization(models.Model):

    name = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class RawRecord(models.Model):

    source_name = models.CharField(max_length=255, null=True, blank=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.source_name or "Raw Record"


class EmissionRecord(models.Model):

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('FLAGGED', 'Flagged'),
    ]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    raw_record = models.ForeignKey(
        RawRecord,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    scope = models.CharField(max_length=100)

    category = models.CharField(max_length=255)

    raw_value = models.FloatField()

    normalized_value = models.FloatField()

    normalized_unit = models.CharField(max_length=50)

    activity_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.organization} - {self.category}"