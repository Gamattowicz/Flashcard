from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Deck(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{str(self.name)}'