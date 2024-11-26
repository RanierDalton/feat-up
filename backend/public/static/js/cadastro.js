const opcoesGenero = fetch('/generos')
.then( (resposta) => {
    return resposta.json();   
});

const opcoesRede = fetch('/redes')
.then((resposta) => {
    return resposta.json();
});

let optionsGeneros = ``;
let optionsRedes = ``;
let templateInputGeneros;
let templateInputRedes;

opcoesGenero.then((data) => {
    let options = `<option value="" disabled selected selected>Selecione um dos Gêneros</option>`;
    data.forEach((genero) => options +=`<option value="${genero.id}">${genero.nome}</option>`);
    optionsGeneros = options;
});

opcoesRede.then((data) => {
    let options = `<option value="" disabled selected selected>Selecione uma redes sociais</option>`;
    data.forEach((rede) => options +=`<option value="${rede.id}">${rede.nome}</option>`);
    optionsRedes = options;
});

function carregarGeneros(){
    if(optionsGeneros == ""){
        window.setTimeout(carregarGeneros, 100);
    } else{
        slctGenero.innerHTML = optionsGeneros;
        templateInputGeneros = slctGenero;
    }
}

function carregarRedes(){
    if(optionsRedes == ""){
        window.setTimeout(carregarRedes, 100);
    } else{
        iptRede.innerHTML = optionsRedes;
        templateInputRedes = iptRede;
    }
}

carregarGeneros();
carregarRedes();

let informacoesCadastro = {
    nome: '',
    apelido: '',
    email: '',
    descricao:'',
    redes: [],
    generos: [],
    aplicativo: '',
    pontoForte: '',
    senha: ''
};

const CARACTERES_ESPECIAIS = /[^A-Za-z0-9]/;

let contadorIptRedes = 1;
let contadorIptGeneros = 1;

let telAtual = 1;

let nome = '';
let apelido = '';
let email = '';
let descricao = '';

let generos =  [];
let redesSociais = [];
let aplicativo = '';
let pontoForte = '';

let senha = '';
let confirmar = '';

const divForm = document.getElementById("forms");

function mudarPagina(numeroPagina, content){
    if(verificarInputs(telAtual)){
        if(numeroPagina == 1){
            content.style.display = 'none';
            inicial.style.display = 'flex';
        } else if(numeroPagina == 2){
            content.style.display = 'none';
            meio.style.display = 'flex';
        } else if(numeroPagina == 3){
            content.style.display = 'none';
            final.style.display = 'flex';
        }
    
        telAtual = numeroPagina; 
    }
}

function assimilarRedes(){
    let redes = document.getElementsByName('redesSociais');
    if(informacoesCadastro.redes.length > 1){
        for(let i=0; i<(informacoesCadastro.redes.length-1);i++){
            adicionarRede();
        }
    }
    
    let contadorListaDados = 0;
    
    for(let i=1; i <= redes.length; i++){
        if(i % 2 == 0){
            redes[i-2].value = informacoesCadastro.redes[contadorListaDados].idRede;
            redes[i-1].value = informacoesCadastro.redes[contadorListaDados].user;
            contadorListaDados++;
        }
    }
}

function assimilarGeneros(){
    let generos = document.getElementsByName('iptGeneros');
   
    if(informacoesCadastro.generos.length > 1){
        for(let i=0; i<(informacoesCadastro.generos.length-1);i++){
            adicionarGenero();
        }
    }

    console.log(generos);
    console.log(informacoesCadastro.generos);
    
    for(let i=0; i < generos.length; i++){
        generos[i].value = informacoesCadastro.generos[i];
    }
}

