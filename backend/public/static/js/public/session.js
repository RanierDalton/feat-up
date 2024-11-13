function validarSessao() {
    var alias = sessionStorage.APELIDO_USUARIO;
    var email = sessionStorage.EMAIL_USUARIO;

    if (alias == null || email == null) {
        sessionStorage.clear();
        window.location = "../login.html";
    }
}

function validarSessaoAdmin(){
    var alias = sessionStorage.APELIDO_USUARIO;
    var email = sessionStorage.EMAIL_USUARIO;

    if (alias != "admin" || email != "admin@email.com") {
        sessionStorage.clear();
        window.location = "../../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../../login.html";
}
