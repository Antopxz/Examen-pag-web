from django.shortcuts import render

# Create your views here.


def cargarInicio(request):
    return render(request, "base.html")


def cargarIniciarSesion(request):
    return render(request, "iniciarSesion.html")


def cargarAdminProductos(request):
    return render(request, "administrarProductos.html")
