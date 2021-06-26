from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Exercise
from .serializers import ExerciseSerializer
from decks.models import Deck


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_exercise(request, pk):
    user = request.user
    deck = Deck.objects.get(id=pk)
    data = request.data

    exercise = Exercise.objects.create(
        user=user,
        words_num=data['words_num'],
        correct_answers=data['correct_answers'],
        wrong_answers=data['wrong_answers'],
        deck=deck
    )

    serializer = ExerciseSerializer(exercise, many=False)
    return Response(serializer.data)