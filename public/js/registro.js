const boton = document.getElementById("btn-registrar");
const resultado = document.getElementById("resultado");
boton.addEventListener("click", async function(){
    boton.innerHTML = '<img src="/assets/loading.svg" width="50px" height="50px" />';
    const user = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const data = JSON.stringify({user, email, pass});
    const respuesta = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    boton.innerHTML = "registrarse";
    const dataRespuesta = await respuesta.json();
    if(dataRespuesta.error) {
        resultado.innerText = "Ocurrio un error ❌";       
    } else {
        resultado.innerText = "Guardado! ✅";
    }
    setTimeout(() => {
        resultado.innerText = "";
    }, 1000);
})

const botonLogin = document.getElementById("btn-login");
