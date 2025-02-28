from django.db import models
import uuid

class AnalysisResult(models.Model):
    reference_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    company_name = models.CharField(max_length=255)
    sample_id = models.CharField(max_length=100)
    date_of_analysis = models.DateField(auto_now_add=True)
    
    # Analysis fields
    moisture = models.FloatField()
    ash = models.FloatField()
    crude_protein = models.FloatField()
    crude_fat = models.FloatField()
    fiber = models.FloatField()
    carbohydrates = models.FloatField(blank=True, null=True)  # Auto-calculated
    gross_energy = models.FloatField()
    vitamin_a = models.FloatField()
    vitamin_c = models.FloatField()
    
    # AI Analysis Result
    ai_analysis = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.carbohydrates is None:
            self.carbohydrates = 100 - (self.moisture + self.ash + self.crude_protein + self.crude_fat + self.fiber)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.company_name} - {self.sample_id} ({self.reference_id})"
