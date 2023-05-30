

//generar reporte se le pasa el id del tipo que quiera generar el filtro
const generarReporte = (id_tipo) => {

    fetch("http://localhost:8080/radicado/pdf/" + id_tipo, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'arraybuffer'
    })
        .then((response) => response.blob())
        .then((data) => {

            if(data.size > 66) {
                const blob = new Blob([data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
    
                /* POR SI QUIEREN DE UNA DESCARGAR EL ARCHIVO, LO ANTERIOR LO PREVISUALIZA EN UNA NUEVA PESTAÑA
                const fileName = "documento.pdf";
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();*/
    
                Swal.fire({
                    title: "Información",
                    text: "Reporte generado con exito",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open(url);
                    }
                })
            } else {
                Swal.fire({
                    title: "Atención",
                    text: "No hay datos para generar el informe",
                    icon: "warning"
                })
            }

        })
        .catch((error) => {
            console.log(error)
            Swal.fire({
                title: "Atención",
                text: "Error",
                icon: "error"
            })
        });
}