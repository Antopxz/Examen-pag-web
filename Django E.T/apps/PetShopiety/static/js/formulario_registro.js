//Formulario REGISTER
var formularioCrearUsuario = document.getElementById("formulario-register");

formularioCrearUsuario.addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var contacto = document.getElementById("contacto").value;

    crearUsuario(username, password, nombre, email, contacto);
});



$('#formulario-register').validate({
    rules: {
        nombre: {
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