
function llenarTablaPendiente() {
    var tbody = document.getElementById('reclamos1')
    fetch('http://localhost:8080/historialestados/filtro/2/3', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {

            console.log("dataaaaaaaaaaaa")
            console.log(data)

            if (data.historial.length > 0) {

                for (let i = 0; i < data.historial.length; i++) {

                    let fila = document.createElement('tr');

                    let titulo = document.createElement('td');
                    titulo.id = "reclamos-titulo1"
                    titulo.textContent = data.historial[i].pqrs.titulo;
                    fila.appendChild(titulo);

                    let tipo = document.createElement('td');
                    tipo.id = "reclamos-tipo1"
                    tipo.textContent = data.historial[i].pqrs.tipo.nombre;
                    fila.appendChild(tipo);

                    let usuario = document.createElement('td');
                    usuario.id = "reclamos-usuario1"
                    usuario.textContent = data.historial[i].pqrs.usuario.nombre;
                    fila.appendChild(usuario);

                    let area = document.createElement('td');
                    area.id = "reclamos-area1"
                    area.textContent = data.historial[i].pqrs.area.nombre;
                    fila.appendChild(area);

                    let accionColumna = document.createElement('td');
                    accionColumna.id = "reclamos-accion1"
                    let boton = document.createElement('button');
                    boton.id = "reclamos-boton1"
                    boton.textContent = 'Responder';
                    boton.className = 'btn btn-primary';
                    boton.setAttribute('data-bs-toggle', 'modal');
                    boton.setAttribute('data-bs-target', '#responderModal');
                    boton.onclick = function () {
                        responderPeticion(data.historial[i].id_historial);
                    };

                    accionColumna.appendChild(boton);

                    let rechazar = document.createElement('button');
                    rechazar.id = "reclamos-rechazar1"
                    rechazar.textContent = ' Rechazar';
                    rechazar.className = 'btn btn-danger ml-2';
                    rechazar.onclick = function () {

                        const fechaActual = new Date();

                        const rechazarEstado = {
                            fecha_cambio: fechaActual,
                            pqrs: {
                                id_radicado: data.historial[i].pqrs.id_radicado
                            },
                            estado: {
                                id_estado: 3
                            }
                        }

                        console.log(rechazarEstado)

                        let rechazarEstadoJSON = JSON.stringify(rechazarEstado);

                        Swal.fire({
                            title: "Atención",
                            text: "¿Estas seguro de rechazar la petición?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: "Aceptar"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                fetch("http://localhost:8080/historialestados/guardar", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${token}`
                                    },
                                    body: rechazarEstadoJSON,
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log(data);

                                        Swal.fire('Información', 'Petición rechazada', 'success')
                                        window.location.href = 'reclamos.html'

                                    })
                                    .catch((error) => {
                                        console.error("Error al intentar guardar:", error);
                                    });
                            } 
                        })




                    };

                    accionColumna.appendChild(rechazar);

                    fila.appendChild(accionColumna);

                    tbody.appendChild(fila);
                }
            } else {
                let fila = document.createElement('tr');
                let rta = document.createElement('td');

                rta.textContent = "No hay datos";
                rta.colSpan = 5;


                rta.style.textAlign = "center";

                fila.appendChild(rta);
                tbody.appendChild(fila);
            }


        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

}


