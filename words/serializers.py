from rest_framework import serializers
from .models import Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(WordSerializer, self).to_representation(instance)
        rep['category'] = instance.category.name
        rep['deck'] = instance.deck.name
        return rep