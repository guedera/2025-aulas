from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import Http404, HttpResponseForbidden, JsonResponse
from .models import Formula1
from .serializers import FormulaSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework import status


# Create your views here.
@api_view(['POST'])
def api_get_token(request):
    try:
        if request.method == 'POST':
            username = request.data['username']
            password = request.data['password']
            user = authenticate(username=username, password=password)

            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                return JsonResponse({"token":token.key})
            else:
                return HttpResponseForbidden()
    except:
        return HttpResponseForbidden()

@api_view(['POST'])
def api_user(request):
    username = request.data['username']
    password = request.data['password']
    email = request.data['email']

    if not username or not password or not email:
        return Response({'error': 'Todos os campos são obrigatórios'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Usuário já existe'}, status=400)
    user = User.objects.create_user(username=username, password=password, email=email)
    user.save()
    print(f"Usuário criado: {user.username}")
    return Response(status=201)

@api_view(['POST'])
def registrar_usuario(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'Faltando senha, nome de usuário ou email'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Usuário já existente'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    user.save()
    token = Token.objects.create(user=user)
    return Response({'message': 'Usuário criado com sucesso'}, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def api_formula_time(request, construtoraId,): #id do time ou do piloto
    print(f"Recebendo requisição para o ID: {construtoraId}")
    try:
        formula = Formula1.objects.get(construtoraId=construtoraId,user=request.user)
    except Formula1.DoesNotExist:
        if request.method == 'GET':        
            print("Problema no GET !!!!")
            raise Http404()
        elif request.method == 'POST':
            new_formula_data = request.data            
            print(f'Dados do Time: {request.data}')
            favteam = new_formula_data[construtoraId]
            login = new_formula_data['login']
            t_favoritado = new_formula_data['t_favoritado']
            formula = Formula1(favteam=favteam, login=login,t_favoritado=t_favoritado) # user=request.user
            formula.save()

    if request.method == 'DELETE':
        formula.delete()
        return Response(status=204)
    
    formulas = Formula1.objects.filter(user=request.user)
    serialized_formula = FormulaSerializer(formulas, many=True)
    return Response(serialized_formula.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def favoritar_piloto(request):
    user = request.user
    piloto_nome = request.data.get("driver_name", "")
    nome_usuario = user.username

    Formula1.objects.update_or_create(login=nome_usuario,defaults={'user': user,'favpilot': piloto_nome,'p_favoritado': True})
    return Response(status=204)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def desfavoritar_piloto(request, piloto_nome):
    try:
        favorito = Formula1.objects.get(login=request.user.username, favpilot=piloto_nome)
        favorito.p_favoritado = False
        piloto_nome = ""
        favorito.favpilot = piloto_nome

        favorito.save()
        return Response({"msg": "Piloto desfavoritado"})
    except Formula1.DoesNotExist:
        return Response({"msg": "Piloto não encontrado"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def favoritar_time(request):
    user = request.user
    time_nome = request.data.get("constructor_name", "")
    nome_usuario = user.username

    Formula1.objects.update_or_create(login=nome_usuario,defaults={'user': user,'favteam': time_nome,'t_favoritado': True})
    return Response({"msg": "Time favoritado com sucesso"}, status=204)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def desfavoritar_time(request, time_nome):
    try:
        favorito = Formula1.objects.get(login=request.user.username, favteam=time_nome)
        favorito.t_favoritado = False
        time_nome = ""
        favorito.favteam = time_nome
        favorito.save()
        return Response({"msg": "Time desfavoritado"})
    except Formula1.DoesNotExist:
        return Response({"msg": "Time não encontrado"}, status=404)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verificar_piloto(request, piloto_nome):
    existe = Formula1.objects.filter(login=request.user.username,favpilot=piloto_nome,p_favoritado=True).exists()
    return Response({'favoritado': existe})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verificar_time(request, time_nome):
    existe = Formula1.objects.filter(login=request.user.username,favteam=time_nome,t_favoritado=True).exists()
    return Response({'favoritado': existe})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_favorites(request):
    """Return the user's favorite driver and team."""
    try:
        favorito = Formula1.objects.get(login=request.user.username)
        return Response({
            'favpilot': favorito.favpilot,
            'p_favoritado': favorito.p_favoritado,
            'favteam': favorito.favteam,
            't_favoritado': favorito.t_favoritado
        })
    except Formula1.DoesNotExist:
        return Response({
            'favpilot': '',
            'p_favoritado': False,
            'favteam': '',
            't_favoritado': False
        })