function llenarTablaRespondidas() {
    var tbody = document.getElementById('reclamos2')
    fetch('http://localhost:8080/historialestados/filtro/1/3', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {

            console.log(data)

            if (data.historial.length > 0) {

                for (let i = 0; i < data.historial.length; i++) {
                    let fila = document.createElement('tr');

                    let titulo = document.createElement('td');
                    titulo.id = "reclamos-titulo2"
                    titulo.textContent = data.historial[i].pqrs.titulo;
                    fila.appendChild(titulo);

                    let tipo = document.createElement('td');
                    tipo.id = "reclamos-tipo2"
                    tipo.textContent = data.historial[i].pqrs.tipo.nombre;
                    fila.appendChild(tipo);

                    let usuario = document.createElement('td');
                    usuario.id = "reclamos-usuario2"
                    usuario.textContent = data.historial[i].pqrs.usuario.nombre;
                    fila.appendChild(usuario);

                    let area = document.createElement('td');
                    area.id = "reclamos-area2"
                    area.textContent = data.historial[i].pqrs.area.nombre;
                    fila.appendChild(area);

                    let accionColumna = document.createElement('td');
                    accionColumna.id = "reclamos-accion2"
                    let boton = document.createElement('button');
                    boton.id = "reclamos-boton2"
                    boton.textContent = 'Ver respuesta';
                    boton.className = 'btn btn-primary';
                    boton.setAttribute('data-bs-toggle', 'modal');
                    boton.setAttribute('data-bs-target', '#verPeticionModal');


                    boton.onclick = function () {
                        verRespuestaModal(data.historial[i].id_historial, data.historial[i].pqrs.id_radicado);
                    };

                    accionColumna.appendChild(boton);
                    fila.appendChild(accionColumna);

                    tbody.appendChild(fila);
                }
            } else {

                let fila = document.createElement('tr');

                let rta = document.createElement('td');

                rta.textContent = "No hay datos";
                rta.colSpan = 5;


                rta.style.textAlign = "center";

                fila.appendChild(rta);
                tbody.appendChild(fila);
            }


        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

function llenarTablaRechazadas() {
    var tbody = document.getElementById('reclamos3')
    fetch('http://localhost:8080/historialestados/filtro/3/3', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            // Recorrer los datos obtenidos y agregar filas a la tabla
            console.log(data)


            if (data.historial.length > 0) {

                for (let i = 0; i < data.historial.length; i++) {
                    let fila = document.createElement('tr');

                    let titulo = document.createElement('td');
                    titulo.id = "reclamos-titulo3"
                    titulo.textContent = data.historial[i].pqrs.titulo;
                    fila.appendChild(titulo);

                    let tipo = document.createElement('td');
                    tipo.id = "reclamos-tipo3"
                    tipo.textContent = data.historial[i].pqrs.tipo.nombre;
                    fila.appendChild(tipo);

                    let usuario = document.createElement('td');
                    usuario.id = "reclamos-usuario3"
                    usuario.textContent = data.historial[i].pqrs.usuario.nombre;
                    fila.appendChild(usuario);

                    let area = document.createElement('td');
                    area.id = "reclamos-area3"
                    area.textContent = data.historial[i].pqrs.area.nombre;
                    fila.appendChild(area);



                    tbody.appendChild(fila);
                }
            } else {
                let fila = document.createElement('tr');
                let rta = document.createElement('td');

                rta.textContent = "No hay datos";
                rta.colSpan = 5;


                rta.style.textAlign = "center";

                fila.appendChild(rta);
                tbody.appendChild(fila);
            }




        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

function responderPeticion(id_historial) {
    //console.log(id_historial);
    fetch(`http://localhost:8080/historialestados/${id_historial}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.historialEstados.pqrs.usuario.id_usuario)
            document.getElementById('radicado').value = data.historialEstados.pqrs.id_radicado;
            document.getElementById('user').value = data.historialEstados.pqrs.usuario.nombre;
            document.getElementById('area').value = data.historialEstados.pqrs.area.nombre;
            document.getElementById('prio').value = data.historialEstados.pqrs.prioridad.descripcion;
            document.getElementById('titulo').value = data.historialEstados.pqrs.titulo;
            document.getElementById('desc').value = data.historialEstados.pqrs.descripcion;


            var btn = document.getElementById('abtn');

            if (data.historialEstados.pqrs.anexo != "") {

                btn.href = base + data.historialEstados.pqrs.anexo;
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }

            var boton = document.getElementById('enviar');
            boton.onclick = function () {
                actualizarInfoReclamos();
            };

        }).catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

var base64 = "";
var nombreImagen = "";
var extImagen = "";
function actualizarInfoReclamos() {
    const admin = localStorage.getItem('id_usuario');
    const respuesta = document.getElementById('resp').value;
    const cal = document.getElementById('cal').value;
    const rad = document.getElementById('radicado').value;

    let imagen = base64;

    const data = {
        respuesta: respuesta,
        calificacion: cal,
        usuario: { id_usuario: parseInt(admin) },
        pqrs: { id_radicado: parseInt(rad) },
        anexo: imagen,
    }
    console.log(data)

    let dataJSON = JSON.stringify(data);
    console.log("data")
    console.log(data);

    console.log(token)

    fetch("http://localhost:8080/respuesta/guardar", {
        method: "POST",
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
                    window.location.href = 'reclamos.html'
                }
            })
        })
        .catch((error) => {
            console.error("Error al intentar guardar:", error);
        });
}

var input = document.getElementById("anexo");
input.addEventListener("change", function () {

    var archivo = input.files[0];
    let splitNombre = archivo.name.split(".");
    nombreImagen = splitNombre[0];
    extImagen = splitNombre[1];

    var lector = new FileReader();

    lector.onload = function (evento) {
        var base64Image = evento.target.result.split(",")[1];
        base64 = `${base64Image} ${extImagen} ${nombreImagen}`;
        console.log(base64)

    };
    lector.readAsDataURL(archivo);
});


function verRespuestaModal(id_historial, id_radicado) {
    fetch(`http://localhost:8080/historialestados/${id_historial}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.historialEstados.pqrs.usuario.id_usuario)
            id_radicado = data.historialEstados.pqrs.id_radicado;
            document.getElementById('radicado1').value = data.historialEstados.pqrs.id_radicado;
            document.getElementById('user1').value = data.historialEstados.pqrs.usuario.nombre;
            document.getElementById('area1').value = data.historialEstados.pqrs.area.nombre;
            document.getElementById('prio1').value = data.historialEstados.pqrs.prioridad.descripcion;
            document.getElementById('titulo1').value = data.historialEstados.pqrs.titulo;
            document.getElementById('desc1').value = data.historialEstados.pqrs.descripcion;


            var btn = document.getElementById('abtn1');

            if (data.historialEstados.pqrs.anexo != "") {

                btn.href = base + data.historialEstados.pqrs.anexo;
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }


        }).catch(error => {
            console.error('Error al obtener los datos:', error);
        });

    fetch(`http://localhost:8080/respuesta/radicado/${id_radicado}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(id_radicado)
            document.getElementById('resp1').value = data.respuesta.respuesta;
            document.getElementById('cal1').value = data.respuesta.calificacion;

            var btn = document.getElementById('abtn2');

            if (data.respuesta.anexo != "") {

                btn.href = base + data.respuesta.anexo;
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }




        }).catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    llenarTablaPendiente();
    llenarTablaRespondidas();
    llenarTablaRechazadas();
});

