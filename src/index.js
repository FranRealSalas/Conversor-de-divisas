const URL = 'https://api.frankfurter.app';

const fechaElegida = document.querySelector('#fecha-elegida');
const botonAceptar = document.querySelector('#boton-aceptar');
const listaMonedas = document.querySelector('#lista-monedas');
const monedaBase = document.querySelector('#moneda-base');
const botonMostrarMonedas = document.querySelector('#mostrar-monedas');
const listaMonedasNombre = document.querySelector('#lista-monedas-nombres');
const listaErrores = document.querySelector('#errores');
 
//Validaciones
let fechaActual= new Date().toJSON().slice(0,10);
fechaElegida.max = fechaActual;

function validarFecha(fecha){
    if(fecha > fechaActual){
        return "hubo error";
    }

    else{
        return "";
    }
}

//Programa
botonAceptar.onclick = function(event){
    if(validarFecha(fechaElegida.value)===""){
        ocultarElemento(listaErrores);
        mostrarElemento(listaMonedas)

        listaMonedas.innerHTML = "";
        
        fetch(`${URL}/${fechaElegida.value}?from=${monedaBase.value}`)
        .then(respuesta => respuesta.json())
        .then(data => {
            $(".titulo-fecha-base").text(`Cambios a la fecha ${fechaElegida.value} en base ${monedaBase.value}`);
            Object.keys(data.rates).forEach(moneda => {
                let elemento = document.createElement('li');
                elemento.textContent = `${moneda}: ${data.rates[moneda]}`;
                $(listaMonedas).append(elemento);
            })
        })
    }
    else{
        listaErrores.innerHTML = "";
        mostrarElemento(listaErrores);
        const $error = document.createElement('li');
        $error.innerText = "Debe ingresar una fecha valida";
        listaErrores.appendChild($error);
        ocultarElemento(listaMonedas);
    }
}

fetch(`${URL}/currencies`)
    .then(respuesta => respuesta.json())
    .then(data => {
        Object.keys(data).forEach(moneda => {
            let elemento = document.createElement('li');
            elemento.textContent = `${moneda}: ${data[moneda]}`;
            $(listaMonedasNombre).append(elemento);
        })
    })

botonMostrarMonedas.onclick = function(event){
    if(listaMonedasNombre.classList.contains("oculto")){
        mostrarElemento(listaMonedasNombre);
        botonMostrarMonedas.innerHTML = "Ocultar monedas";
    }
    else{
        ocultarElemento(listaMonedasNombre);
        botonMostrarMonedas.innerHTML = "Mostrar monedas";
    }
}

//ocultar elementos
function ocultarElemento(elemento){
    elemento.classList.add("oculto");
}

function mostrarElemento(elemento){
    elemento.classList.remove("oculto");
}