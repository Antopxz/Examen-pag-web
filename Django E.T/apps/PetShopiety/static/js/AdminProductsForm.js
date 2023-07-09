function validateFormProducts() {
    var imgURL = document.getElementById("inputURL").value;
    var product = document.getElementById("inputProduct").value;
    var cantidad = document.getElementById("inputCantidad").value;
    var precio = document.getElementById("inputPrecio").value;

    if (imgURL == "") {
        alert("Este campo es requerido");
        return false;
    };
    if (product == "") {
        alert("Este campo es requerido");
        return false;
    };
    if (cantidad == "") {
        alert("Este campo es requerido");
        return false;
    } else if (cantidad < 1) {
        alert("La cantidad de productos no puede ser menor a 1");
    };
    if (precio == "") {
        alert("Este campo es requerido");
        return false;
    } else if (precio < 1) {
        alert("El precio de un producto no puede ser negativo");
        return false;
    }

    return true;
}

