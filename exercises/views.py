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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_exercises(request):
    user = request.user
    exercises = Exercise.objects.filter(user=user.id)
    serializer = ExerciseSerializer(exercises, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_exercise(request, pk):
    exercises = Exercise.objects.get(id=pk)
    serializer = ExerciseSerializer(exercises, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def add_correct_answer(request, pk):
    exercise = Exercise.objects.get(id=pk)
    exercise.correct_answers += 1
    exercise.save()

    serializer = ExerciseSerializer(exercise, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def add_wrong_answer(request, pk):
    exercise = Exercise.objects.get(id=pk)
    exercise.wrong_answers += 1
    exercise.save()

    serializer = ExerciseSerializer(exercise, many=False)
    return Response(serializer.data)