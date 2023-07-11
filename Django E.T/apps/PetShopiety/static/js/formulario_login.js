//FORMULARIO LOGIN

//Funcion cuando todo este ready se use los formularios
var formulario = document.getElementById("formulario_login")
var userInput = document.getElementById("username");
var passwordInput = document.getElementById("password");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!formulario.checkValidity()) {
        return;
    }
    var username = userInput.value;
    var password = passwordInput.value;

    if (!validarUsuario(username, 5)) {
        alert("Ingrese un usuario valido");
        return;
    }

    if (!validarLongitudContraseña(password, 3)) {
        alert("La contraseña debe tener al menos 3 caracteres");
        return;
    }
    console.log(username, password)
    iniciarSesion(username, password);
});

function validarUsuario(username, longitudMinima) {
    return username.length >= longitudMinima;
}

function validarLongitudContraseña(contraseña, longitudMinima) {
    return contraseña.length >= longitudMinima;
}






