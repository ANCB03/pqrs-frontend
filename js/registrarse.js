var base64 = "";
var nombreImagen = "";
var extImagen = "";
const formeElement = document.getElementById("formm");
formeElement.addEventListener("submit", (event)=> {
    event.preventDefault();

    
    let id_usuario = document.getElementById("id_usuario").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById ("apellido").value; 
    let telefono = document.getElementById ("telefono").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let imagen = base64;

   


    const token = localStorage.getItem('jwtToken');
    const registro = {id_usuario:id_usuario ,nombre:nombre, apellido:apellido, telefono:telefono, email:email, password:password, imagen: imagen, rol: {id_rol: 2}};
    let registroJSON = JSON.stringify(registro)
    console.log(registroJSON)
    
    fetch('http://localhost:8080/usuario/guardar',  {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        body: registroJSON
    })
    .then(Response => Response.json())
    .then (data => {
        // Obtener el token JWT de la respuesta de la API
    console.log(data)
    }).catch(error => {
        console.error('Error al intentar guardar:', error);
      });

});


 // Obtener referencia al elemento <input type="file">
 var input = document.getElementById("imagen");

 // Agregar evento de cambio al elemento
 input.addEventListener('change', function () {
     // Obtener el archivo seleccionado
     var archivo = input.files[0];
     let splitNombre = archivo.name.split(".");
     nombreImagen = splitNombre[0];
     extImagen = splitNombre[1];
     
     //console.log(nombreImagen)
     //console.log(extImagen)
     // Crear un objeto FileReader
     var lector = new FileReader();

     // Cuando se complete la carga del archivo
     lector.onload = function (evento) {
         // Obtener la representación en base64 del archivo
         var base64Image = evento.target.result.split(',')[1];

         base64 = `${base64Image} ${extImagen} ${nombreImagen}`;

         // Hacer algo con la representación en base64
         //console.log(base64Image);
     };

     // Leer el archivo como datos URL (base64)
     lector.readAsDataURL(archivo);
 });