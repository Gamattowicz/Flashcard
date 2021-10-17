from rest_framework import serializers

from words.models import Word
from .models import Deck


class DeckSerializer(serializers.ModelSerializer):
    words_id = serializers.PrimaryKeyRelatedField(
        many=True, source="word_set", queryset=Word.objects.all()
    )

    class Meta:
        model = Deck
        fields = ("id", "name", "words_id")

    def to_representation(self, instance):
        rep = super(DeckSerializer, self).to_representation(instance)
        rep["user_name"] = instance.user.username
        rep["user_id"] = instance.user.id
        return rep
