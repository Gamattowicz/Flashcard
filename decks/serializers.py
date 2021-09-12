from rest_framework import serializers
from .models import Deck
from words.models import Word


class DeckSerializer(serializers.ModelSerializer):
    words_id = serializers.PrimaryKeyRelatedField(many=True, source='word_set', queryset=Word.objects.all())

    class Meta:
        model = Deck
        fields = ('id', 'name', 'words_id')