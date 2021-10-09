from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Deck
from .serializers import DeckSerializer


class DeckList(ListAPIView):
    serializer_class = DeckSerializer

    def list(self, request, *args, **kwargs):
        user = request.user
        queryset = Deck.objects.filter(user=user.id).order_by('id')

        page = request.query_params.get('page')
        paginator = Paginator(queryset, 16)
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
        return Response({'decks': serializer.data, 'page': page, 'pages': paginator.num_pages})


class DeckAllList(ListAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
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
        return Response({'decks': serializer.data, 'page': page, 'pages': paginator.num_pages})


class DeckDetail(RetrieveAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer


class DeckCreate(CreateAPIView):
    serializer_class = DeckSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user

        queryset = Deck.objects.create(
            user=user,
            name=request.data.get('name'),
        )
        serializer = self.get_serializer(queryset, many=False)
        return Response(serializer.data)


class DeckDelete(DestroyAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    permission_classes = [IsAuthenticated]


class DeckUpdate(RetrieveUpdateAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.name = request.data.get('name')
        instance.save()
        serializer = self.serializer_class(data=instance, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)

        return Response(serializer.data)