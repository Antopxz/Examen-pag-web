const contenidoCarrito = document.getElementById("contenido-carrito");
//SE HACE UN GET DEL BODY DE EL OFFCANVAS
const carritoBody = document.getElementById("carrito-body");
//BOTON VER CARRITO, GET ELEMENT (BOTON)
const verCarrito = document.getElementById("carrito");
//CERRAR CARRITO GET
const cerrarCarrito = document.getElementById("cerrar-carrito");
//Cantidad carrito
const cantidadCarrito = document.getElementById("cantidad-carrito");
// Código JavaScript para agregar productos al carrito
//let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// comprar.addEventListener("click", () => {

//     const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

//     if (repeat) {
//         carrito.map((prod) => {
//             if (prod.id === product.id) {
//                 prod.cantidad++;
//             }
//         });
//     } else {
//         carrito.push({
//             id: product.id,
//             imgURL: product.imgURL,
//             descripcion: product.descripcion,
//             precio: product.precio,
//             cantidad: product.cantidad
//         });
//         carritoCounter();
//         saveLocal();
//     }
// });

//})

//LOCAL STORAGE SET 
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
// LOCAL GET ITEM 

const getItem = () => {
};
// Variables globales
var carritoProductos = [];


function agregarProductoAlCarrito(id) {
    var producto = obtenerProductoPorId(id);

    agregarAlLocalStorage(producto);
    mostrarCarrito();

}
function obtenerProductoPorId(id) {
    //logica para obtenerproducto (fetch? o solo una funcion view)

}

function actualizarCantidadCarrito() {
    var cantidad = carritoProductos.length;
    var cantidadCarritoElement = document.getElementById("cantidad-carrito");
    cantidadCarritoElement.textContent = cantidad;
}
// // Función para agregar un producto al carrito
// const agregarAlCarrito = (idProducto) => {
//     // Buscar el producto en la lista de productos disponibles
//     const producto = Productos.find((p) => p.id === idProducto);

//     // Verificar si el producto ya está en el carrito
//     const productoEnCarrito = carrito.find((p) => p.id === idProducto);

//     if (productoEnCarrito) {
//         // Si el producto ya está en el carrito, incrementar su cantidad
//         productoEnCarrito.cantidad++;
//     } else {
//         // Si el producto no está en el carrito, agregarlo
//         carrito.push({
//             id: producto.id,
//             nombre: producto.nombre,
//             descripcion: producto.descripcion,
//             precio: producto.precio,
//             cantidad: 1
//         });
//     }

//     // Guardar el carrito en el almacenamiento local
//     guardarCarrito();

//     // Actualizar la visualización del carrito
//     pintarCarrito();
// };

// // Función para guardar el carrito en el almacenamiento local
// const guardarCarrito = () => {
//     localStorage.setItem('carrito', JSON.stringify(carrito));
// };

// // Función para cargar el carrito desde el almacenamiento local
// const cargarCarrito = () => {
//     const carritoGuardado = localStorage.getItem('carrito');
//     if (carritoGuardado) {
//         carrito = JSON.parse(carritoGuardado);
//     }
// };

// // Función para pintar el carrito en la página
// const pintarCarrito = () => {
//     const carritoBody = document.getElementById('carrito-body');
//     carritoBody.innerHTML = '';

//     carrito.forEach((producto) => {
//         const carritoContent = document.createElement('container');
//         carritoContent.className = 'd-flex text-center';
//         carritoContent.innerHTML = `
//     <div class="col-9 card border-2 bg-light mb-2">
//         <div class="card-body">
//             <img src="${producto.imgURL}" class="img-fluid product-img" alt="">
//         </div>
//         <h6>${producto.descripcion}</h6>
//         <p>$ ${producto.precio} - CLP</p>
//         <span class="sumar btn align-self-center"> + </span>
//         <p>Cantidad: ${producto.cantidad}</p>
//         <span class="restar btn align-self-center"> - </span>
//         <p>Total: $ ${producto.cantidad * producto.precio} CLP</p>
//     </div>
//     <div class="col-4">
//         <button class="eliminar btn btn-danger bg-danger">❌</button>
//     </div>
//     `;
//         carritoBody.append(carritoContent);

//         // Event listener para el botón de sumar
//         const sumar = carritoContent.querySelector('.sumar');
//         sumar.addEventListener('click', () => {
//             producto.cantidad++;
//             guardarCarrito();
//             pintarCarrito();
//         });

//         // Event listener para el botón de restar
//         const restar = carritoContent.querySelector('.restar');
//         restar.addEventListener('click', () => {
//             if (producto.cantidad !== 1) {
//                 producto.cantidad--;
//                 guardarCarrito();
//                 pintarCarrito();
//             }
//         });

//         // Event listener para el botón de eliminar
//         const eliminar = carritoContent.querySelector('.eliminar');
//         eliminar.addEventListener('click', () => {
//             eliminarProducto(producto.id);
//         });
//     });

//     const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

//     const totalCompra = document.createElement('div');
//     totalCompra.className = 'total-content fw-bold';
//     totalCompra.innerHTML = `Total a pagar: ${total} CLP`;
//     carritoBody.append(totalCompra);
// };

// // Función para eliminar un producto del carrito
// const eliminarProducto = (idProducto) => {
//     carrito = carrito.filter((producto) => producto.id !== idProducto);
//     guardarCarrito();
//     pintarCarrito();
// };

// // Cargar el carrito al cargar la página
// cargarCarrito();

// // Event listener para los botones "Adquirir"
// const botonesAdquirir = document.querySelectorAll('.comprar');
// botonesAdquirir.forEach((boton) => {
//     boton.addEventListener('click', (event) => {
//         const idProducto = event.target.dataset.id;
//         agregarAlCarrito(idProducto);
//     });
// });

// // Pintar el carrito al cargar la página
// pintarCarrito();

// //MANEJAR PRODUCTOS esta mas arriba con las cantidades- hecho en crud y aqui
// const carritoCounter = () => {
//     cantidadCarrito.style.display = "block";

//     const carritoLength = carrito.length;

//     localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

//     cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
// }
// //CONTADOR EN NAVBAR
// carritoCounter();
