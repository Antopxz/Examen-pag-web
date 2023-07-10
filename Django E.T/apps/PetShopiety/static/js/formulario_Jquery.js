//FORMULARIO LOGIN

//Funcion cuando todo este ready se use los formularios
var formulario = document.getElementById("login")
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");

formulario.addEventListener("click", function (event) {
    event.preventDefault();

    if (!formulario.checkValidity()) {
        return;
    }
    var email = emailInput.value;
    var password = passwordInput.value;

    if (!validarEmail(email)) {
        alert("Ingrese un email válido");
        return;
    }

    if (!validarLongitudContraseña(password, 3)) {
        alert("La contraseña debe tener al menos 3 caracteres");
        return;
    }

    iniciarSesion(email, password);
});

function validarEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validarLongitudContraseña(contraseña, longitudMinima) {
    return contraseña.length >= longitudMinima;
}

function iniciarSesion(email, password) {
    // Lógica de inicio de sesión utilizando fetch o cualquier otra técnica
    console.log("Email: " + email);
    console.log("Contraseña: " + password);
}
// INICIAR SESION 




// $("#login").click(function () {
//     if ($('#formulario-login').valid() == false) {
//         return;
//     } else {
//         let email = $('#email').val()
//         let password = $('#password').val()
//         iniciarSesion(email, password)
//     }
// })
//Formulario REGISTER
$('#formulario-register').validate({
    rules: {
        name: {
            required: true,
            maxlength: 50
        },
        email: {
            required: true,
            email: true
        },
        number: {
            required: true,
            number: true,
            maxlength: 8,
            minlength: 8
        },
        password: {
            required: true,
            minlength: 3
        },
        repassword: {
            minlength: 3,
            equalTo: password
        }
    },
    messages: {
        name: {
            required: "Este campo es obligatorio",
            maxlength: "Nombre muy largo"
        },
        number: {
            required: "Este campo es obligatorio",
            number: "Ingrese un numero valido",
            maxlength: "Escriba un telefono de 8 numeros",
            minlength: "Escriba un telefono de 8 numeros"
        },
        email: {
            required: "Este campo es obligatorio",
            email: "Escriba un email valido",
        },
        password: {
            required: "Este campo es obligatorio",
            minlength: "Contraseña muy corta"
        },
        repassword: {
            minlength: "Contraseña muy corta",
            equalTo: "Las contraseñas tienen que ser iguales"
        }
    }
})

$("#register").click(function () {
    if ($('#formulario-register').valid() == false) {
        return;
    }
    let name = $('#name').val()
    let email = $('#email').val()
    let number = $('#number').val()
    let password = $('#password').val()
    let repassword = $('#repassword').val()

    //Construir JSON enviar por $.post
})






