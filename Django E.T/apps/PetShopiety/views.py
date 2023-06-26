from django.shortcuts import render, redirect
from .models import *
import os
from django.conf import settings
from django.http import HttpResponse
import json
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
    # print("PRODUCTO AGREGAR", request.POST)
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


def editarProducto(request, sku):
    categorias = Categoria.objects.all()
    productos = Producto.objects.get(sku=sku)
    # print("PRODUCTO AGREGAR", request.POST)
    return render(request, "editarProducto.html", {"prod": productos, "cate": categorias})


def editarProductoForm(request, sku):

    productos = Producto.objects.get(sku=sku)
    productos.nombre = request.POST['producto']
    productos.stock = request.POST['cantidad']
    productos.precio = request.POST['precio']
    productos.descripcion = request.POST['descripcion']
    productos.id_cat = Categoria.objects.get(
        id_categoria=request.POST['cmbCategoria'])

    try:
        v_img = request.FILES['img']
        ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(productos.img_url))
        os.remove(ruta_imagen)
    except:
        v_img = productos.img_url

    productos.img_url = v_img

    productos.save()

    return redirect('/admin_productos')


def eliminarProducto(request, sku):
    producto = Producto.objects.get(sku=sku)
    ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(producto.img_url))
    os.remove(ruta_imagen)
    producto.delete()
    return redirect('/admin_productos')


def cargarRegistrarse(request):
    return render(request, "registro.html")


def cargarTienda(request):
    productos = Producto.objects.all()
    categoria_perros = Producto.objects.filter(id_cat=1)
    categoria_gatos = Producto.objects.filter(id_cat=2)
    return render(request, "tienda.html", {"prod": productos, "cate_gatos": categoria_gatos, "cate_perros": categoria_perros})


def carrito(request):
    # PRINT("CARRITO",request.body)
    productos = json.loads(request.body)

    for p in productos:
        print("SKU", p['sku'])
        print("CANTIDAD", p['cantidad'])

    return HttpResponse("Ok!")
