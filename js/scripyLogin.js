const formeElement = document.getElementById("formm");
formeElement.addEventListener("submit", (event)=> {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let login = {email:email, password:password};
    let loginJSON = JSON.stringify(login);
    
    fetch(`http://localhost:8080/login`, {
        method: "POST",
        body: loginJSON
    })
    .then(Response => Response.json())
    .then (data => {
        // Obtener el token JWT de la respuesta de la API
        const token = data.token;

        // Almacenar el token JWT en el almacenamiento local
        localStorage.setItem('jwtToken', token);
        token!=null? window.location.href = 'index.html': false
        console.log(data) 
    })
})

