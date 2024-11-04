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
        return optionsGeneros;
    }
}

function carregarRedes(){
    if(optionsRedes == ""){
        window.setTimeout(carregarRedes, 100);
    } else{
        return optionsRedes;
    }
}


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
const modal = document.getElementById('popUp');

// CARREGAR E MUDAR CONTEÚDOS DAS PÁGINAS
async function loadContent(){
    if(telAtual==1){
        divForm.innerHTML = telas.inicial;
    } else if(telAtual==2){
        divForm.innerHTML = telas.meio;
    } else if(telAtual==3){
        divForm.innerHTML = telas.final;
    }
}

function mudarPagina(numeroPagina, isVoltar){
    var numeroPaginaAnterior = telAtual;
    if(isVoltar){
        telAtual = numeroPagina;
        loadContent();

        if(numeroPagina == 1){
            iptNome.value = informacoesCadastro.nome;
            iptApelido.value = informacoesCadastro.apelido;
            iptEmail.value = informacoesCadastro.email;
            iptDescricao.value = informacoesCadastro.descricao;
        } else if(numeroPagina == 2){
            assimilarRedes();
            assimilarGeneros();

            iptAplicativo.value = informacoesCadastro.aplicativo;
            iptPontoForte.value = informacoesCadastro.pontoForte;
        }

    } else if(verificarInputs(numeroPaginaAnterior)){
        telAtual = numeroPagina;
        loadContent();
    }   
    telAtual = numeroPagina; 
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
        nome = iptNome.value;
        apelido = iptApelido.value;
        email = iptEmail.value;
        descricao = iptDescricao.value;

        if(!validarNome(nome)){
            return false;
        }
        
        if(apelido == ""){
            modal.showModal();
            msgError.innerText ="Por favor, preencha o valor do apelido";
            return false;
        }

        if(!validarEmail(email)){
            return false;
        }

        if(descricao == ""){
            modal.showModal();
            msgError.innerText ="Por favor, preencha o campo descrição";
            return false;
        }

        informacoesCadastro.nome = nome;
        informacoesCadastro.apelido = apelido;
        informacoesCadastro.email = email;
        informacoesCadastro.descricao = descricao;

    } else if(numeroPagina==2){
        aplicativo = document.getElementById('iptAplicativo').value;
        pontoForte = document.getElementById('iptPontoForte').value;

        if(!validarRedes('redesSociais')){
            console.log('Entrei no 1º');
            modal.showModal();
            msgError.innerText ="Por favor, preencha os campos das redes sociais";
            return false;
        }

        if(!validarGeneros('iptGeneros')){
            modal.showModal();
            msgError.innerText ="Por favor, preencha os campos dos Generos";
            return false;
        }

        if(aplicativo == ""){
            modal.showModal();
            msgError.innerText ="Por favor, preencha o campo de aplicativo";
            return false;
        }async

        if(pontoForte == ""){
            modal.showModal();
            msgError.innerText ="Por favor, preencha o campo de ponto forte";
            return false;
        }

        informacoesCadastro.aplicativo = aplicativo;
        informacoesCadastro.pontoForte = pontoForte;

    } else if(numeroPagina==3){
        senha = iptSenha.value;
        confirmar = iptConfirmar.value;

        if(!validarSenha(iptSenha)){
            modal.showModal();
            msgError.innerText ="O valor de ambas as senhas não batem";
            return false;
        }

        if(senha != confirmar){
            modal.showModal();
            msgError.innerText ="O valor de ambas as senhas não batem";
            return false;
        }

        if(!iptConfirmarTermos.checked){
            modal.showModal();
            msgError.innerText ="Concorde com nossos termos e licenças para se cadastrar";
            return false;
        }

        informacoesCadastro.senha = senha;
    }

    return true;
}

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

