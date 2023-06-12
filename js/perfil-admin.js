var tbody = document.querySelector('tbody')
var id_usuario = localStorage.getItem('id_usuario');


fetch( `http://pqrs.us-east-1.elasticbeanstalk.com/usuario/${id_usuario}`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
            var fila = document.createElement('tr');

                var idColumna = document.createElement('td');
            idColumna.textContent = data.usuario.id_usuario;
            fila.appendChild(idColumna);

            var nombreColumna = document.createElement('td');
            nombreColumna.textContent = data.usuario.nombre;
            fila.appendChild(nombreColumna);

            var apellido = document.createElement('td');
            apellido.textContent = data.usuario.apellido;
            fila.appendChild(apellido);

            var email = document.createElement('td');
            email.textContent = data.usuario.email;
            fila.appendChild(email);

            var telefono = document.createElement('td');
            telefono.textContent = data.usuario.telefono;
            fila.appendChild(telefono);

            var accionColumna = document.createElement('td');
            var boton = document.createElement('button');
            boton.textContent = 'Editar';
            boton.className = 'btn btn-primary';
            boton.setAttribute('data-bs-toggle', 'modal');
            boton.setAttribute('data-bs-target', '#editarInfoModal');
            boton.onclick = function () {
                abrirModalEditarAdmin(data.usuario.id_usuario);
            };

            accionColumna.appendChild(boton);
            fila.appendChild(accionColumna);
            
            

            tbody.appendChild(fila);
        
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });

    function abrirModalEditarAdmin(idUsuario) {

        fetch(`http://pqrs.us-east-1.elasticbeanstalk.com/usuario/${idUsuario}`, {
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
    
    }

    var base64 = "";
var nombreImagen = "";
var extImagen = "";

function actualizarInfo(id_usuario) {
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
        rol: { id_rol: 1 },
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
                    window.location.href = 'editar-perfil-admin.html'
                }
            })
        })
        .catch((error) => {
            console.error("Error al intentar guardar:", error);
        });
}

var input = document.getElementById("foto");
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