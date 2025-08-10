from django.urls import path

from . import views

urlpatterns = [
    path('api/spotify/<str:spotify_id>/', views.api_spotify),
    path('api/spotify/', views.api_all_spotifys),
    path('api/clima/', views.api_all_climas),
    path('api/clima/<int:clima_id>/', views.api_clima),
    path('api/clima/<str:cidade>/', views.api_cidade_clima),
]

