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
        words_num=data['wordNumber'],
        correct_answers=data['correctAnswers'],
        wrong_answers=data['wrongAnswers'],
        deck=deck
    )

    serializer = ExerciseSerializer(exercise, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_exercise(request, pk):
    exercise = Exercise.objects.get(id=pk)
    serializer = ExerciseSerializer(exercise, many=False)

    data = request.data
    exercise.correct_answers = data['correctAnswers']
    exercise.wrong_answers = data['wrongAnswers']

    exercise.save()
    return Response(serializer.data)