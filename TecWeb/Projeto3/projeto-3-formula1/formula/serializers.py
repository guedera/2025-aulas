from rest_framework import serializers
from .models import Formula1


class FormulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formula1
        fields = ['login', 'favpilot', 'favteam','p_favoritado','t_favoritado']