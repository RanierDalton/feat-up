const CARACTERES_ESPECIAIS = /[^A-Za-z0-9]/;
const validarCadastro = (nome, email, apelido, descricao, redes, generos, aplicativo, pontoForte, senha) => {
    if(!validarNome(nome)){
        return {message:"Por favor, preencha corretmanete o campo de nome.", status:false};
    }

    if(!validarEmail(email)){
        return {message:"Por favor, preencha corretmanete o campo de email.", status:false};
    }

    if(apelido == "" || apelido == undefined){
        return {message:"Por favor, preencha corretamente o campo apelido.", status:false};
    }

    if(descricao == "" || descricao == undefined){
        return {message:"Por favor, preencha corretamente o campo descrição", status:false};
    }

    if(!validarRedes(redes)){
        return {message:"Por favor, preencha corretamente os campos das redes sociais", status:false};
    }

    if(!validarGeneros(generos)){
        return {message:"Por favor, preencha corretamente os campos dos gêneros", status:false};
    }

    if(aplicativo == "" || aplicativo == undefined){
        return {message:"Por favor, preencha corretamente o campo do aplicativo", status:false};
    }

    if(pontoForte == "" || pontoForte == undefined){
        return {message:"Por favor, preencha corretamente o campo do ponto forte", status:false};
    }

    if(!validarSenha(senha)){
        return {message:"Por favor, preencha corretamente o campo da senha", status:false};
    }

    return {message: "OK", status: true};
}


function validarNome(nome){
    nome = nome.split(" ");
    if(nome.length < 2 || nome == '' || nome == undefined){
        return false
    }

    return true;
}

function validarEmail(email){
    console.log(email);
    var tamEmail = email.length;
    var isEnd = email.endsWith('.com') || email.endsWith('.br') || email.endsWith('.gov');
    var indiceEnd = email.indexOf('.com') || email.indexOf('.br') || email.indexOf('.gov') ;
    var indiceArroba = email.indexOf('@'); 
    var isArroba = email.includes('@') && indiceArroba < indiceEnd;

    console.log(isArroba);
    console.log(tamEmail);
    console.log(isEnd);

    if((tamEmail < 8 || tamEmail > 45) && !isEnd && !isArroba || email == ''){
        return false;
    }

    return true;
}

function validarSenha(senha){
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

        if(typeof Number(senha[i]) === 'number'){
            isNum = true;
        }
    }

    if(tamSenha < 8 || !isMinuscula || !isMaiuscula || !isEspecial || !isNum || senha == ''){
        return false;
    }

    return true
}

function validarRedes(redes){
    for(let i=0; i<redes.length; i++){
        if(redes[i].value == ""){
            return false; 
        }
    }

    return true;
}

function validarGeneros(generos){


    for(let i=0; i<generos.length; i++){
        if(generos[i].value == ""){
            return false; 
        }
    }

    return true;
}

module.exports = {
    validarCadastro
};