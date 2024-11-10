// TODO

function loading() {
    var divAguardar = document.getElementById("");
    divAguardar.style.display = "flex";
}

function finalizarLoading(texto) {
    var divAguardar = document.getElementById("");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}