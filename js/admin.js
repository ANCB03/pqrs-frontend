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
            boton.onclick = function () {
                editar(data.usuario[i].id_usuario);
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