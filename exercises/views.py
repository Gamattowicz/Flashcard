from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from decks.models import Deck
from .models import Exercise
from .serializers import ExerciseSerializer


class ExerciseList(ListAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user = request.user
        queryset = Exercise.objects.filter(user=user.id).order_by('created_at')

        page = request.query_params.get('page')
        paginator = Paginator(queryset, 12)
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
        return Response({'exercises': serializer.data, 'page': page, 'pages': paginator.num_pages})


class ExerciseAllList(ListAPIView):
    queryset = Exercise.objects.all().order_by('created_at')
    serializer_class = ExerciseSerializer
    permission_classes = [IsAdminUser]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = request.query_params.get('page')
        paginator = Paginator(queryset, 12)
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
        return Response({'exercises': serializer.data, 'page': page, 'pages': paginator.num_pages})


class ExerciseDetail(RetrieveAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


class ExerciseCreate(CreateAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        user = request.user
        deck = Deck.objects.get(id=pk)
        data = request.data

        if int(data['wordNumber']) > len(deck.word_set.all()):
            message = {'detail': 'There are fewer words in the selected deck than the number of words you '
                                 'have chosen to practice. Please choose fewer words to practice or add more words.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        elif int(data['wordNumber']) <= 0:
            message = {'detail': 'Number of words must be greater than 0.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        exercise = Exercise.objects.create(
            user=user,
            words_num=data['wordNumber'],
            correct_answers=data['correctAnswers'],
            wrong_answers=data['wrongAnswers'],
            deck=deck
        )

        serializer = ExerciseSerializer(exercise, many=False)
        return Response(serializer.data)


class ExerciseUpdateCorrectAnswer(UpdateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        exercise = self.get_object()
        exercise .correct_answers += 1
        exercise .save()

        serializer = self.serializer_class(exercise)
        return Response(serializer.data)


class ExerciseUpdateWrongAnswer(UpdateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        exercise = self.get_object()
        exercise.wrong_answers += 1
        exercise.save()

        serializer = self.serializer_class(exercise)
        return Response(serializer.data)


class ExerciseUpdateTime(UpdateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        exercise = self.get_object()
        data = request.data
        exercise.time = data.get('time', exercise.time)

        exercise.save()
        serializer = self.serializer_class(exercise)
        return Response(serializer.data)