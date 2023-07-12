$('#agregar-producto').validate({
    rules: {
        img: {
            required: true,
        },
        txtSku: {
            required: true,
            number: true
        },
        producto: {
            required: true,
            minlength: 5
        },
        cantidad: {
            required: true,
            number: true
        },
        precio: {
            required: true,
            number: true
        },
        descripcion: {
            required: true,
            minlength: 10
        },
    },
    messages: {
        img: {
            required: "Este campo es obligatorio",
        },
        txtSku: {
            required: "Este campo es obligatorio",
            number: "Solo acepta numeros como campo"
        },
        producto: {
            required: "Este campo es obligatorio",
            minlength: "Nombre muy corto"
        },
        cantidad: {
            required: "Este campo es obligatorio",
            number: "Solo acepta numeros como campo"
        },
        precio: {
            required: "Este campo es obligatorio",
            number: "Solo acepta numeros como campo"
        },
        descripcion: {
            required: "Este campo es obligatorio",
            minlength: "Descripcion muy corta"
        },
    },
})