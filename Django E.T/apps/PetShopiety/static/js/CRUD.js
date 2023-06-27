$(document).ready(function () {
    // estructura 
    function construirProductoCarrito(producto) {
        var card = $('<div>').addClass('card');
        var img = $('<img>').addClass('card-img-top').attr('src', producto.img_url);
        var cardBody = $('<div>').addClass('card-body');
        var titulo = $('<h5>').addClass('card-title').text(producto.nombre);
        var precio = $('<p>').addClass('card-text').text(producto.precio + ' - CLP');
        var cantidad = $('<p>').addClass('card-text').text('Cantidad: ' + producto.cantidad);
        var botonAumentar = $('<button>').addClass('btn btn-primary btn-sm aumentar').text('+');
        var botonDisminuir = $('<button>').addClass('btn btn-danger btn-sm disminuir').text('-');
        var botonEliminar = $('<button>').addClass('btn btn-danger btn-sm eliminar position-absolute top-0 end-0').text('Eliminar');

        cardBody.append(titulo, precio, cantidad, botonAumentar, botonDisminuir, botonEliminar);
        card.append(img, cardBody);

        return card;
    }

    //cargar productos del carrito desde ls
    function cargarProductosCarrito() {
        var productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        for (var i = 0; i < productosCarrito.length; i++) {
            var productoCarrito = productosCarrito[i];
            var productoCard = construirProductoCarrito(productoCarrito);
            productoCard.addClass('producto-carrito').attr('data-id', productoCarrito.sku).data('cantidad', productoCarrito.cantidad);
            var columna = $('<div>').addClass('col');
            columna.append(productoCard);
            $('#carrito-lista').append(columna);
        }

        actualizarPrecioTotal();
    }

    // guardar productos del carrito en el ls
    function guardarProductosCarrito() {
        var productosCarrito = [];

        $('.producto-carrito').each(function () {
            var sku = parseInt($(this).data('id'));
            var nombre = $(this).find('.card-title').text();
            var img_url = $(this).find('.card-img-top').attr('src');
            var precio = parseFloat($(this).find('.card-text:nth-child(2)').text().split(' ')[0]);
            var cantidad = parseInt($(this).data('cantidad'));

            var productoCarrito = {
                sku: sku,
                nombre: nombre,
                img_url: img_url,
                precio: precio,
                cantidad: cantidad
            };

            productosCarrito.push(productoCarrito);
        });

        localStorage.setItem('carrito', JSON.stringify(productosCarrito));
    }

    // Captura "Adquirir"
    $(document).on('click', '.comprar', function () {
        var sku = $(this).data('id');

        // AJAX para obtener producto
        $.ajax({
            url: '/tienda/' + sku,
            type: 'GET',
            success: function (data) {
                // si el producto ya está en el carrito
                var productoExistente = $('.producto-carrito[data-id="' + data.sku + '"]');
                if (productoExistente.length > 0) {
                    // actualiza cantidad 
                    var cantidadExistente = parseInt(productoExistente.data('cantidad'));
                    var nuevaCantidad = cantidadExistente + 1;
                    productoExistente.find('.card-text:last').text('Cantidad: ' + nuevaCantidad);
                    productoExistente.data('cantidad', nuevaCantidad);
                } else {
                    // agregar producto 
                    var productoCarrito = {
                        sku: data.sku,
                        nombre: data.nombre,
                        img_url: data.img_url,
                        precio: data.precio,
                        cantidad: 1
                    };
                    var productoCard = construirProductoCarrito(productoCarrito);
                    productoCard.addClass('producto-carrito').attr('data-id', productoCarrito.sku).data('cantidad', productoCarrito.cantidad);
                    var columna = $('<div>').addClass('col');
                    columna.append(productoCard);
                    $('#carrito-lista').append(columna);
                }
                actualizarPrecioTotal();
                guardarProductosCarrito();
            },
            error: function () {
                console.log('Error al obtener el producto');
            }
        });
    });

    // sumar
    $(document).on('click', '.aumentar', function () {
        var productoCard = $(this).closest('.producto-carrito');
        var cantidad = parseInt(productoCard.data('cantidad'));
        var nuevaCantidad = cantidad + 1;
        productoCard.find('.card-text:last').text('Cantidad: ' + nuevaCantidad);
        productoCard.data('cantidad', nuevaCantidad);

        actualizarPrecioTotal();
        guardarProductosCarrito();
    });

    // restar
    $(document).on('click', '.disminuir', function () {
        var productoCard = $(this).closest('.producto-carrito');
        var cantidad = parseInt(productoCard.data('cantidad'));
        var nuevaCantidad = cantidad - 1;
        if (nuevaCantidad < 1) {
            nuevaCantidad = 1;
        }
        productoCard.find('.card-text:last').text('Cantidad: ' + nuevaCantidad);
        productoCard.data('cantidad', nuevaCantidad);


        actualizarPrecioTotal();
        guardarProductosCarrito();
    });

    // funcion eliminar producto
    $(document).on('click', '.eliminar', function () {
        var cardProducto = $(this).closest('.producto-carrito');
        var sku = cardProducto.data('id');

        // eliminar
        cardProducto.remove();

        // actualiza y guarda 
        actualizarPrecioTotal();
        guardarProductosCarrito();
    });

    function actualizarPrecioTotal() {
        var precioTotal = 0;

        $('.producto-carrito').each(function () {
            var precioProducto = parseFloat($(this).find('.card-text:nth-child(2)').text().split(' ')[0]);
            var cantidadProducto = parseInt($(this).data('cantidad'));
            precioTotal += precioProducto * cantidadProducto;
        });

        $('#precio-total').text('Total: ' + precioTotal.toFixed(2) + ' - CLP');
    }

    cargarProductosCarrito();
});

// COMPRA DE PRODUCTOS PORFAVOR HAZLOOO 

// sacar los productos y asi modificarlos con la vista hecha de api
var productosCarrito = [];

let btnCarrito = document.getElementById("btn-comprar");

btnCarrito.addEventListener('click', function () {
    $('.producto-carrito').each(function () {
        var sku = parseInt($(this).data('id'));
        var cantidad = parseInt($(this).data('cantidad'));
        productosCarrito.push({ sku: sku, cantidad: cantidad });
    });

    var data = { data: JSON.stringify(productosCarrito) };

    let token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    console.log("111111111111111", token);


    fetch('/api/actualizar_stock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            // Procesa la respuesta
            if (data.compra_valida) {
                //prueba que datos pasan
                console.log(productosCarrito)
            } else {
            }
        })
        .catch(error => {
            console.log('Error al actualizar el stock:', error);
        });
})