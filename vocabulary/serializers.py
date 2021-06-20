from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Word, Category


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name



class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(WordSerializer, self).to_representation(instance)
        rep['category'] = instance.category.name
        return rep


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'