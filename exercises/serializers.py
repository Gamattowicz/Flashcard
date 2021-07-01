from rest_framework import serializers
from .models import Exercise


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(ExerciseSerializer, self).to_representation(instance)
        rep['deck'] = instance.deck.name
        return rep