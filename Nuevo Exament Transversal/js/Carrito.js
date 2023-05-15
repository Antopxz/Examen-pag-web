//VER EL CARRITO CON LOS PRODUCTOS ELEGIDOS EN LA TIENDA
const pintarCarrito=() =>{    
    //LIMPIAR CARRO
    carritoBody.innerHTML ="";

    //SE HACE UN LOOP DE LOS PRODUCTOS QUE ESTAN EN EL ARRAY! Y asi se crean los div en el offcanva
    carrito.forEach((product) =>{

        let carritoContent = document.createElement("container")
        carritoContent.className="d-flex text-center "
        carritoContent.innerHTML = `
        <div class="col-9 card border-2 bg-light mb-2 ">
            <div class="card-body">
                <img src= "${product.imgURL}" class="img-fluid product-img" alt="">
            </div>
            <h6>${product.descripcion}</h6>
            <p>$ ${product.precio} - CLP</p>
            <span class="sumar btn align-self-center"> + </span>
            <p>Cantidad : ${product.cantidad}</p>
            <span class="restar btn align-self-center"> - </span>
            <p>Total : $ ${product.cantidad * product.precio} CLP</p>
        </div>
        <div class="col-4"><button class="eliminar btn btn-danger bg-danger">❌</button>
        </div>
        `;
        carritoBody.append(carritoContent);
//sumar producto, luego se guarda y volvemos a ver carrito        
        let sumar= carritoContent.querySelector(".sumar");

        sumar.addEventListener("click",()=> {
            
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });
//restar producto, luego lo guardas y volvemos a pintar carrito.
        let restar= carritoContent.querySelector(".restar");
        restar.addEventListener("click", () =>{
            if(product.cantidad !== 1 ){
            product.cantidad--;
            saveLocal();
            pintarCarrito();
            }
        });
//eliminar 
        let eliminar = carritoContent.querySelector(".eliminar");

        eliminar.addEventListener("click",()=>{
            eliminarProducto(product.id);
        })
    })

    const total= carrito.reduce((acc, element) => acc+ element.precio * element.cantidad,0);

    const totalCompra= document.createElement("div")
    totalCompra.className= "total-content fw-bold"
    totalCompra.innerHTML= `Total a pagar: ${total} CLP`;
    carritoBody.append(totalCompra);
}

verCarrito.addEventListener("click",pintarCarrito);

//ELIMINAR PRODUCTO

const eliminarProducto = (id) => {
    const foundId = carrito.find((element)=> element.id === id);
    carrito =carrito.filter((carritoId) => {
        return carritoId !== foundId;
    })
    carritoCounter();
    //se guarda la eliminacion
    saveLocal();
    pintarCarrito();

}
//MANEJAR PRODUCTOS esta mas arriba con las cantidades- hecho en crud y aqui
const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength" , JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}
//CONTADOR EN NAVBAR
    carritoCounter();
