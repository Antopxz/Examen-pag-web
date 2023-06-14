from django.shortcuts import render, redirect
from .models import *
# Create your views here.


def cargarInicio(request):
    return render(request, "base.html")


def cargarIniciarSesion(request):
    return render(request, "iniciarSesion.html")


def cargarAdminProductos(request):
    categorias = Categoria.objects.all()
    productos = Producto.objects.all()
    return render(request, "administrarProductos.html", {"cate": categorias, "prod": productos})


def agregarProducto(request):
    print("PRODUCTO AGREGAR", request.POST)
    v_img = request.FILES['img']
    v_sku = request.POST['txtSku']
    v_nombre = request.POST['producto']
    v_stock = request.POST['cantidad']
    v_precio = request.POST['precio']
    v_descripcion = request.POST['descripcion']
    v_categoria = Categoria.objects.get(
        id_categoria=request.POST['cmbCategoria'])

    Producto.objects.create(sku=v_sku, nombre=v_nombre, stock=v_stock, precio=v_precio,
                            descripcion=v_descripcion, id_cat=v_categoria, img_url=v_img)

    return redirect('/admin_productos')


def cargarRegistrarse(request):
    return render(request, "registro.html")


def cargarTienda(request):
    productos = Producto.objects.all()
    categoria_perros = Producto.objects.filter(id_cat=1)
    categoria_gatos = Producto.objects.filter(id_cat=2)
    return render(request, "tienda.html", {"prod": productos, "cate_gatos": categoria_gatos, "cate_perros": categoria_perros})