// FUNCIONALIDADES DE ADD E REMOVER INPUTS
function adicionarRede(){
    let redes = document.getElementsByName('redesSociais');
    let valoresInputs = [];

    redes.forEach((ipt) => {
        valoresInputs.push(ipt.value);
    });

    console.log(valoresInputs);

    const inputRede = `<div class="inputs-class">
                        <select name="redesSociais" id="iptRede" class="scltRedes">
                            ${carregarRedes()}
                            
                        </select>
                        <div class="ipt-rede">
                            <input name="redesSociais" type="url" placeholder="Informe o user da mesma">
                            <button class="toggle-password" onclick="removerRede(${contadorIptRedes})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>`;
    
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
        <select id="slctGenero" name="iptGeneros">
            ${carregarGeneros()}
            
        </select>
        <button class="toggle-password" onclick="removerGenero(${contadorIptRedes})">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
    `;
    
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
    if(verificarInputs(telAtual)){
        postCadastro();
    }
}

async function postCadastro(){
    fetch("/produtor/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(informacoesCadastro),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
  
          if (resposta.ok) {
            modal.showModal();
            msgError.innerText ="Cadastrou legal";
            iconModal.classList.remove('fa-circle-exclamation');
            iconModal.style.color = 'green';
            iconModal.classList.add('fa-circle-check');

            location.href = '../../site-institucional/login.html';
            
          } else {
            // mostrar o erro
  
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
          
        });
}

let telas = {
    inicial: `
                <div class="campos-input">
                    <div class="campo margin-top" >
                        <label for="iptNome">Nome:</label>
                        <input id="iptNome" type="text" placeholder="Informe seu nome completo">
                    </div>
                    <div class="campo margin-top" >
                        <label for="iptApelido">Alias:</label>
                        <input id="iptApelido" type="text" placeholder="Informe seu apelido">
                    </div>
                    <div class="campo margin-top" >
                        <label for="iptEmail">Email:</label>
                        <input id="iptEmail" type="email" placeholder="Informe seu email">
                    </div>
                    <div class="campo margin-top" >
                        <label for="iptDescricao">Descrição:</label>
                        <textarea id="iptDescricao" cols="30" rows="10" placeholder="Fale um pouco sobre sua experiência na música"></textarea>
                    </div>
                </div>
            <footer>
                <div class="nav">
                    <span></span>
                    <a href="#" onclick="mudarPagina(2, false)"><span>Próxima<i class="fa-solid fa-arrow-right"></i></span></a>
                </div>
            </footer>`,
    meio:`
            <div class="campos-input">
                    <div class="campo margin-top" id="divRede">
                        <div class="add-top">
                            <label for="iptRede">Redes Sociais:</label>
                            <a href="#" onclick="adicionarRede(0)"><span>Adicionar</span></a>
                        </div>
                        <div class="inputs-class">
                            <select name="redesSociais" id="iptRede" class="scltRedes">
                                ${carregarRedes()}
                                
                            </select>
                            <input name="redesSociais" type="url" placeholder="Informe o user da mesma">
                        </div>
                    </div>
                    <div class="campo margin-top" id="divGenero">
                        <div class="add-top">
                            <label for="slctGenero">Gêneros Produzidos:</label>
                            <a href="#" onclick="adicionarGenero()"><span>Adicionar</span></a>
                        </div>
                        <div class="input-genero maximo">
                            <select id="slctGenero" name="iptGeneros">
                                ${carregarGeneros()}
                                
                            </select>
                        </div>
                    </div>
                    <div class="campo margin-top" >
                        <label for="iptAplicativo">Aplicativo que utiliza:</label>
                        <select id="iptAplicativo">
                            <option value="" disabled selected>Selecione uma opção</option>
                            <option value="Ableton Live">Ableton Live</option>
                            <option value="Acoustica Mixcraft">Acoustica Mixcraft</option>
                            <option value="Amplitube">Amplitube</option>
                            <option value="Audiotool">Audiotool</option>
                            <option value="BandLab">BandLab</option>
                            <option value="Bitwig Studio">Bitwig Studio</option>
                            <option value="Cakewalk">Cakewalk</option>
                            <option value="Cubase">Cubase</option>
                            <option value="FL Studio">FL Studio</option>
                            <option value="GarageBand">GarageBand</option>
                            <option value="Logic Pro">Logic Pro</option>
                            <option value="Magix Music Maker">Magix Music Maker</option>
                            <option value="PreSonus Studio One">PreSonus Studio One</option>
                            <option value="Pro Tools">Pro Tools</option>
                            <option value="Reason">Reason</option>
                        </select>
                    </div>
                    <div class="campo margin-top" >
                        <label for="iptPontoForte">Qual o seu ponto forte:</label>
                        <select id="iptPontoForte">
                            <option value="" disabled selected selected>Selecione uma opção</option>
                            <option value="Instrumental">Instrumental</option>
                            <option value="Beat">Beat</option>
                            <option value="Mix">Mix</option>
                            <option value="Master">Master</option>
                        </select>
                    </div>
                </div>
            <footer>
                <div class="nav">
                    <a href="#" onclick="mudarPagina(1, true)"><span><i class="fa-solid fa-arrow-left"></i>Anterior</span></a>
                    <a href="#" onclick="mudarPagina(3, false)"><span>Próxima<i class="fa-solid fa-arrow-right"></i></span></a>
                </div>
            </footer>`,
    final:`     <div class="campos-input">
                    <div class="campo senha">
                        <label for="iptSenha">Senha:</label>
                        <div class="ipt-senha">
                            <input type="password" id="iptSenha" placeholder="Informe sua senha" oninput="validarSenha(this)">
                            <button class="toggle-password" onclick="mudarVisibilidade(1)">
                                <i id="iconSenha" class="fa-solid fa-eye"></i>
                            </button>
                        </div>
                        <div class="verificacoesSenha margin-top">
                            <span id="caractere">8 caracteres Total</span>
                            <span id="minusculo">1 caractere Minúcula</span>
                            <span id="maiusculo">1 caractere Maiúscula</span>
                            <span id="numero">1 Número</span>
                            <span id="especial">1 Caractere Especial</span>
                        </div>
                    <div>
                    <div class="campo margin-top" >
                        <label for="iptConfirmar">Confirmar Senha:</label>
                        <div class="ipt-senha">
                            <input type="password" id="iptConfirmar" placeholder="Informe sua senha">
                            <button class="toggle-password" onclick="mudarVisibilidade(2)">
                                <i id="iconConfirmar" class="fa-solid fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div class="campo-confirmacao ">
                        <input id="iptConfirmarTermos" type="checkbox" />
                        <label for="iptConfirmarTermos">Li e concordo com os termos e condições do site</label>
                    </div>
                    </div>
                    </div>
                </div>
                <footer class="margin-bottom">
                    <div class="botao">
                        <button onclick="cadastrar()">Cadastrar</button>
                    </div>
                    <div class="nav margin-top">
                        <a href="#" onclick="mudarPagina(2, true)"><span><i class="fa-solid fa-arrow-left"></i>Anterior</span></a>
                    </div>
                </footer>`
};

loadContent();