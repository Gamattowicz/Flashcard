from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Word
from category.models import Category
from decks.models import Deck
from .serializers import WordSerializer
from random import sample


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_words(request):
    user = request.user
    words = Word.objects.filter(user=user.id)
    serializer = WordSerializer(words, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_words(request):
    words = Word.objects.all()
    serializer = WordSerializer(words, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_word(request, pk):
    word = Word.objects.get(id=pk)
    serializer = WordSerializer(word, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_word(request, pk, pk2):
    user = request.user
    category = Category.objects.get(id=pk)
    deck = Deck.objects.get(id=pk2)
    data = request.data

    word = Word.objects.create(
        user=user,
        name=data['name'],
        definition=data['definition'],
        category=category,
        deck=deck
    )

    serializer = WordSerializer(word, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def draw_word(request):
    user = request.user
    words = list(Word.objects.filter(user=user))
    word = sample(words, 1)

    serializer = WordSerializer(word, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def add_exercise(request, pk):
    word = Word.objects.get(id=pk)
    word.studied += 1
    word.save()

    serializer = WordSerializer(word, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def add_correct_answer(request, pk):
    word = Word.objects.get(id=pk)
    word.correct_answers += 1
    word.save()

    serializer = WordSerializer(word, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def add_wrong_answer(request, pk):
    word = Word.objects.get(id=pk)
    word.wrong_answers += 1
    word.save()

    serializer = WordSerializer(word, many=False)
    return Response(serializer.data)