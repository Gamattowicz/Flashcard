from rest_framework import serializers
from .models import Deck
from words.models import Word


class DeckSerializer(serializers.ModelSerializer):
    words = serializers.SlugRelatedField(many=True, source='word_set', queryset=Word.objects.all(), slug_field='question')
    words_id = serializers.PrimaryKeyRelatedField(many=True, source='word_set', queryset=Word.objects.all())

    class Meta:
        model = Deck
        fields = ('id', 'name', 'words', 'words_id')