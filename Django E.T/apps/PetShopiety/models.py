from django.db import models

# Create your models here.


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
