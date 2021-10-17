from rest_framework import serializers

from .models import Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = (
            "id",
            "user",
            "question",
            "answer",
            "deck",
            "category",
            "studied",
            "correct_answers",
            "wrong_answers",
            "created_at",
        )

    def to_representation(self, instance):
        rep = super(WordSerializer, self).to_representation(instance)
        rep["category"] = instance.category.name
        rep["deck"] = instance.deck.name
        rep["deck_id"] = instance.deck.id
        rep["category_id"] = instance.category.id
        rep["user_name"] = instance.user.username
        rep["user_id"] = instance.user.id
        return rep
