from django.urls import path
from . import views

urlpatterns = [
	path('crud_get_post/', views.crud_get_post, name="crud_get_post"),
	path('crud_update_delete/<pk>/', views.crud_update_delete, name="crud_update_delete")
]
