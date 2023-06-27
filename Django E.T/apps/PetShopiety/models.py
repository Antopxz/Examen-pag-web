from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext as _


class Usuario(AbstractUser):
    es_administrador = models.BooleanField(default=False)
    es_cliente = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=128)
    # Añade related_name en los campos groups y user_permissions
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name='usuarios'  # Cambia 'usuarios' por el nombre que prefieras
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='usuarios'  # Cambia 'usuarios' por el nombre que prefieras
    )

    def __str__(self):
        return self.username


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
