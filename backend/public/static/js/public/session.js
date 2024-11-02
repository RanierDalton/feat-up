function validarSessao() {
    var alias = sessionStorage.APELIDO_USUARIO;
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (alias != null && email != null && nome != null) {
        // TODO
    } else {
        window.location = "../login.html";
    }
}

function validarSessaoAdmin(){
    var alias = sessionStorage.APELIDO_USUARIO;
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (alias == "admin" && nome == "admin" && email == "admin@email.com") {
        // TODO
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}
