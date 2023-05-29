
const isAuthenticated = localStorage.getItem('isAuthenticated');


const headerTemplate = `
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
    <a href="index.html">INICIO</a>
    <a href="#" onclick='validarSesion()'>PQRS</a>
    <a href="quejas.html">QUEJAS</a>
    ${isAuthenticated !=null ? "<a href='#' onclick='logout()'>CERRAR SESION</a>" : "<a href='login.html'>INICIAR SESION</a><a href='registrarse.html'>REGISTRARSE</a>"}
    
    
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
    console.log("golaa")
    if(localStorage.getItem("anonimo") == 1){
        window.location.href = "login.html";
    } else {
        window.location.href = "preguntasFrecuentes.html";
    }
}

const email = localStorage.getItem("email");

const obtenerUsuarioLogueado = () => {

    if(email != null){
        fetch("http://localhost:8080/usuario/encontrar/"+email)
        .then((response) => response.json())
        .then((data) => {
          
          console.log(data)
        });
    } else if(localStorage.getItem("anonimo") != null){
        console.log("soy anonimo")
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

document.addEventListener("DOMContentLoaded", function() {

    obtenerUsuarioLogueado();

    document.getElementById("header").innerHTML = headerTemplate;
});
  