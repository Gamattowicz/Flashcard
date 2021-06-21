from django.db import models
from django.contrib.auth.models import User
from category.models import Category

# Create your models here.


class Word(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    definition = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{str(self.name)}'

    class Meta:
        ordering = ['name']