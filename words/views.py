from random import sample

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, \
    RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from category.models import Category
from decks.models import Deck
from exercises.models import Exercise
from .models import Word
from .serializers import WordSerializer


class WordList(ListAPIView):
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user = request.user
        queryset = Word.objects.filter(user=user.id).order_by('created_at')

        page = request.query_params.get('page')
        paginator = Paginator(queryset, 2)
        try:
            queryset = paginator.page(page)
        except PageNotAnInteger:
            queryset = paginator.page(1)
        except EmptyPage:
            queryset = paginator.page(paginator.num_pages)
        if page is None:
            page = 1
        page = int(page)

        serializer = self.get_serializer(queryset, many=True)
        return Response({'words': serializer.data, 'page': page, 'pages': paginator.num_pages})


class WordAllList(ListAPIView):
    queryset = Word.objects.all().order_by('created_at')
    serializer_class = WordSerializer
    permission_classes = [IsAdminUser]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = request.query_params.get('page')
        paginator = Paginator(queryset, 2)
        try:
            queryset = paginator.page(page)
        except PageNotAnInteger:
            queryset = paginator.page(1)
        except EmptyPage:
            queryset = paginator.page(paginator.num_pages)
        if page is None:
            page = 1
        page = int(page)

        serializer = self.get_serializer(queryset, many=True)
        return Response({'words': serializer.data, 'page': page, 'pages': paginator.num_pages})


class WordDetail(RetrieveAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer


class WordDeckList(ListAPIView):
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, pk, *args, **kwargs):
        user = request.user
        deck = Deck.objects.get(id=pk)
        queryset = Word.objects.filter(user=user.id, deck=deck).order_by('created_at')

        page = request.query_params.get('page')
        paginator = Paginator(queryset, 2)
        try:
            queryset = paginator.page(page)
        except PageNotAnInteger:
            queryset = paginator.page(1)
        except EmptyPage:
            queryset = paginator.page(paginator.num_pages)
        if page is None:
            page = 1
        page = int(page)

        serializer = self.get_serializer(queryset, many=True)
        return Response({'words': serializer.data, 'page': page, 'pages': paginator.num_pages})


class WordCreate(CreateAPIView):
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, pk2, *args, **kwargs):
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

        serializer = self.get_serializer(word, many=False)
        return Response(serializer.data)


class WordDelete(DestroyAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]


class WordDraw(ListAPIView):
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, pk,*args, **kwargs):
        deck_id = Exercise.objects.get(id=pk).deck_id
        words = list(Word.objects.filter(deck=deck_id))
        queryset = sample(words, 1)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class WordUpdateExercise(UpdateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        word = self.get_object()
        word.studied += 1

        word.save()
        serializer = self.serializer_class(word)
        return Response(serializer.data)


class WordUpdateCorrectAnswer(UpdateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        word = self.get_object()
        word.correct_answers += 1

        word.save()
        serializer = self.serializer_class(word)
        return Response(serializer.data)


class WordUpdateWrongAnswer(UpdateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        word = self.get_object()
        word.wrong_answers += 1

        word.save()
        serializer = self.serializer_class(word)
        return Response(serializer.data)


class WordUpdate(RetrieveUpdateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        word = self.get_object()
        data = request.data
        word.question = data.get('question', word.question)
        word.answer = data.get('answer', word.answer)
        word.category = Category.objects.get(name=data.get('category', word.category.name))
        word.deck = Deck.objects.get(name=data.get('deck', word.deck.name))

        word.save()
        serializer = self.serializer_class(word)
        return Response(serializer.data)