from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Word
from category.models import Category
from decks.models import Deck
from exercises.models import Exercise
from .serializers import WordSerializer
from random import sample
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_words(request):
    user = request.user
    words = Word.objects.filter(user=user.id)

    page = request.query_params.get('page')
    paginator = Paginator(words, 6)
    try:
        words = paginator.page(page)
    except PageNotAnInteger:
        words = paginator.page(1)
    except EmptyPage:
        words = paginator.page(paginator.num_pages)
    if page is None:
        page = 1
    page = int(page)

    serializer = WordSerializer(words, many=True)
    return Response({'words': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_words(request):
    words = Word.objects.all()

    page = request.query_params.get('page')
    paginator = Paginator(words, 6)
    try:
        words = paginator.page(page)
    except PageNotAnInteger:
        words = paginator.page(1)
    except EmptyPage:
        words = paginator.page(paginator.num_pages)
    if page is None:
        page = 1
    page = int(page)

    serializer = WordSerializer(words, many=True)
    return Response({'words': serializer.data, 'page': page, 'pages': paginator.num_pages})


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
        question=data['question'],
        answer=data['answer'],
        category=category,
        deck=deck
    )

    serializer = WordSerializer(word, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def draw_word(request, pk):
    deck_id = Exercise.objects.get(id=pk).deck_id
    words = list(Word.objects.filter(deck=deck_id))
    print(words)
    word = sample(words, 1)
    print(word)

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