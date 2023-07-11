from django.urls import path
from . import views

urlpatterns = [
    path('index', views.cargarInicio),
    path('iniciar_sesion', views.cargarIniciarSesion,),
    path('logearse/', views.logearse),
    path('cerrar_sesion', views.cerrar_sesion),
    path('admin_productos', views.cargarAdminProductos),
    path('registrarse', views.cargarRegistrarse),
    path('crear_usuario/', views.crear_usuario),
    path('tienda', views.cargarTienda),
    path('carrito', views.cargarCarrito),
    path('agregarAlCarrito/', views.agregarAlCarrito),
    path('checkout', views.cargarCheckOut),
    path('procesarOrden/', views.procesarOrden),
    path('agregarProductoForm', views.agregarProducto),
    path('editarProducto/<sku>', views.editarProducto),
    path('editarProductoForm/<sku>', views.editarProductoForm),
    path('eliminarProducto/<sku>', views.eliminarProducto),
    path('carrito', views.carrito),
    path('tienda/<sku>', views.obtenerProductoId, name='obtener-producto')
]
