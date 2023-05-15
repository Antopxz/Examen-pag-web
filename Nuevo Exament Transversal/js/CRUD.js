//CREACION ARRAY PRODUCTOS PARA CARRITO O ADMIN PRODUCTOS, AHI VEO QUE SALE
const contenidoCarrito= document.getElementById("contenido-carrito");
//SE HACE UN GET DEL BODY DE EL OFFCANVAS
const carritoBody = document.getElementById("carrito-body");
//BOTON VER CARRITO, GET ELEMENT (BOTON)
const verCarrito = document.getElementById("carrito");
//CERRAR CARRITO GET
const cerrarCarrito= document.getElementById("cerrar-carrito");
//Cantidad carrito
const cantidadCarrito= document.getElementById("cantidad-carrito");


//CREACION PRODUCTOS SEGUN ARRAY
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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

        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

        if(repeat){
            carrito.map((prod)=>{
                if(prod.id === product.id){
                    prod.cantidad++;
                }
            }); 
        }else{
            carrito.push({
                id : product.id,
                imgURL : product.imgURL,
                descripcion : product.descripcion,
                precio : product.precio,
                cantidad : product.cantidad
            });
            carritoCounter();
            saveLocal();
        }
    });
    
})

//LOCAL STORAGE SET 
const saveLocal = () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
// LOCAL GET ITEM 

const getItem = () => {
};


//----------------------------------------------------------------------------------------------------------------
