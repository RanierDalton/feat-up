let isVisivel = false;

function mudarVisibilidade(number){
    if(isVisivel){
        isVisivel = false;
        if(number == 1){
            iptSenha.type = 'password';
            iconSenha.classList.remove('fa-eye-slash');
            iconSenha.classList.add('fa-eye');
        } else{
            iptConfirmar.type = 'password';
            iconConfirmar.classList.remove('fa-eye-slash');
            iconConfirmar.classList.add('fa-eye');
        }
    } else{
        isVisivel = true;
        if(number == 1){
            iptSenha.type = 'text';
            iconSenha.classList.remove('fa-eye');
            iconSenha.classList.add('fa-eye-slash');
        } else{
            iptConfirmar.type = 'text';
            iconConfirmar.classList.remove('fa-eye');
            iconConfirmar.classList.add('fa-eye-slash');
        } 
    }
}
