from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from .models import Word
from category.models import Category
from decks.models import Deck
from exercises.models import Exercise
from .serializers import WordSerializer
from random import sample
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


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

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.studied += 1
        instance.save()
        word_exercises = {'word_exercises': instance.studied}
        serializer = self.serializer_class(request.user, data=word_exercises, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)

        return Response(serializer.data)


class WordUpdateCorrectAnswer(UpdateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.correct_answers += 1
        instance.save()
        correct_answers = {'correct_answers': instance.correct_answers}
        serializer = self.serializer_class(request.user, data=correct_answers, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)

        return Response(serializer.data)


class WordUpdateWrongAnswer(UpdateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.wrong_answers += 1
        instance.save()
        wrong_answers = {'wrong_answers': instance.wrong_answers}
        serializer = self.serializer_class(request.user, data=wrong_answers, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)

        return Response(serializer.data)