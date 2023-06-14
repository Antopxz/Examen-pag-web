from django.shortcuts import render
from .models import *
# Create your views here.


def cargarInicio(request):
    return render(request, "base.html")


def cargarIniciarSesion(request):
    return render(request, "iniciarSesion.html")


def cargarAdminProductos(request):
    categorias = Categoria.objects.all()
    return render(request, "administrarProductos.html", {"cate": categorias})


def cargarRegistrarse(request):
    return render(request, "registro.html")


def cargarTienda(request):
    productos = Producto.objects.all()
    categoria_perros = Producto.objects.filter(id_cat=1)
    categoria_gatos = Producto.objects.filter(id_cat=2)
    return render(request, "tienda.html", {"prod": productos, "cate_gatos": categoria_gatos, "cate_perros": categoria_perros})
