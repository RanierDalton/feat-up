let isVisivel = false;
let inputApelido = document.getElementById('iptApelido');
let inputSenha = document.getElementById('iptSenha');
let modal = document.getElementById('popUp');

function entrar(){
    let apelido = inputApelido.value;
    let senha = inputSenha.value;

    if(apelido == '' || senha == ''){
        return modal.showModal();
    }

    let credenciais = {
        alias:apelido,
        senha:senha
    }

    console.log(credenciais);

    fetch("/auth/produtor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credenciais)
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                // TODO - GUARDAR TODAS AS INFORMAÇÕES DO USER NO SESSION
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.APELIDO_USUARIO = json.alias;
                sessionStorage.ID_USUARIO = json.id;

                if(sessionStorage.APELIDO_USUARIO  == "admin"){
                    window.location = "../../featup/dashboard.html";
                }

                window.location = "../../featup/achar_feats.html";
                
            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

