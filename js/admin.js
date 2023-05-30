// Obtener referencia a la tabla y el cuerpo de la tabla
var tbody = document.querySelector('tbody')
const token = localStorage.getItem("jwtToken");
// Realizar solicitud Fetch para obtener los datos
fetch('http://localhost:8080/usuario/all', {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        // Recorrer los datos obtenidos y agregar filas a la tabla
        console.log(data)

        for (let i = 0; i < data.usuario.length; i++) {
            var fila = document.createElement('tr');

            var idColumna = document.createElement('td');
            idColumna.textContent = data.usuario[i].id_usuario;
            fila.appendChild(idColumna);

            var nombreColumna = document.createElement('td');
            nombreColumna.textContent = data.usuario[i].nombre;
            fila.appendChild(nombreColumna);

            var correoColumna = document.createElement('td');
            correoColumna.textContent = data.usuario[i].email;
            fila.appendChild(correoColumna);

            var telefonoColumna = document.createElement('td');
            telefonoColumna.textContent = data.usuario[i].telefono;
            fila.appendChild(telefonoColumna);

            var rolColumna = document.createElement('td');
            rolColumna.textContent = data.usuario[i].rol.descripcion;
            fila.appendChild(rolColumna);

            var accionColumna = document.createElement('td');
            var boton = document.createElement('button');
            boton.textContent = 'Editar';
            boton.className = 'btn btn-primary';
            boton.setAttribute('data-bs-toggle', 'modal');
            boton.setAttribute('data-bs-target', '#editarInfoModal');
            boton.onclick = function () {
                abrirModalEditarUsuario(data.usuario[i].id_usuario);
            };

            accionColumna.appendChild(boton);
            fila.appendChild(accionColumna);

            tbody.appendChild(fila);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });

function editar(id_usuario) {
    console.log(id_usuario);
};

function abrirModalEditarUsuario(idUsuario) {
    // Aquí puedes realizar una solicitud Fetch o acceder a tus datos de usuario como desees
    // En este ejemplo, utilizaremos datos de ejemplo

    fetch(`http://localhost:8080/usuario/${idUsuario}`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(response => response.json())
.then(data => {
    document.getElementById('cod').value = data.usuario.id_usuario;
    document.getElementById('nom').value = data.usuario.nombre;
    document.getElementById('ape').value = data.usuario.apellido;
    document.getElementById('ema').value = data.usuario.email;
    document.getElementById('tel').value = data.usuario.telefono;

    var boton = document.getElementById('enviar');
    boton.onclick = function () {
        actualizarInfo(data.usuario.id_usuario);
    };
}).catch(error => {
    console.error('Error al obtener los datos:', error);
});
    // Simulación de datos del usuario
    var usuario = {
      id: idUsuario,
      nombre: 'John',
      apellido: 'Doe',
      email: 'john.doe@example.com',
      telefono: '123456789'
    };

    // Cargar los datos del usuario en el formulario
    
  }

  var base64 = "";
var nombreImagen = "";
var extImagen = "";

function actualizarInfo(id_usuario){
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
        console.log(base64)

    };
    lector.readAsDataURL(archivo);
});