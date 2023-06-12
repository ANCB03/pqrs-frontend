const id_usuario = localStorage.getItem("id_usuario");

let respuestas = [];

const miPerfil = () => {

    const codigo = document.getElementById('codigo');
    const nombres = document.getElementById('nombres');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');


    if (localStorage.getItem("email") != null) {
        fetch("http://pqrs.us-east-1.elasticbeanstalk.com/usuario/encontrar/" + localStorage.getItem("email"), {
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

                const cod = document.getElementById('cod');
                const nom = document.getElementById('nom');
                const ape = document.getElementById('ape');
                const ema = document.getElementById('ema');
                const tel = document.getElementById('tel');

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

const actualizarInfo = () => {
    const cod = document.getElementById('cod').value;
    const nom = document.getElementById('nom').value;
    const ape = document.getElementById('ape').value;
    const ema = document.getElementById('ema').value;
    const tel = document.getElementById('tel').value;

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

    fetch("http://pqrs.us-east-1.elasticbeanstalk.com/usuario/editar/" + id_usuario, {
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
                    window.location.href = 'mi-perfil.html'
                }
            })
        })
        .catch((error) => {
            console.error("Error al intentar guardar:", error);
        });
}

// Obtener referencia al elemento <input type="file">
var input = document.getElementById("foto");

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

const cargarDataRespuestas = () => {
    var tabla = document.getElementById("filas")

    for (let i = 0; i < respuestas.length; i++) {
        console.log(respuestas[i])

        var fila = document.createElement("tr");

        var id_respuesta = document.createElement("td");
        id_respuesta.textContent = respuestas[i].id_respuesta;
        fila.appendChild(id_respuesta);

        var radicado = document.createElement("td");
        radicado.textContent = respuestas[i].pqrs.titulo;
        fila.appendChild(radicado);

        var respuesta = document.createElement("td");
        respuesta.textContent = respuestas[i].respuesta;
        fila.appendChild(respuesta);

        var calificacion = document.createElement("td");
        calificacion.textContent = respuestas[i].calificacion;
        fila.appendChild(calificacion);

        var anexo = document.createElement("a");

        anexo.href = base + respuestas[i].anexo;

        anexo.innerHTML = '<i style="color:black" class="fas fa-file-download"></i>';
        
        anexo.style.display = "flex";
        anexo.style.justifyContent = "center";
        anexo.style.alignItems = "center";
        anexo.style.textDecoration = "none";

        fila.appendChild(anexo);

        var accionColumna = document.createElement('td');
            var boton = document.createElement('button');
            boton.textContent = 'Calificar';
            boton.className = 'btn btn-primary';
            boton.setAttribute('data-bs-toggle', 'modal');
            boton.setAttribute('data-bs-target', '#darCalificacionModal');
            boton.onclick = function () {
                darCalificación(respuestas[i].id_respuesta);
            };

            accionColumna.appendChild(boton);
            fila.appendChild(accionColumna);

        tabla.appendChild(fila);
    }
}

function darCalificación(id_calificacion){
    fetch(`http://pqrs.us-east-1.elasticbeanstalk.com/respuesta/${id_calificacion}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('idres').value = data.respuesta.id_respuesta;
            document.getElementById('resp').value = data.respuesta.respuesta;
            document.getElementById('idrad').value = data.respuesta.pqrs.id_radicado;
            document.getElementById('iduser').value = data.respuesta.usuario.id_usuario;
            document.getElementById('calif').value = data.respuesta.calificacion;

        

        }).catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

function enviarCalificacion(){
    const cod = document.getElementById('idres').value;
    const calif = document.getElementById('calif').value;
    const rad = document.getElementById('idrad').value;
    const idUser = document.getElementById('iduser').value;

    const data = {
        anexo: "",
        calificacion: calif,
        id_respuesta: cod,
        pqrs: { id_radicado: rad },
        respuesta: "",
        usuario: {id_usuario: idUser}
    }

    let dataJSON = JSON.stringify(data);
    console.log("data")
    console.log(data);

    console.log(token)

    fetch("http://pqrs.us-east-1.elasticbeanstalk.com/respuesta/editar/" + cod, {
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
                    window.location.href = 'mi-perfil.html'
                }
            })
        })
        .catch((error) => {
            console.error("Error al intentar guardar:", error);
        });
}

const limpiarTabla = () => {
    var tbody = document.getElementById("filas");

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

var modal = document.getElementById("verRespuestasModal");

modal.addEventListener("hidden.bs.modal", function () {
    limpiarTabla();
});

document.addEventListener("DOMContentLoaded", function () {
    miPerfil();
    cargarDataRespuestas();

});