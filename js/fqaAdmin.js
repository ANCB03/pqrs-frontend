fetch('http://localhost:8080/fqa/all', {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data.fqas.length)

        var tabla = document.getElementById("filasFQA")


        if (data.fqas.length > 0) {
            for (let i = 0; i < data.fqas.length; i++) {
                let fila = document.createElement('tr');

                let idFQA = document.createElement('td');
                idFQA.textContent = data.fqas[i].id_fqa;
                fila.appendChild(idFQA);

                let pregunta = document.createElement('td');
                pregunta.textContent = data.fqas[i].titulo;
                fila.appendChild(pregunta);

                let respuesta = document.createElement('td');
                respuesta.textContent = data.fqas[i].respuesta;
                fila.appendChild(respuesta);

                let accionColumna = document.createElement('td');
                let boton = document.createElement('button');
                boton.textContent = 'Editar';
                boton.className = 'btn btn-primary';
                boton.setAttribute('data-bs-toggle', 'modal');
                boton.setAttribute('data-bs-target', '#editarFQAModal');
                boton.onclick = function () {
                    abrirModalEditarFQA(data.fqas[i].id_fqa);
                };

                accionColumna.appendChild(boton);
                fila.appendChild(accionColumna);


                tabla.appendChild(fila);
            }
        } else {

            let fila = document.createElement('tr');
            let rta = document.createElement('td');

            rta.textContent = "No hay datos";
            rta.colSpan = 4;


            rta.style.textAlign = "center";

            fila.appendChild(rta);
            tbody.appendChild(fila);
        }


    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });


function abrirModalEditarFQA(id_fqa) {

    fetch(`http://localhost:8080/fqa/${id_fqa}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("fqaa")
            console.log(data)

            document.getElementById('idFQA').value = data.fqa.id_fqa;
            document.getElementById('preguntaFQA').value = data.fqa.titulo;
            document.getElementById('respuestaFQA').value = data.fqa.respuesta;

            let boton = document.getElementById('enviarFQA');
            boton.onclick = function () {
                console.log("guardar fqa")
                actualizarFQA(id_fqa);
            };

        }).catch(error => {
            console.error('Error al obtener los datos:', error);
        });

}

function actualizarFQA(id_fqa) {
    const idFQA = document.getElementById('idFQA').value;
    const titulo = document.getElementById('preguntaFQA').value;
    const respuesta = document.getElementById('respuestaFQA').value;


    const data = {
        id_fqa: id_fqa,
        titulo: titulo,
        respuesta: respuesta,
    }

    let dataJSON = JSON.stringify(data);
    console.log("data")
    console.log(data);

    console.log(token)

    fetch("http://localhost:8080/fqa/editar/" + idFQA, {
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
                    window.location.href = 'fqa.html'
                }
            })
        })
        .catch((error) => {
            console.error("Error al intentar guardar:", error);
        });
}


const guardarFQA = () => {
    let titulo = document.getElementById("preguntaFQAGuardar").value
    let respuesta = document.getElementById("respuestaFQAGuardar").value

    const data = {
        titulo: titulo,
        respuesta: respuesta
    }

    let fqaJSON = JSON.stringify(data);

    fetch("http://localhost:8080/fqa/guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: fqaJSON,
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
                    window.location.href = 'fqa.html'
                }
            })
        })
        .catch((error) => {
            console.error("Error al intentar guardar:", error);
        });
};


