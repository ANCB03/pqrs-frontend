
const generarQueja = () => {

    let nombre_usuario = document.getElementById("nombre_usuario").value
    let solicitud = document.getElementById("solicitud").value

    const data = {
        nombre_usuario: nombre_usuario,
        descripcion: solicitud
    }


    let dataJSON = JSON.stringify(data);
    console.log("data")
    console.log(data);

    fetch("http://pqrs.us-east-1.elasticbeanstalk.com/queja/guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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
                    window.location.href = 'index.html'
                }
            })
        })
        .catch((error) => {
            console.error("Error al intentar guardar:", error);
        });

};
