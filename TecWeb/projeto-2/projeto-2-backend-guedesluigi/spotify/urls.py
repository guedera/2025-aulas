from django.urls import path

from . import views

urlpatterns = [
    path('api/spotify/<str:spotify_id>/', views.api_spotify),
    path('api/spotify/', views.api_all_spotifys),
]