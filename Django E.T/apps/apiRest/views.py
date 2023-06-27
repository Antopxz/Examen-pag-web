import logging
from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from apps.PetShopiety.models import Producto
import json
from django.views.decorators.csrf import csrf_exempt


# Create your views here.


class ObtenerProductos(View):
    def get(self, request):
        productos = Producto.objects.all()
        return JsonResponse(list(productos.values()), safe=False)


class ActualizarStock(View):
    @csrf_exempt
    def post(self, request):
        if request.method == 'POST':
            # Obtén los datos de los productos y actualiza el stock
            data = json.loads(request.body)
            # Asegúrate de obtener la lista de productos correctamente
            productos_carrito = data.get('data')
            print(productos_carrito)
        if isinstance(productos_carrito, list):
            for producto_carrito in productos_carrito:
                if isinstance(producto_carrito, dict) and 'sku' in producto_carrito:
                    sku = producto_carrito['sku']
                    cantidad_comprada = producto_carrito.get('cantidad')

                    try:
                        # Busca el producto en la base de datos
                        producto = Producto.objects.get(sku=sku)
                    except Producto.DoesNotExist:
                        return JsonResponse({'error': f'Producto con SKU {sku} no encontrado'}, status=404)

                    # Verifica si hay suficiente stock disponible
                    if producto.stock >= cantidad_comprada:
                        # Actualiza el stock
                        producto.stock -= cantidad_comprada
                        producto.save()

                    else:
                        return JsonResponse({'error': f'No hay suficiente stock para el producto con SKU {sku}'}, status=400)

            # Realiza la lógica para verificar la validez de la compra

            # Devuelve una respuesta en formato JSON indicando si la compra fue válida o no
            # Ajusta esto según tu lógica específica
            response = {'compra_valida': True}

            return JsonResponse(response)

        else:
            # Si se recibe una solicitud GET, puedes manejarla aquí según sea necesario
            # Por ejemplo, si deseas obtener información adicional sobre el recurso /api/actualizar_stock, puedes manejarlo aquí
            return JsonResponse({'message': 'GET request received'})
