function validateFormProducts(){
    var imgURL = document.getElementById("inputURL").value;
    var product = document.getElementById("inputProduct").value;
    var cantidad = document.getElementById("inputCantidad").value;
    var precio = document.getElementById("inputPrecio").value;

    if(imgURL ==""){
        alert("Este campo es requerido");
        return false;
    };
    if(product ==""){
        alert("Este campo es requerido");
        return false;
    };
    if(cantidad ==""){
        alert("Este campo es requerido");
        return false;
    }else if(cantidad<1){
        alert("La cantidad de productos no puede ser menor a 1");
    };
    if(precio ==""){
        alert("Este campo es requerido");
        return false;
    }else if(precio<1){
        alert("El precio de un producto no puede ser negativo");
        return false;
    }

    return true;
}

//MOSTRANDO LA DATA DE PRODUCTOS 
function showData() {
    var productList
    if(localStorage.getItem("producList") == null){
        productList = [];
    }
    else{
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    var html = "";

    productList.forEach(function(element,index){
        html += "<tr>";
        html += 
            '<td><button onclick="deleteData('+ index +
            ')" class="btn btn-danger bg-danger">Delete</button><button>onclick="updateData('+ index +')" class="btn btn-warning bg-warning m-2">Editar</button></td>'; 
        html +='<td> <img src="'+ element.imgURL +'" class="img-fluid w-25 h-25"> </td>'
        html +="<td>"+ element.product +"</td>"
        html +="<td>"+ element.cantidad  +"</td>"
        html +="<td>"+ element.precio + "</td>"
        html +="</tr>" 
    });

    document.querySelector("#lista-productos").innerHTML = html;
}
//Carga toda la data cuando la pagina carga 
document.onload = showData();

//Agregar productos

function AddData(){
    if(validateFormProducts()== true){
        var imgURL = document.getElementById("inputURL").value;
        var product = document.getElementById("inputProduct").value;
        var cantidad = document.getElementById("inputCantidad").value;
        var precio = document.getElementById("inputPrecio").value;  

    var productList;
    if(localStorage.getItem("producList") == null){
        productList = [];
    }
    else{
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    productList.push({
        imgURL : imgURL,
        product : product,
        cantidad : cantidad,
        precio : precio
    })

    localStorage.setItem("productList", JSON.stringify(productList));
    showData();
    document.getElementById("inputURL").value = "";
    document.getElementById("inputProduct").value = "";
    document.getElementById("inputCantidad").value = "";
    document.getElementById("inputPrecio").value = "";
  }
}

