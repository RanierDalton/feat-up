let isVisivel = false;
let inputApelido = document.getElementById('iptSenha');
let inputSenha = document.getElementById('iptSenha');
let modal = document.getElementById('popUp');

function mudarVisibilidade(){
    if(isVisivel){
        isVisivel = false;
        inputSenha.type = 'password';
        iconSenha.classList.remove('fa-eye-slash');
        iconSenha.classList.add('fa-eye');
    } else{
        isVisivel = true;
        inputSenha.type = 'text';
        iconSenha.classList.remove('fa-eye');
        iconSenha.classList.add('fa-eye-slash'); 
    }
}

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
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.APELIDO_USUARIO = json.alias;
                sessionStorage.ID_USUARIO = json.id;
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

