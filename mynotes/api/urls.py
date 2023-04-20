from django.urls import path
from . import views
urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('note/<str:pk>', views.getNote, name="note"),
    path('notes/', views.getNotes, name="notes"),
]
