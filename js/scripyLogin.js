const formeElement = document.getElementById("formm");

formeElement.addEventListener("submit", (event)=> {
    event.preventDefault();

    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let login = {email:email.value, password:password.value};
    let loginJSON = JSON.stringify(login);

        fetch(`http://localhost:8080/login`, {
            method: "POST",
            body: loginJSON,
        })
        .then(response => response.json())
        .then(data => {

            if(data.token != null) {
                const token = data.token;

                localStorage.removeItem('anonimo')
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('email', data.username)
                localStorage.setItem('rol', data.rol)
                localStorage.setItem('isAuthenticated', true);

                if(data.rol == "ROLE_ADMIN"){
                    window.location.href = 'admin.html'
                } else if(data.rol == "ROLE_STUDENT") {
                    window.location.href = 'index.html'
                }
                console.log(data)
            } else {
                email.value = "";
                password.value = "";

                const err = document.getElementById("error");
                err.innerHTML = data.message;
            }
        })
    
    
})

