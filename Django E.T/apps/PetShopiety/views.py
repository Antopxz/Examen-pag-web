from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from .models import *
import os
from django.conf import settings
from django.http import HttpResponse
import json
from django.http import JsonResponse
import datetime
from django.contrib.auth import authenticate, login, logout

# Create your views here.


def cargarInicio(request):
    if request.user.is_authenticated:
        comprador = request.user.comprador
        orden, created = Orden.objects.get_or_create(
            comprador=comprador, completado=False)
        items = orden.itemsorden_set.all()
        cartItems = orden.obtener_total_items
    else:
        items = []
        orden = {"obtener_total_carrito": 0,
                 "obtener_total_items": 0, 'shipping': False}
        cartItems = orden['obtener_total_items']
    return render(request, "index.html", {"items": items, "orden": orden, 'cartItems': cartItems})


def cargarTienda(request):
    if request.user.is_authenticated:
        comprador = request.user.comprador
        orden, created = Orden.objects.get_or_create(
            comprador=comprador, completado=False)
        items = orden.itemsorden_set.all()
        cartItems = orden.obtener_total_items
    else:
        items = []
        orden = {"obtener_total_carrito": 0,
                 "obtener_total_items": 0, 'shipping': False}
        cartItems = orden['obtener_total_items']

    productos = Producto.objects.all()
    categoria_perros = Producto.objects.filter(id_cat=1)
    categoria_gatos = Producto.objects.filter(id_cat=2)
    return render(request, "tienda.html", {"prod": productos, "cate_gatos": categoria_gatos, "cate_perros": categoria_perros, 'cartItems': cartItems, 'items': items})


def cargarCarrito(request):
    if request.user.is_authenticated:
        comprador = request.user.comprador
        orden, created = Orden.objects.get_or_create(
            comprador=comprador, completado=False)
        items = orden.itemsorden_set.all()
        cartItems = orden.obtener_total_items
    else:
        items = []
        orden = {"obtener_total_carrito": 0,
                 "obtener_total_items": 0, 'shipping': False}
        cartItems = orden['obtener_total_items']

    return render(request, "carrito.html", {"items": items, "orden": orden, 'cartItems': cartItems})


def agregarAlCarrito(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']

    print('Action:', action)
    print('ProducID:', productId)
    # Empezamos a crear la orden para que se guarde
    comprador = request.user.comprador
    producto = Producto.objects.get(sku=productId)
    orden, created = Orden.objects.get_or_create(
        comprador=comprador, completado=False)

    itemsOrden, created = ItemsOrden.objects.get_or_create(
        orden=orden, producto=producto)

    if action == 'add':
        itemsOrden.cantidad = (itemsOrden.cantidad + 1)
    elif action == 'remove':
        itemsOrden.cantidad = (itemsOrden.cantidad - 1)

    itemsOrden.save()

    if itemsOrden.cantidad <= 0:
        itemsOrden.delete()
    return JsonResponse('Producto agregado', safe=False)


@csrf_exempt
def cargarCheckOut(request):
    if request.user.is_authenticated:
        comprador = request.user.comprador
        orden, created = Orden.objects.get_or_create(
            comprador=comprador, completado=False)
        items = orden.itemsorden_set.all()
        cartItems = orden.obtener_total_items

    else:
        items = []
        orden = {"obtener_total_carrito": 0,
                 "obtener_total_items": 0, 'shipping': False}
        cartItems = orden['obtener_total_items']

    return render(request, "checkout.html", {"items": items, "orden": orden, 'cartItems:': cartItems})


@csrf_exempt
def procesarOrden(request):
    transaction_id = datetime.datetime.now().timestamp()
    data = json.loads(request.body)

    if request.user.is_authenticated:
        comprador = request.user.comprador
        orden, created = Orden.objects.get_or_create(
            comprador=comprador, completado=False)
        total = float(data['form']['total'])
        orden.id_transaccion = transaction_id

        if total == float(orden.obtener_total_carrito):
            orden.completado = True
            orden.save()

            # Actualizar stock
            items_orden = orden.itemsorden_set.all()
            for item in items_orden:
                producto = item.producto
                cantidad_comprada = item.cantidad
                producto.stock -= cantidad_comprada
                print(producto, cantidad_comprada, producto.stock)
                producto.save()

        if orden.shipping == True:
            DireccionEnvio.objects.create(
                comprador=comprador,
                orden=orden,
                direccion=data['shipping']['direccion'],
                ciudad=data['shipping']['ciudad'],
                region=data['shipping']['region'],
                codigoPostal=data['shipping']['codigoPostal']
            )
    else:
        print('Usuario no logeado :s')
    return JsonResponse('Pago completado', safe=False)


def cargarRegistrarse(request):
    return render(request, "registro.html")


def cargarIniciarSesion(request):
    return render(request, "iniciarSesion.html")


@csrf_exempt
def logearse(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            # Obtén el comprador asociado al usuario
            comprador = Comprador.objects.get(usuario=user)
            # Realiza acciones adicionales después del inicio de sesión exitoso

            return JsonResponse({'message': 'Inicio de sesión exitoso', 'comprador_id': comprador.id})
        else:
            return JsonResponse({'message': 'Credenciales inválidas'}, status=400)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)


@csrf_exempt
def crear_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        nombre = data['nombre']
        email = data['email']
        contacto = data['contacto']

        # Verificar si el usuario ya existe
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'El usuario ya existe'}, status=400)

        # Crear el usuario
        user = User.objects.create_user(username=username, password=password)

        # Crear el comprador asociado al usuario
        comprador = Comprador.objects.create(
            usuario=user, nombre=nombre, email=email, contacto=contacto)

        # Realiza acciones adicionales después de la creación exitosa del usuario
        return JsonResponse({'message': 'Usuario creado exitosamente'})

    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)


def cerrar_sesion(request):
    logout(request)
    return (redirect('/index'))


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


def obtenerProductoId(request, sku):
    producto = Producto.objects.get(sku=sku)
    data = {
        'sku': producto.sku,
        'nombre': producto.nombre,
        'stock': producto.stock,
        'precio': producto.precio,
        'descripcion': producto.descripcion,
        'id_cat': producto.id_cat.id_categoria,
        'img_url': producto.img_url.url,
    }
    return JsonResponse(data)


def carrito(request):
    # print("CARRITO",request.body)
    productos = json.loads(request.body)

    for p in productos:
        print("SKU", p['sku'])
        print("CANTIDAD", p['stock'])

    return HttpResponse("Ok!")