// VALIDAÇÕES 
function verificarInputs(numeroPagina){
    if(numeroPagina==1){
        nome = document.getElementById('iptNome').value;
        apelido = document.getElementById('iptApelido').value;
        email = document.getElementById('iptEmail').value;
        descricao = document.getElementById('iptDescricao').value;

        nome = nome.trim();
        apelido = apelido.trim();
        email = email.trim();
        descricao = descricao.trim();

        if(!validarNome(nome)){
            return false;
        }
        
        if(apelido == ""){
            errorModal("Por favor, preencha o valor do apelido");
            return false;
        }

        if(!validarEmail(email)){
            return false;
        }

        if(descricao == ""){
            errorModal("Por favor, preencha o campo descrição");
            return false;
        }

        informacoesCadastro.nome = nome;
        informacoesCadastro.apelido = apelido;
        informacoesCadastro.email = email;
        informacoesCadastro.descricao = descricao;

    } else if(numeroPagina==2){
        aplicativo = document.getElementById('iptAplicativo').value;
        pontoForte = document.getElementById('iptPontoForte').value;

        aplicativo = aplicativo.trim();
        pontoForte = pontoForte.trim();

        if(!validarRedes('redesSociais')){
            console.log('Entrei no 1º');
            errorModal("Por favor, preencha os campos das redes sociais");
            return false;
        }

        if(!validarGeneros('iptGeneros')){
            errorModal("Por favor, preencha os campos dos Generos");
            return false;
        }

        if(aplicativo == ""){
            errorModal("Por favor, preencha o campo de aplicativo");
            return false;
        }

        if(pontoForte == ""){
            errorModal("Por favor, preencha o campo de ponto forte");
            return false;
        }

        informacoesCadastro.aplicativo = aplicativo;
        informacoesCadastro.pontoForte = pontoForte;

    } else if(numeroPagina==3){
        senha = document.getElementById('iptSenha').value;
        confirmar = document.getElementById('iptConfirmar').value;

        senha = senha.trim();
        confirmar = confirmar.trim();

        if(!validarSenha(iptSenha)){
            errorModal("O valor de ambas as senhas não batem");
            return false;
        }

        if(senha != confirmar){
            errorModal("O valor de ambas as senhas não batem");
            return false;
        }

        if(!iptConfirmarTermos.checked){
            errorModal("Concorde com nossos termos e licenças para se cadastrar");
            return false;
        }

        informacoesCadastro.senha = senha;
    }

    return true;
}

function validarNome(nome){
    nome = nome.split(" ");
    if(nome.length < 2 || nome == ''){
        errorModal("Valor do nome inválido");
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
        errorModal("Valor do email inválido");
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
            valor.idRede = Number(redes[i-1].value);
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

        valoresInputs.push(Number(generos[i].value));
    }

    informacoesCadastro.generos = valoresInputs;

    return true;
}

// FUNCIONALIDADES DE ADD E REMOVER INPUTS
function adicionarRede(){
    let redes = document.getElementsByName('redesSociais');
    let valoresInputs = [];

    redes.forEach((ipt) => {
        valoresInputs.push(ipt.value);
    });

    console.log(valoresInputs);

    const inputRede = `<div class="inputs-class">`+templateInputRedes.outerHTML+`
                        <div class="ipt-rede">
                            <input name="redesSociais" type="url" placeholder="Informe o user da mesma">
                            <button class="toggle-password" onclick="removerRede(${contadorIptRedes})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
    `;

    if(contadorIptRedes >= 5){
        return errorModal("Não é possível inserir mais de 5 redes sociais");
    }
    
    divRede.innerHTML += inputRede;
    contadorIptRedes++;

    for(let i=0; i<valoresInputs.length;i++){
        redes[i].value = valoresInputs[i];
    }
}

function removerRede(indexInput){
    let inputsRedes = document.getElementsByClassName('inputs-class');
    contadorIptRedes--;
    inputsRedes[indexInput].remove();
}

function adicionarGenero(){
    let generos = document.getElementsByName('iptGeneros');
    let valoresInputs = [];

    generos.forEach((ipt) => {
        valoresInputs.push(ipt.value);
    });

    const inputGeneros = `
    <div class="input-genero">
        ${templateInputGeneros.outerHTML}
        <button class="toggle-password" onclick="removerGenero(${contadorIptRedes})">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
    `;

    if(contadorIptGeneros >= 7){
        return errorModal("Não é possível inserir mais de 7 gêneros");
    }

    divGenero.innerHTML += inputGeneros;
    contadorIptGeneros++;
    
    for(let i=0; i<valoresInputs.length;i++){
        generos[i].value = valoresInputs[i];
    }
}

function removerGenero(indexInput){
    let inputsGeneros = document.getElementsByClassName('input-genero');

    inputsGeneros[indexInput].remove();
}

function cadastrar(){
    loading();
    if(verificarInputs(telAtual)){
        postCadastro();
    }
    finalizarLoading();
}

async function postCadastro(){
    fetch("/produtor/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(informacoesCadastro),
    })
    .then((resposta) => {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        successModal("Cadastrou efetuado com sucesso! Redirecionando para o Login...");
        
        setTimeout(() => {
            location.href = '../../site-institucional/login.html';
          }, 4000);
               
      } else {
        console.log(resposta.body.message);
        finalizarLoading();
      }
    })
    .catch((resposta) => {
      errorModal(`Erro ao efetuar o cadastro, tente novamente mais tarde!`);
      finalizarLoading();
    });
}