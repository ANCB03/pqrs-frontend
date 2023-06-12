
let fqa = document.getElementById("fqa")

const listarFQA = () => {
    fetch("http://pqrs.us-east-1.elasticbeanstalk.com/fqa/all")
      .then((response) => response.json())
      .then((data) => {

        console.log(data)

        data.fqas.forEach(item => {
            var div = document.createElement('div');

            var pregunta = document.createElement('h3');
            pregunta.textContent = item.titulo;

            var respuesta = document.createElement('p');
            respuesta.textContent = item.respuesta;

            div.appendChild(pregunta);
            div.appendChild(respuesta);

            div.classList.add("my-5")
            fqa.appendChild(div);
        });
       
      });
  };

  document.addEventListener("DOMContentLoaded", function () {
    listarFQA();
  });