
function llenarTablaPendiente(){
    var tbody = document.getElementById('cuerpo1')
    fetch('http://localhost:8080/historialestados/filtro/2/2', {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        // Recorrer los datos obtenidos y agregar filas a la tabla
        console.log(data)
        for (let i = 0; i < data.historial.length; i++) {
            var fila = document.createElement('tr');

            var titulo = document.createElement('td');
            titulo.textContent = data.historial[i].pqrs.titulo;
            fila.appendChild(titulo);

            var tipo = document.createElement('td');
            tipo.textContent = data.historial[i].pqrs.tipo.nombre;
            fila.appendChild(tipo);

            var usuario = document.createElement('td');
            usuario.textContent = data.historial[i].pqrs.usuario.nombre;
            fila.appendChild(usuario);

            var area = document.createElement('td');
            area.textContent = data.historial[i].pqrs.area.nombre;
            fila.appendChild(area);

            var accionColumna = document.createElement('td');
            var boton = document.createElement('button');
            boton.textContent = 'Responder';
            boton.className = 'btn btn-primary';
            boton.setAttribute('data-bs-toggle', 'modal');
            boton.setAttribute('data-bs-target', '#responderModal');
            boton.onclick = function () {
                responderPeticion(data.historial[i].id_historial);
            };

            accionColumna.appendChild(boton);
            fila.appendChild(accionColumna);

            tbody.appendChild(fila);
        }

        
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });

}

function llenarTablaRespondidas(){
    var tbody = document.getElementById('cuerpo2')
    fetch('http://localhost:8080/historialestados/filtro/1/2', {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        // Recorrer los datos obtenidos y agregar filas a la tabla
        console.log(data)
        for (let i = 0; i < data.historial.length; i++) {
            var fila = document.createElement('tr');

            var titulo = document.createElement('td');
            titulo.textContent = data.historial[i].pqrs.titulo;
            fila.appendChild(titulo);

            var tipo = document.createElement('td');
            tipo.textContent = data.historial[i].pqrs.tipo.nombre;
            fila.appendChild(tipo);

            var usuario = document.createElement('td');
            usuario.textContent = data.historial[i].pqrs.usuario.nombre;
            fila.appendChild(usuario);

            var area = document.createElement('td');
            area.textContent = data.historial[i].pqrs.area.nombre;
            fila.appendChild(area);

            var accionColumna = document.createElement('td');
            var boton = document.createElement('button');
            boton.textContent = 'Ver respuesta';
            boton.className = 'btn btn-primary';
            boton.setAttribute('data-bs-toggle', 'modal');
            boton.setAttribute('data-bs-target', '#verPeticionModal');
            boton.onclick = function () {
                verRespuestaModal(data.historial[i].id_historial,data.historial[i].pqrs.id_radicado);
            };

            accionColumna.appendChild(boton);
            fila.appendChild(accionColumna);

            tbody.appendChild(fila);
        }

        
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

function llenarTablaRechazadas(){
    var tbody = document.getElementById('cuerpo3')
    fetch('http://localhost:8080/historialestados/filtro/3/2', {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        // Recorrer los datos obtenidos y agregar filas a la tabla
        console.log(data)
        for (let i = 0; i < data.historial.length; i++) {
            var fila = document.createElement('tr');

            var titulo = document.createElement('td');
            titulo.textContent = data.historial[i].pqrs.titulo;
            fila.appendChild(titulo);

            var tipo = document.createElement('td');
            tipo.textContent = data.historial[i].pqrs.tipo.nombre;
            fila.appendChild(tipo);

            var usuario = document.createElement('td');
            usuario.textContent = data.historial[i].pqrs.usuario.nombre;
            fila.appendChild(usuario);

            var area = document.createElement('td');
            area.textContent = data.historial[i].pqrs.area.nombre;
            fila.appendChild(area);

            var accionColumna = document.createElement('td');
            var boton = document.createElement('button');
            boton.textContent = 'Editar';
            boton.className = 'btn btn-primary';
            boton.setAttribute('data-bs-toggle', 'modal');
            boton.setAttribute('data-bs-target', '#editarInfoModal');
            boton.onclick = function () {
                verRespuestaModal2();
            };

            accionColumna.appendChild(boton);
            fila.appendChild(accionColumna);

            tbody.appendChild(fila);
        }

        
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

function responderPeticion(id_historial){
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
            }else{
                btn.style.display = 'none';
            }

            var boton = document.getElementById('enviar');
            boton.onclick = function () {
                actualizarInfo();
            };

        }).catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

var base64 = "";
var nombreImagen = "";
var extImagen = "";
function actualizarInfo() {
    const admin = localStorage.getItem('id_usuario');
    const respuesta = document.getElementById('resp').value;
    const cal = document.getElementById('cal').value;
    const rad = document.getElementById('radicado').value;

    let imagen = base64;

    const data = {
        respuesta: respuesta,
        calificacion: cal,
        usuario: {id_usuario: parseInt(admin)},
        pqrs: {id_radicado: parseInt(rad)},
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
                    window.location.href = 'quejasUsuarios.html'
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


function verRespuestaModal(id_historial,id_radicado){
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
            }else{
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
            console.log(data)
            document.getElementById('resp1').value = data.respuesta.respuesta;
            document.getElementById('cal1').value = data.respuesta.calificacion;
            
            var btn = document.getElementById('abtn2');

            if (data.respuesta.anexo != "") {
               
                btn.href = base + data.respuesta.anexo;
                btn.style.display = 'block';
            }else{
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

    