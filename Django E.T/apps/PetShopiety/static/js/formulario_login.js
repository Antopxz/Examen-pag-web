//FORMULARIO LOGIN
$('#formulario_login').validate({
    rules: {
        username: {
            required: true,
            maxlength: 30
        },
        password: {
            required: true,
            minlength: 3
        }
    },
    messages: {
        username: {
            required: "Este campo es obligatorio",
            maxlength: "Usuario muy largo"
        },
        password: {
            required: "Este campo es obligatorio",
            minlength: "Contraseña muy corta"
        }
    },
})
$("#login").click(function () {
    if ($('#formulario_login').valid() == false) {
        return;
    }
    var userInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var username = userInput.value;
    var password = passwordInput.value;
    iniciarSesion(username, password);
})
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
        var alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = ''
        var alertHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Ingrese un usario valido.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        alertContainer.innerHTML = alertHTML;
        return;
    }

});

function validarUsuario(username, longitudMinima) {
    return username.length >= longitudMinima;
}

function validarLongitudContraseña(contraseña, longitudMinima) {
    return contraseña.length >= longitudMinima;
}






