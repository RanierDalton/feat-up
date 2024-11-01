
function validarNome(nome){
    nome = nome.split(" ");
    if(nome.length < 2 || nome == ''){
        modal.showModal();
        msgError.innerText ="Valor do nome inválido";
        return false
    }

    return true;
}

function validarEmail(email){
    var tamEmail = email.length;
    var isEnd = email.endsWith('.com') || email.endsWith('.br') || email.endsWith('.gov');
    var indiceEnd = email.indexOf('.com') || email.indexOf('.br') || email.indexOf('.gov') ;
    var indiceArroba = email.indexOf('@'); 
    var isArroba = email.includes('@') && indiceArroba < indiceEnd;

    if((tamEmail < 8 || tamEmail > 45) && !isEnd && !isArroba || email == ''){
        modal.showModal();
        msgError.innerText ="Valor do email inválido";
        return false;
    }

    return true;
}

function validarSenha(ipt){
    caractere.style.color = 'red';
    minusculo.style.color = 'red';
    maiusculo.style.color = 'red';
    numero.style.color = 'red';
    especial.style.color = 'red';  

    var senha = ipt.value;
    var tamSenha = senha.length;
    var isEspecial = CARACTERES_ESPECIAIS.test(senha);

    var isMinuscula = false;
    var isMaiuscula = false;
    var isNum = false;        

    for(var i = 0; i < tamSenha; i++){
        if(senha[i] == senha[i].toUpperCase()){
            isMaiuscula = true;
        }

        if(senha[i] == senha[i].toLowerCase()){
            isMinuscula = true;
        }

        console.log(Number(parseFloat(senha[i])) == Number(senha[i]));

        if(typeof Number(senha[i]) === 'number'){
            isNum = true;
        }
    }

    if(tamSenha>= 8 && tamSenha <= 45){
        caractere.style.color = 'green';
    }

    if(isMaiuscula){
        maiusculo.style.color = 'green';
    }

    if(isMinuscula){
        minusculo.style.color = 'green';
    }

    if(isEspecial){
        especial.style.color = 'green';
    }

    if(isNum){
        numero.style.color = 'green';
    }

    if(tamSenha < 8 || !isMinuscula || !isMaiuscula || !isEspecial || !isNum || senha == ''){
        return false;
    }

    return true
}

function validarRedes(name){
    let redes = document.getElementsByName(name);
    let valoresInputs = [];

    console.log(redes);

    for(let i=0; i<redes.length; i++){
        if(redes[i].value == ""){
            return false; 
        }

        let valor = {
            idRede:'',
            user:''
        };

        if((i+1) % 2 == 0){
            valor.idRede = redes[i-1].value;
            valor.user = redes[i].value;
            valoresInputs.push(valor);
        }
        
    }
    
    informacoesCadastro.redes = valoresInputs;
    return true;
}

function validarGeneros(nome){
    let generos = document.getElementsByName(nome);
    let valoresInputs = [];

    for(let i=0; i<generos.length; i++){
        if(generos[i].value == ""){
            return false; 
        }

        valoresInputs.push(generos[i].value);
    }

    informacoesCadastro.generos = valoresInputs;

    return true;
}

module.exports = {

};