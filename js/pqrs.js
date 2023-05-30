const token = localStorage.getItem("jwtToken");

const listarCategorias = () => {
  fetch("http://localhost:8080/tipo/all")
    .then((response) => response.json())
    .then((data) => {
      let selectCategoria = document.getElementById("combo-box-Categoria");

      data.tipo.forEach((item) => {
        let option = document.createElement("option");
        option.value = item.id_tipo;
        option.text = item.nombre;
        selectCategoria.appendChild(option);
      });
    });
};

const listarAreas = () => {
  fetch("http://localhost:8080/area/all")
    .then((response) => response.json())
    .then((data) => {
      let selectArea = document.getElementById("combo-box-Area");

      data.areas.forEach((item) => {
        let option = document.createElement("option");
        option.value = item.id_area;
        option.text = item.nombre;
        selectArea.appendChild(option);
      });
    });
};


var base64 = "";
var nombreAnexo = "";
var extAnexo = "";

const enviarData = () => {

  let titulo = document.getElementById("titulo").value;
  let descripcion = document.getElementById("descripcion").value;
  let anexo = base64;

  let id_usuario = localStorage.getItem("id_usuario");

  let area = document.getElementById("combo-box-Categoria").value;
  let tipo = document.getElementById("combo-box-Area").value;

  const token = localStorage.getItem("jwtToken");
  const pqrs = {
    titulo: titulo,
    descripcion: descripcion,
    anexo: anexo,
    usuario: {
      id_usuario: id_usuario,
    },
    prioridad: null,
    area: {
      id_area : area,
    },
    tipo: {
      id_tipo: tipo,
    }
  };

  let pqrsJSON = JSON.stringify(pqrs);
  console.log("data")
  console.log(pqrs);

  fetch("http://localhost:8080/radicado/guardar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: pqrsJSON,
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
          window.location.href = 'preguntasFrecuentes.html'
        }
      })
    })
    .catch((error) => {
      console.error("Error al intentar guardar:", error);
    });

  
};

var input = document.getElementById("file");
input.addEventListener("change", function () {

  var archivo = input.files[0];
  let splitNombre = archivo.name.split(".");
  nombreAnexo = splitNombre[0];
  extAnexo = splitNombre[1];

  var lector = new FileReader();

  lector.onload = function (evento) {
    var base64Image = evento.target.result.split(",")[1];
    base64 = `${base64Image} ${extAnexo} ${nombreAnexo}`;

  };
  lector.readAsDataURL(archivo);
});


document.addEventListener("DOMContentLoaded", function () {
  obtenerUsuarioLogueado();
  listarCategorias();
  listarAreas();
});