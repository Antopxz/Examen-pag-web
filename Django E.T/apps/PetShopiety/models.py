from django.db import models
from django.contrib.auth.models import User, AbstractUser, Group, Permission
from django.utils.translation import gettext as _


class Categoria(models.Model):
    id_categoria = models.IntegerField(primary_key=True)
    nombre_categoria = models.CharField(max_length=100)

    def __str__(self):
        txt = "Nombre: {0} - Id: {1}"
        return txt.format(self.nombre_categoria, self.id_categoria)


class Producto(models.Model):
    sku = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)
    stock = models.IntegerField()
    precio = models.IntegerField()
    descripcion = models.CharField(max_length=200)
    id_cat = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    img_url = models.ImageField(upload_to='imagenesProducto')

    def __str__(self):
        txt = "SKU: {0} - Stock: {1} - Nombre: {2}"
        return txt.format(self.sku, self.stock, self.nombre)

    @property  # ESTO ES PARA HACER EN CASO DE QUE NO HAYA IMAGEN DE PRODUCTO
    def imageURL(self):
        try:
            url = self.img_url.url
        except:
            url = ''
        return url


class Comprador(models.Model):
    usuario = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    contacto = models.IntegerField()

    def __str__(self):
        txt = "Usuario: {0} - Nombre : {1} Email: {2}"
        return txt.format(self.usuario, self.nombre, self.email)


class Orden(models.Model):
    comprador = models.ForeignKey(
        Comprador, on_delete=models.SET_NULL, blank=True, null=True)
    # Se hace la orden al moemnto de crearse
    fecha_orden = models.DateTimeField(auto_now_add=True)
    completado = models.BooleanField(max_length=200, null=True)
    id_transaccion = models.CharField(max_length=200, null=True)

    def __str__(self):
        txt = "Comprador: {0} - Fecha de orden: {1} - Completado: {2}"
        return txt.format(self.comprador, self.fecha_orden, self.completado)

    def obtener_total_carrito(self):
        itemsorden = self.itemsorden_set.all()
        total = sum([item.obtener_total for item in itemsorden])
        return total

    def obtener_total_items(self):
        itemsorden = self.itemsorden_set.all()
        total = sum([item.cantidad for item in itemsorden])
        return total


class ItemsOrden(models.Model):
    producto = models.ForeignKey(
        Producto, on_delete=models.SET_NULL, blank=True, null=True)
    orden = models.ForeignKey(
        Orden, on_delete=models.SET_NULL, blank=True, null=True)
    cantidad = models.IntegerField(default=0, null=True, blank=True)
    fecha_agregada = models.DateTimeField(auto_now=True)

    def __str__(self):
        txt = "productos: {0} -  Orden: {1} - Cantidad: {2}"
        return txt.format(self.producto, self.orden, self.cantidad)

    @property
    def obtener_total(self):
        total = self.producto.precio * self.cantidad
        return total


class DireccionEnvio(models.Model):
    comprador = models.ForeignKey(
        Comprador, on_delete=models.SET_NULL, blank=True, null=True)
    orden = models.ForeignKey(
        Orden, on_delete=models.SET_NULL, blank=True, null=True)
    direccion = models.CharField(max_length=200, null=True)
    ciudad = models.CharField(max_length=200, null=True)
    region = models.CharField(max_length=200, null=True)
    codigoPostal = models.CharField(max_length=200, null=True)
    fecha_agregada = models.DateTimeField(auto_now=True)

    def __str__(self):
        txt = "Comprador: {0} -  Orden: {1} - Direccion: {2}"
        return txt.format(self.comprador, self.orden, self.direccion)
