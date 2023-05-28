const boton = document.getElementById("Div_Acceder")
const div = document.getElementById("aside")


let menu = false;

boton.addEventListener('click', function() {
    if(!menu){
        div.classList.add('animacion');
        menu = true;
        
    }
    else{
        div.classList.remove('animacion');
    div.classList.add('animacionOff');
    menu = false;
    setTimeout(function() {
      div.classList.remove('animacionOff');
    }, 1000)
    }
});