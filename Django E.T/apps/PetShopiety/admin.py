from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Categoria)
admin.site.register(Producto)
admin.site.register(Comprador)
admin.site.register(Orden)
admin.site.register(ItemsOrden)
admin.site.register(DireccionEnvio)
