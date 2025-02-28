from django.urls import path
from .views import create_analysis, list_analyses, get_analysis

urlpatterns = [
    path('create/', create_analysis, name='create_analysis'),
    path('list/', list_analyses, name='list_analyses'),
    path('get/<uuid:reference_id>/', get_analysis, name='get_analysis'),
]
