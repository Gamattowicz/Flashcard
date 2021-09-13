from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from .models import Exercise
from .serializers import ExerciseSerializer
from decks.models import Deck
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


class ExerciseList(ListAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user = request.user
        queryset = Exercise.objects.filter(user=user.id).order_by('created_at')

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
        return Response({'exercises': serializer.data, 'page': page, 'pages': paginator.num_pages})


class ExerciseAllList(ListAPIView):
    queryset = Exercise.objects.all().order_by('created_at')
    serializer_class = ExerciseSerializer
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

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.correct_answers += 1
        instance.save()
        correct_answers = {'correct_answers': instance.correct_answers}
        serializer = self.serializer_class(request.user, data=correct_answers, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)

        return Response(serializer.data)


class ExerciseUpdateWrongAnswer(UpdateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
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