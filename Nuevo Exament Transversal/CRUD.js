//CREACION ARRAY PRODUCTOS PARA CARRITO O ADMIN PRODUCTOS, AHI VEO QUE SALE
const contenidoCarrito= document.getElementById("contenido-carrito");
//SE HACE UN GET DEL BODY DE EL OFFCANVAS
const carritoBody = document.getElementById("carrito-body");
//BOTON VER CARRITO, GET ELEMENT (BOTON)
const verCarrito = document.getElementById("carrito");
//CERRAR CARRITO GET
const cerrarCarrito= document.getElementById("cerrar-carrito");

let carrito = [];

productos.forEach((product)=>{
    let content = document.createElement("div")
    content.classList.add('col-lg-3', 'text-center')
    content.innerHTML = `
            <div class="card border-0 bg-light mb-2">
                <div class="card-body">
                <img src="${product.imgURL}" class="img-fluid product-img" alt="">
                </div>
                <h6>${product.descripcion}</h6>
                <p>$ ${product.precio} - CLP</p>
            </div>
    `;
    contenidoCarrito.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Adquirir";
    comprar.className = "btn comprar";

    content.append(comprar);

    comprar.addEventListener("click",()=> {
        carrito.push({
            id : product.id,
            imgURL : product.imgURL,
            descripcion : product.descripcion,
            precio : product.precio
        });
    });
    
})

//VER EL CARRITO CON LOS PRODUCTOS ELEGIDOS EN LA TIENDA
verCarrito.addEventListener("click",()=>{
    
    carritoBody.innerHTML ="";

    //SE HACE UN LOOP DE LOS PRODUCTOS QUE ESTAN EN EL ARRAY! Y asi se crean los div en el offcanva
    carrito.forEach((product) =>{
        let carritoContent = document.createElement("div")
        carritoContent.className="col-9 d-flex"
        carritoContent.innerHTML = `
        <div class="card border-0 bg-light mb-2">
            <div class="card-body">
                <img src= "${product.imgURL}" class="img-fluid product-img" alt="">
            </div>
                <h6>${product.descripcion}</h6>
                <p>$ ${product.precio} - CLP</p>
        </div>
        `;
        carritoBody.append(carritoContent);
    })

    const total= carrito.reduce((acc, element) => acc+ element.precio,0);

    const totalCompra= document.createElement("div")
    totalCompra.className= "total-content fw-bold"
    totalCompra.innerHTML= `Total a pagar: ${total} CLP`;
    carritoBody.append(totalCompra);
});

//  CERRAR CARRITO Y BORRAR



//CLASES PRODUCTO PARA ADMIN
class Product {
    constructor(id,imgURL,descripcion,cantidad, precio) {
        this.id = 0;
        this.imgURL = imgURL;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

class UI {
    addProduct(product) {
        const listaProducto = document.getElementById('lista-productos');
        const element = document.createElement('tr');
        product.id++;
        element.innerHTML = `<tr> 
                                <th scope="row"> 
                                <button class="btn btn-editar " data-bs-toggle="modal" data-bs-target="#modal-editar"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" 
                                viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/> 
                                </svg>
                                </button>
                                </th>
                                <td>
                                <button class="btn btn-eliminar" style="background-color: red;" name="delete"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                </svg>
                                </button>
                                </td>
                                <td>
                                ${product.id}
                                </td>
                                <td>
                                <img src=" ${product.imgURL} " class="img-fluid w-25 h-25" alt="...">
                                </td>
                                <td>
                                ${product.descripcion}
                                </td>
                                <td>
                                ${product.cantidad}
                                </td>
                                <td>
                                ${product.precio}
                                </td>
                            </tr>`;
            listaProducto.appendChild(element);
   
        
    }

    resetForm(){
        document.getElementById('agregar-producto').reset();
    }

    editProduct() {

    }
    deleteProduct(element) {
        if(element.name === 'delete'){
            element.parentElement.parentElement.remove()
        }
        
    }

    showMessagge() {

    }
}

//DOM Eventos
document.getElementById('agregar-producto').addEventListener('submit', function(e){
    const imgURL = document.getElementById('inputURL').value
    const descripcion = document.getElementById('inputDescripcion').value
    const cantidad = document.getElementById('inputNumber').value
    const precio = document.getElementById('inputPrecio').value
    
    const product = new Product(imgURL,descripcion,cantidad,precio);

    const ui = new UI();
    ui.addProduct(product);
    e.preventDefault();
    ui.resetForm();    
})

document.getElementById('lista-productos').addEventListener('click', function(e){
    const ui= new UI();
    ui.deleteProduct(e.target);  
})