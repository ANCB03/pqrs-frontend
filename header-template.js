
const isAuthenticated = localStorage.getItem('isAuthenticated');
const token = localStorage.getItem("jwtToken");


const base = "https://pqrs-docs.s3.amazonaws.com/documents/"


let headerTemplate = `
    <header>
        <div class="divlogo">
        <img src="img/logo.png" alt="" id="logo">
        </div>
        <div class="textencabezado">
        <li>
            <a href="index.html">
                <h2>SISTEMA PQRS <br> ing. de sistemas</h2>
            </a>
        </li>
        </div>
        <div id="sideNavigation" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>

        
        <div id="cont-img" style="display: flex; justify-content: center; align-items: center; ">
            <img id='imagen' src='' style="height:5rem; width:5rem; border-radius: 50%"/>
        </div>
        <div id="cont-text" style="display: flex; justify-content: center; align-items: center; ">
            <p id='nombre' style='margin-bottom: 2rem; color: white'></p>
        </div>
        <a href="index.html">INICIO</a>
        <a href="#" onclick='validarSesion()'>PQRS</a>
        <a id="quejas" href="quejas.html">QUEJAS</a>
        ${isAuthenticated != null ? "<a href='mi-perfil.html'>MI PERFIL</a><a href='#' onclick='logout()'>CERRAR SESION</a>" : "<a href='login.html'>INICIAR SESION</a><a href='registrarse.html'>REGISTRARSE</a>"}
        
        
        </div>
        <nav class="topnav">
        <a href="#" onclick="openNav()">
            <svg width="30" height="30" id="icoOpen">
                <path d="M0,5 30,5" stroke="#000" stroke-width="5" />
                <path d="M0,14 30,14" stroke="#000" stroke-width="5" />
                <path d="M0,23 30,23" stroke="#000" stroke-width="5" />
            </svg>
        </a>
        </nav>
    </header>
    `;


const validarSesion = () => {
    if (localStorage.getItem("anonimo") == 1) {
        window.location.href = "login.html";
    } else {
        window.location.href = "preguntasFrecuentes.html";
    }
}

const email = localStorage.getItem("email");



const obtenerUsuarioLogueado = () => {
    console.log(email)

    if (email != null) {
        fetch("http://pqrs.us-east-1.elasticbeanstalk.com/usuario/encontrar/" + email, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                const imgElement = document.getElementById('imagen');
                const nombre = document.getElementById('nombre');
                const quejas = document.getElementById('quejas');

                quejas.style.display = 'none'

                imgElement.style.display = 'block'
                nombre.style.display = 'block'
                imgElement.src = base + data.usuario.imagen;
                nombre.innerText = data.usuario.nombre.split(" ")[0] + " " + data.usuario.apellido.split(" ")[0];

                localStorage.setItem("id_usuario", data.usuario.id_usuario)

            })


    } else if (localStorage.getItem("anonimo") != null) {
        console.log("soy anonimo")
        const imgElement = document.getElementById('imagen');
        const nombre = document.getElementById('nombre');

        imgElement.style.display = 'none'
        nombre.style.display = 'none'

    } else {
        localStorage.setItem("anonimo", 1);
        window.location.href = "index.html";
    }
};

const logout = () => {
    console.log("cerrar sesion")
    localStorage.clear();
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("rol") == "ROLE_ADMIN") {
        window.location.href = "admin.html"
    }

    document.getElementById("header").innerHTML = headerTemplate;

    obtenerUsuarioLogueado();
});

