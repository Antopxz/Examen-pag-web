from django.urls import path
from . import views

urlpatterns = [
    path('', views.cargarInicio),
    path('iniciar_sesion', views.cargarIniciarSesion,),
    path('admin_productos', views.cargarAdminProductos)
]
