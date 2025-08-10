from django.urls import path

from . import views

urlpatterns = [
    path('api/formula/', views.api_formula_time), #login
    path('api/token/', views.api_get_token), #token
    path('api/users/', views.api_user), #cadastro
    path('registrar_usuario/', views.registrar_usuario), #cadastro
    path('api/favoritos/piloto/', views.favoritar_piloto),
    path('api/favoritos/piloto/<str:piloto_nome>/', views.desfavoritar_piloto),
    path('api/favoritos/time/', views.favoritar_time),
    path('api/favoritos/time/<str:time_nome>/', views.desfavoritar_time),
    path('api/favoritos/piloto/<str:piloto_nome>/verificar/', views.verificar_piloto),
    path('api/favoritos/time/<str:time_nome>/verificar/', views.verificar_time),
    path('api/favoritos/', views.get_user_favorites, name='get_user_favorites'),  # Changed from 'favoritos/' to 'api/favoritos/'
    #path('api/formula/', views.api_spotify), #cadastro
    #path('api/formula/', views.api_spotify), #buscar
    #path('api/formula/', views.api_spotify), #piloto/equipe
    #path('api/formula/home', views.api_all_spotifys), #principal
]