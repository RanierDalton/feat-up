function validarSessao() {
    let alias = sessionStorage.APELIDO_USUARIO;
    let id = sessionStorage.ID_USUARIO;

    if ((alias == null || alias == undefined) || (id == null || id == undefined)) {
        sessionStorage.clear();
        window.location = "../site-institucional/login.html";
    }
}

function validarSessaoAdmin(){
    let alias = sessionStorage.APELIDO_USUARIO;

    if (alias != "admin") {
        sessionStorage.clear();
        window.location = "../site-institucional/login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../site-institucional/login.html";
}
