
function llenarTablaSugerenciasPendientes() {
    var tbodyP = document.getElementById('sugerencias1')
    fetch('http://pqrs.us-east-1.elasticbeanstalk.com/historialestados/filtro/2/4', {
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
                    fila.id = "fila-sugerencias1"+i;


                    let titulo = document.createElement('td');
                    titulo.id = "sugerencias-titulo1"
                    titulo.textContent = data.historial[i].pqrs.titulo;
                    fila.appendChild(titulo);

                    let tipo = document.createElement('td');
                    tipo.id = "sugerencias-tipo1"
                    tipo.textContent = data.historial[i].pqrs.tipo.nombre;
                    fila.appendChild(tipo);

                    let usuario = document.createElement('td');
                    usuario.id = "sugerencias-usuario1"
                    usuario.textContent = data.historial[i].pqrs.usuario.id_usuario;
                    fila.appendChild(usuario);

                    let area = document.createElement('td');
                    area.id = "sugerencias-area1"
                    area.textContent = data.historial[i].pqrs.area.nombre;
                    fila.appendChild(area);

                    let accionColumna = document.createElement('td');
                    accionColumna.id = "sugerencias-accion1"
                    let boton = document.createElement('button');
                    boton.id = "sugerencias-boton1"
                    boton.textContent = 'Responder';
                    boton.className = 'btn btn-primary';
                    boton.setAttribute('data-bs-toggle', 'modal');
                    boton.setAttribute('data-bs-target', '#responderModal');
                    boton.onclick = function () {
                        responderSugerencia(data.historial[i].id_historial);
                    };

                    accionColumna.appendChild(boton);

                    let rechazar = document.createElement('button');
                    rechazar.id = "sugerencias-rechazar1"
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
                            text: "¿Estas seguro de rechazar la Sugerencia?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: "Aceptar"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                fetch("http://pqrs.us-east-1.elasticbeanstalk.com/historialestados/guardar", {
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

                                        Swal.fire('Información', 'Sugerencia rechazada', 'success')
                                        window.location.href = 'sugerencias.html'

                                    })
                                    .catch((error) => {
                                        console.error("Error al intentar guardar:", error);
                                    });
                            } 
                        })




                    };

                    accionColumna.appendChild(rechazar);

                    fila.appendChild(accionColumna);

                    tbodyP.appendChild(fila);
                }
            } else {
                let fila = document.createElement('tr');
                fila.id = "fila-rta1";

                let rta = document.createElement('td');
                rta.id = "rta1";


                rta.textContent = "No hay datos";
                rta.colSpan = 5;


                rta.style.textAlign = "center";

                fila.appendChild(rta);
                tbodyP.appendChild(fila);
            }


        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

}


