from rest_framework import serializers

from .models import Exercise


class ExerciseSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")

    class Meta:
        model = Exercise
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(ExerciseSerializer, self).to_representation(instance)
        rep['deck'] = instance.deck.name
        rep['deck_id'] = instance.deck.id
        rep['user_name'] = instance.user.username
        rep['user_id'] = instance.user.id
        return rep