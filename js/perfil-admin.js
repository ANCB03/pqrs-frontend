const id_usuario = localStorage.getItem("id_usuario");

let respuestas = [];

const miPerfilAdmin = () => {

    const codigo = document.getElementById('codigo');
    const nombres = document.getElementById('nombres');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');


    if (localStorage.getItem("email") != null) {
        fetch("http://localhost:8080/usuario/encontrar/" + localStorage.getItem("email"), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {

                console.log(data)
                const imagen = document.getElementById('img');
                imagen.src = base + data.usuario.imagen;
                codigo.innerText = data.usuario.id_usuario;
                nombres.innerText = data.usuario.nombre + " " + data.usuario.apellido;
                email.innerText = data.usuario.email;
                telefono.innerText = data.usuario.telefono;

                respuestas = data.usuario.respuestas;

                //edicion

                const cod = document.getElementById('cod1');
                const nom = document.getElementById('nom1');
                const ape = document.getElementById('ape1');
                const ema = document.getElementById('ema1');
                const tel = document.getElementById('tel1');

                cod.value = data.usuario.id_usuario;
                nom.value = data.usuario.nombre;
                ape.value = data.usuario.apellido;
                ema.value = data.usuario.email;
                tel.value = data.usuario.telefono;

            });
    }

}


var base64 = "";
var nombreImagen = "";
var extImagen = "";

const actualizarInfoAdmin = () => {
    const cod = document.getElementById('cod1').value;
    const nom = document.getElementById('nom1').value;
    const ape = document.getElementById('ape1').value;
    const ema = document.getElementById('ema1').value;
    const tel = document.getElementById('tel1').value;

    let imagen = base64;

    const data = {
        id_usuario: cod,
        nombre: nom,
        apellido: ape,
        email: ema,
        telefono: tel,
        imagen: imagen,
        rol: { id_rol: 2 },
    }

    let dataJSON = JSON.stringify(data);
    console.log("data")
    console.log(data);

    console.log(token)

    fetch("http://localhost:8080/usuario/editar/" + id_usuario, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: dataJSON,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            Swal.fire({
                title: "Información",
                text: data.message,
                icon: "success",
                confirmButtonText: "Aceptar"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'admin.html'
                }
            })
        })
        .catch((error) => {
            console.error("Error al intentar guardar:", error);
        });
}

// Obtener referencia al elemento <input type="file">
var input = document.getElementById("foto1");

// Agregar evento de cambio al elemento
input.addEventListener("change", function () {

    var archivo = input.files[0];
    let splitNombre = archivo.name.split(".");
    nombreImagen = splitNombre[0];
    extImagen = splitNombre[1];

    var lector = new FileReader();

    lector.onload = function (evento) {
        var base64Image = evento.target.result.split(",")[1];
        base64 = `${base64Image} ${extImagen} ${nombreImagen}`;

    };
    lector.readAsDataURL(archivo);
});



document.addEventListener("DOMContentLoaded", function () {
    miPerfilAdmin();
    console.log("algooo")
});