function llenarTablaSugerenciasRespondidos() {
    var tbodyR = document.getElementById('sugerencias2')
    fetch('http://pqrs.us-east-1.elasticbeanstalk.com/historialestados/filtro/1/4', {
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
                    fila.id = "fila-sugerencias2"+i;


                    let titulo = document.createElement('td');
                    titulo.id = "sugerencias-titulo2"
                    titulo.textContent = data.historial[i].pqrs.titulo;
                    fila.appendChild(titulo);

                    let tipo = document.createElement('td');
                    tipo.id = "sugerencias-tipo2"
                    tipo.textContent = data.historial[i].pqrs.tipo.nombre;
                    fila.appendChild(tipo);

                    let usuario = document.createElement('td');
                    usuario.id = "sugerencias-usuario2"
                    usuario.textContent = data.historial[i].pqrs.usuario.id_usuario;
                    fila.appendChild(usuario);

                    let area = document.createElement('td');
                    area.id = "sugerencias-area2"
                    area.textContent = data.historial[i].pqrs.area.nombre;
                    fila.appendChild(area);

                    let accionColumna = document.createElement('td');
                    accionColumna.id = "sugerencias-accion2"
                    let boton = document.createElement('button');
                    boton.id = "sugerencias-boton2"
                    boton.textContent = 'Ver respuesta';
                    boton.className = 'btn btn-primary';
                    boton.setAttribute('data-bs-toggle', 'modal');
                    boton.setAttribute('data-bs-target', '#verPeticionModal');


                    boton.onclick = function () {
                        verRespuestaSugerenciasModal(data.historial[i].id_historial, data.historial[i].pqrs.id_radicado);
                    };

                    accionColumna.appendChild(boton);
                    fila.appendChild(accionColumna);

                    tbodyR.appendChild(fila);
                }
            } else {

                let fila = document.createElement('tr');
                fila.id = "fila-rta2";

                let rta = document.createElement('td');
                rta.id = "rta2";

                rta.textContent = "No hay datos";
                rta.colSpan = 5;


                rta.style.textAlign = "center";

                fila.appendChild(rta);
                tbodyR.appendChild(fila);
            }


        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

function llenarTablaSugerenciasRechazados() {
    var tbodyRe = document.getElementById('sugerencias3')
    fetch('http://pqrs.us-east-1.elasticbeanstalk.com/historialestados/filtro/3/4', {
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
                    fila.id = "fila-sugerencias3"+i;


                    let titulo = document.createElement('td');
                    titulo.id = "sugerencias-titulo3"
                    titulo.textContent = data.historial[i].pqrs.titulo;
                    fila.appendChild(titulo);

                    let tipo = document.createElement('td');
                    tipo.id = "sugerencias-tipo3"
                    tipo.textContent = data.historial[i].pqrs.tipo.nombre;
                    fila.appendChild(tipo);

                    let usuario = document.createElement('td');
                    usuario.id = "sugerencias-usuario3"
                    usuario.textContent = data.historial[i].pqrs.usuario.id_usuario;
                    fila.appendChild(usuario);

                    let area = document.createElement('td');
                    area.id = "sugerencias-area3"
                    area.textContent = data.historial[i].pqrs.area.nombre;
                    fila.appendChild(area);



                    tbodyRe.appendChild(fila);
                }
            } else {
                let fila = document.createElement('tr');
                fila.id = "fila-rta3";

                let rta = document.createElement('td');
                rta.id = "rta3";

                rta.textContent = "No hay datos";
                rta.colSpan = 5;


                rta.style.textAlign = "center";

                fila.appendChild(rta);
                tbodyRe.appendChild(fila);
            }

        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

function responderSugerencia(id_historial) {
    //console.log(id_historial);
    fetch(`http://pqrs.us-east-1.elasticbeanstalk.com/historialestados/${id_historial}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.historialEstados.pqrs.usuario.id_usuario)
            document.getElementById('radicado').value = data.historialEstados.pqrs.id_radicado;
            document.getElementById('user').value = data.historialEstados.pqrs.usuario.id_usuario;
            document.getElementById('area').value = data.historialEstados.pqrs.area.nombre;
            document.getElementById('prio').value = data.historialEstados.pqrs.prioridad.descripcion;
            document.getElementById('titulo').value = data.historialEstados.pqrs.titulo;
            document.getElementById('desc').value = data.historialEstados.pqrs.descripcion;


            let btn = document.getElementById('abtn');

            if (data.historialEstados.pqrs.anexo != "") {

                btn.href = base + data.historialEstados.pqrs.anexo;
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }

            let boton = document.getElementById('enviar');
            boton.onclick = function () {
                actualizarInfoSugerencias();
            };

        }).catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

var base64 = "";
var nombreImagen = "";
var extImagen = "";
function actualizarInfoSugerencias() {
    const admin = document.getElementById('user').value;
    const respuesta = document.getElementById('resp').value;
    const rad = document.getElementById('radicado').value;

    let imagen = base64;

    const data = {
        respuesta: respuesta,
        calificacion: 1,
        usuario: { id_usuario: parseInt(admin) },
        pqrs: { id_radicado: parseInt(rad) },
        anexo: imagen,
    }
    console.log(data)

    let dataJSON = JSON.stringify(data);
    console.log("data")
    console.log(data);

    console.log(token)

    fetch("http://pqrs.us-east-1.elasticbeanstalk.com/respuesta/guardar", {
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
                    window.location.href = 'sugerencias.html'
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


function verRespuestaSugerenciasModal(id_historial, id_radicado) {
    fetch(`http://pqrs.us-east-1.elasticbeanstalk.com/historialestados/${id_historial}`, {
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

    fetch(`http://pqrs.us-east-1.elasticbeanstalk.com/respuesta/radicado/${id_radicado}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
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
    llenarTablaSugerenciasPendientes();
    llenarTablaSugerenciasRespondidos();
    llenarTablaSugerenciasRechazados();
});

