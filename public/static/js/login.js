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
        senha:sneha
    }
}