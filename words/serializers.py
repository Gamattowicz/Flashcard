from rest_framework import serializers
from .models import Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('id', 'user', 'question', 'answer', 'deck', 'category', 'studied', 'correct_answers', 'wrong_answers',
                  'created_at', 'deck_id', 'category_id')

    def to_representation(self, instance):
        rep = super(WordSerializer, self).to_representation(instance)
        rep['category'] = instance.category.name
        rep['deck'] = instance.deck.name
        rep['deck_id'] = instance.deck.id
        rep['category_id'] = instance.category.id
        return rep