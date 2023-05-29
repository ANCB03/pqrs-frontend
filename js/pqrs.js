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

document.addEventListener("DOMContentLoaded", function () {
  obtenerUsuarioLogueado();
  listarCategorias();
  listarAreas();
});


var base64 = "";
var nombreAnexo = "";
var extAnexo = "";

const enviarData = (event) => {
  event.preventDefault();

  let titulo = document.getElementById("titulo").value;
  let descripcion = document.getElementById("descripcion").value;
  let anexo = base64;

  let usuario = "usuario logueado";
  let area = document.getElementById("area").value;
  let tipo = document.getElementById("tipo").value;



  const token = localStorage.getItem("jwtToken");
  const pqrs = {
    titulo: titulo,
    descripcion: descripcion,
    anexo: anexo,
    usuario: usuario,
    prioridad: null,
    area: area,
    tipo: tipo,
  };
  
  let pqrsJSON = JSON.stringify(pqrs);
  console.log("data")
  console.log(pqrsJSON);

  fetch("http://localhost:8080/pqrs/guardar", {
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
    })
    .catch((error) => {
      console.error("Error al intentar guardar:", error);
    });
};

// Obtener referencia al elemento <input type="file">
var input = document.getElementById("imagen");

// Agregar evento de cambio al elemento
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

