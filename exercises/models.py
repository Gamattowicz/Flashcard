from django.contrib.auth.models import User
from django.db import models

from decks.models import Deck


# Create your models here.


class Exercise(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    words_num = models.IntegerField(null=True, blank=True, default=5)
    correct_answers = models.IntegerField(null=True, blank=True, default=0)
    wrong_answers = models.IntegerField(null=True, blank=True, default=0)
    time = models.IntegerField(null=True, blank=True, default=0)
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, null=False)
    created_at = models.DateTimeField(auto_now_add=True)