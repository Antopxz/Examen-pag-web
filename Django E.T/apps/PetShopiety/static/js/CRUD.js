$(document).ready(function () {
    // Estructura de los productos en el carrito
    function construirProductoCarrito(producto) {
        var card = $('<div>').addClass('card');
        var img = $('<img>').addClass('card-img-top').attr('src', producto.img_url);
        var cardBody = $('<div>').addClass('card-body');
        var titulo = $('<h5>').addClass('card-title').text(producto.nombre);
        var precio = $('<p>').addClass('card-text').text(producto.precio + ' - CLP');
        var cantidad = $('<p>').addClass('card-text').text('Cantidad: ' + producto.cantidad);
        var botonAumentar = $('<button>').addClass('btn btn-primary btn-sm aumentar').text('+');
        var botonDisminuir = $('<button>').addClass('btn btn-danger btn-sm disminuir').text('-');
        var botonEliminar = $('<button>').addClass('btn btn-danger btn-sm eliminar').text('Eliminar');

        cardBody.append(titulo, precio, cantidad, botonAumentar, botonDisminuir, botonEliminar);
        card.append(img, cardBody);

        return card;
    }

    // Cargar productos del carrito desde el almacenamiento local
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

        // Actualizar el precio total del carrito
        actualizarPrecioTotal();
    }

    // Guardar productos del carrito en el almacenamiento local
    function guardarProductosCarrito() {
        var productosCarrito = [];

        $('.producto-carrito').each(function () {
            var sku = $(this).data('id');
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

    // Captura el evento de clic en los botones "Adquirir"
    $(document).on('click', '.comprar', function () {
        var sku = $(this).data('id');

        // Realiza la petición AJAX para obtener el producto
        $.ajax({
            url: '/tienda/' + sku,
            type: 'GET',
            success: function (data) {
                // Verifica si el producto ya está en el carrito
                var productoExistente = $('.producto-carrito[data-id="' + data.sku + '"]');
                if (productoExistente.length > 0) {
                    // Actualiza la cantidad del producto en el carrito
                    var cantidadExistente = parseInt(productoExistente.data('cantidad'));
                    var nuevaCantidad = cantidadExistente + 1;
                    productoExistente.find('.card-text:last').text('Cantidad: ' + nuevaCantidad);
                    productoExistente.data('cantidad', nuevaCantidad);
                } else {
                    // Agrega el producto al carrito
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
                // Actualiza el precio total del carrito
                actualizarPrecioTotal();

                // Guarda los productos del carrito en el almacenamiento local
                guardarProductosCarrito();
            },
            error: function () {
                console.log('Error al obtener el producto');
            }
        });
    });

    // Aumentar cantidad
    $(document).on('click', '.aumentar', function () {
        var productoCard = $(this).closest('.producto-carrito');
        var cantidad = parseInt(productoCard.data('cantidad'));
        var nuevaCantidad = cantidad + 1;
        productoCard.find('.card-text:last').text('Cantidad: ' + nuevaCantidad);
        productoCard.data('cantidad', nuevaCantidad);
        // Actualiza el precio total del carrito
        actualizarPrecioTotal();

        // Guarda los productos del carrito en el almacenamiento local
        guardarProductosCarrito();
    });

    // Disminuir cantidad
    $(document).on('click', '.disminuir', function () {
        var productoCard = $(this).closest('.producto-carrito');
        var cantidad = parseInt(productoCard.data('cantidad'));
        var nuevaCantidad = cantidad - 1;
        if (nuevaCantidad < 1) {
            nuevaCantidad = 1;
        }
        productoCard.find('.card-text:last').text('Cantidad: ' + nuevaCantidad);
        productoCard.data('cantidad', nuevaCantidad);
        // Actualiza el precio total del carrito
        actualizarPrecioTotal();

        // Guarda los productos del carrito en el almacenamiento local
        guardarProductosCarrito();
    });

    // Eliminar producto
    $(document).on('click', '.eliminar', function () {
        var cardProducto = $(this).closest('.producto-carrito');
        var sku = cardProducto.data('id');

        // Elimina la card del producto del carrito
        cardProducto.remove();

        // Actualiza el precio total del carrito
        actualizarPrecioTotal();

        // Guarda los productos del carrito en el almacenamiento local
        guardarProductosCarrito();
    });

    // Actualizar precio total del carrito
    function actualizarPrecioTotal() {
        var precioTotal = 0;

        $('.producto-carrito').each(function () {
            var precioProducto = parseFloat($(this).find('.card-text:nth-child(2)').text().split(' ')[0]);
            var cantidadProducto = parseInt($(this).data('cantidad'));
            precioTotal += precioProducto * cantidadProducto;
        });

        $('#precio-total').text('Total: ' + precioTotal.toFixed(2) + ' - CLP');
    }

    // Cargar productos del carrito al iniciar la página
    cargarProductosCarrito();
});
