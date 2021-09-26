from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)
    last_login = serializers.SerializerMethodField(read_only=True)
    date_joined = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'is_admin', 'last_login', 'date_joined']

    @classmethod
    def get_is_admin(cls, obj):
        return obj.is_staff

    @classmethod
    def get_name(cls, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    @classmethod
    def get_last_login(cls, obj):
        if obj.last_login:
            return obj.last_login.strftime('%d-%m-%Y %a %H:%M:%S')

    @classmethod
    def get_date_joined(cls, obj):
        return obj.date_joined.strftime('%d-%m-%Y %a %H:%M:%S')


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'is_admin', 'last_login','date_joined', 'token']

    @classmethod
    def get_token(cls, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)