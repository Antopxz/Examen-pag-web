from django.urls import path
from . import views

urlpatterns = [
    path('', views.cargarInicio),
    path('iniciar_sesion', views.cargarIniciarSesion,),
    path('admin_productos', views.cargarAdminProductos),
    path('registrarse', views.cargarRegistrarse),
    path('tienda', views.cargarTienda),
    path('carrito', views.cargarCarrito),
    path('agregarAlCarrito/', views.agregarAlCarrito),
    path('checkout', views.cargarCheckOut),
    path('agregarProductoForm', views.agregarProducto),
    path('editarProducto/<sku>', views.editarProducto),
    path('editarProductoForm/<sku>', views.editarProductoForm),
    path('eliminarProducto/<sku>', views.eliminarProducto),
    path('carrito', views.carrito),
    path('tienda/<sku>', views.obtenerProductoId, name='obtener-producto')
]
