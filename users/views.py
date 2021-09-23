from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, \
    RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer, UserSerializerWithToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserCreate(CreateAPIView):
    serializer_class = UserSerializerWithToken

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.create(
                username=data['username'],
                email=data['email'],
                password=make_password(data['password'])
            )
            serializer = self.get_serializer(user, many=False)
            return Response(serializer.data)
        except:
            message = {'detail': 'User with this email already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class UserProfileUpdate(UpdateAPIView):
    serializer_class = UserSerializerWithToken
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        user.username = data['username']
        user.email = data['email']
        if data['password'] != '':
            user.password = make_password(data['password'])
        user.save()
        serializer = self.serializer_class(user, data=data, partial=True, many=False)
        if serializer.is_valid():
            self.perform_update(serializer)

        return Response(serializer.data)


class UserProfile(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user, many=False)
        return Response(serializer.data)


class UserList(ListAPIView):
    queryset = User.objects.all().order_by('date_joined')
    serializer_class = UserSerializer
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
        return Response({'users': serializer.data, 'page': page, 'pages': paginator.num_pages})


class UserDetail(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, pk, *args, **kwargs):
        user = User.objects.get(id=pk)
        serializer = self.get_serializer(user, many=False)
        return self.retrieve(request, *args, **kwargs)


class UserDelete(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class UserUpdate(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def partial_update(self, request, *args, **kwargs):
        user = self.get_object()
        data = request.data
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.is_staff = data.get('is_admin', user.is_staff)

        user.save()
        serializer = self.serializer_class(user)
        return Response(serializer.data)