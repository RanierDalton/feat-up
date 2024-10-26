const opcoesGeneros = [
    {
        id: 1,
        nome: 'Trap'
    },
    {
        id: 2,
        nome: 'Eletrônica'
    }
];

const opcoesAplicativos = [
    {
        id: 1,
        nome: 'Pro Tools'
    },
    {
        id: 2,
        nome: 'FLStudio'
    }
];

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
}

const CARACTERES_ESPECIAIS = /[^A-Za-z0-9]/;

const socialMediaUrls = [
    { urlBase: "https://www.facebook.com/", nome: "Facebook" },
    { urlBase: "https://www.instagram.com/", nome: "Instagram" },
    { urlBase: "https://twitter.com/", nome: "Twitter" },
    { urlBase: "https://www.linkedin.com/in/", nome: "LinkedIn" },
    { urlBase: "https://www.youtube.com/c/", nome: "YouTube - Channel" },
    { urlBase: "https://www.youtube.com/@", nome: "YouTube - Username" },
    { urlBase: "https://www.tiktok.com/@", nome: "TikTok" },
    { urlBase: "https://soundcloud.com/", nome: "SoundCloud" },
    { urlBase: "https://open.spotify.com/artist/", nome: "Spotify Artist" },
    { urlBase: "https://.bandcamp.com", nome: "Bandcamp" },
    { urlBase: "https://www.pinterest.com/", nome: "Pinterest" },
    { urlBase: "https://github.com/", nome: "GitHub" },
    { urlBase: "https://vimeo.com/", nome: "Vimeo" }
];

function carregarGeneros(){
    // let opcoesGeneros = buscarGeneros();
    let opcoes = '';
    opcoesGeneros.forEach((genero) => {
        opcoes+=`<option value="${genero.id}">${genero.nome}</option>`;
    });

    return opcoes;
}

function carregarAplicativos(){
    // let opcoesGeneros = buscarGeneros();
    let opcoes = '';
    opcoesAplicativos.forEach((app) => {
        opcoes+=`<option value="${app.id}">${app.nome}</option>`;
    });

    return opcoes;
}

const inputRede = `<input name="redesSociais" type="url" placeholder="Link da Rede">`;
const inputGeneros = `<select id="slctGenero" name="iptGeneros">
                            <option value="">Selecione uma opção</option>
                            ${carregarGeneros()}
                        </select>`;
const telas = {
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
                            <label for="">Redes Sociais:</label>
                            <a href="#" onclick="adicionarRede()"><span>Adicionar</span></a>
                        </div>
                        <input name="redesSociais" type="url" placeholder="Link da Rede">
                    </div>
                    <div class="campo margin-top" id="divGenero">
                        <div class="add-top">
                            <label for="slctGenero">Gêneros Produzidos:</label>
                            <a href="#" onclick="adicionarGenero()"><span>Adicionar</span></a>
                        </div>
                        <select id="slctGenero" name="iptGeneros">
                            <option value="">Selecione uma opção</option>
                            ${carregarGeneros()}
                        </select>
                    </div>
                    <div class="campo margin-top" >
                        <label for="iptAplicativo">Aplicativo que utiliza:</label>
                        <select id="iptAplicativo">
                            <option value="">Selecione uma opção</option>
                            ${carregarAplicativos()}
                        </select>
                    </div>
                    <div class="campo margin-top" >
                        <label for="iptPontoForte">Qual o seu ponto forte:</label>
                        <select id="iptPontoForte">
                            <option value="">Selecione uma opção</option>
                            <option value="1">Instrumental</option>
                            <option value="2">Beat</option>
                            <option value="3">Mix</option>
                            <option value="4">Master</option>
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
}

let telAtual = 1;

let nome = '';
let apelido = '';
let email = '';
let descricao = '';

let generos =  '';
let redesSociais = '';
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
    if(verificarInputs(numeroPaginaAnterior)){
        telAtual = numeroPagina;
        loadContent();
        if(isVoltar && numeroPagina == 1){
            iptNome.value = nome;
            iptApelido.value = apelido;
            iptEmail.value = email;
            iptDescricao.value = descricao;
        } else if(isVoltar && numeroPagina == 2){
            // TODO
            // Inserir os valores em todos os inputs de redes sociais
            // Inserir os valores em todos os inputs de generos
            // Inserir o valor do aplicativo
            // Inserir ponto forte
        }
    }   
    telAtual = numeroPagina; 
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
        aplicativo = iptAplicativo.value;
        pontoForte = iptPontoForte.value;

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
        }

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

function validarRedes(classe){
    let redes = document.getElementsByName(classe);
    let valoresInputs = [];

    for(let i=0; i<redes.length; i++){
        let urlBase = socialMediaUrls[i].urlBase;
        let patterns = urlBase.split(redes[i].value);

        if(redes[i].value == "" || redes[i].value.length < 10 || patterns[0] != urlBase){
            return false; 
        }

        valoresInputs.push(redes[i].value);
    }

    informacoesCadastro.redes = valoresInputs;
    return true;
}

function validarGeneros(classe){
    let generos = document.getElementsByName(classe);
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

let contadorIptRedes = 1;
let contadorIptGeneros = 1;

function adicionarRede(){
    let redes = document.getElementsByName('redesSociais');
    let valoresInputs = [];

    redes.forEach((ipt) => {
        valoresInputs.push(ipt.value);
    });

    divRede.innerHTML += inputRede;

    for(let i=0; i<valoresInputs.length;i++){
        redes[i].value = valoresInputs[i];
    }
}

function removerRede(){
    // TODO
}

function adicionarGenero(){
    let generos = document.getElementsByName('iptGeneros');
    let valoresInputs = [];

    generos.forEach((ipt) => {
        valoresInputs.push(ipt.value);
    });
    
    divGenero.innerHTML += inputGeneros;

    for(let i=0; i<valoresInputs.length;i++){
        generos[i].value = valoresInputs[i];
    }
}

function removerGenero(){
    // TODO
}

function cadastrar(){
    if(!verificarInputs(telAtual)){
        modal.showModal();
        msgError.innerText ="Erro ao cadastrar o usuário";
        return false;
    }
    modal.showModal();
    msgError.innerText ="Cadastrou legal";
    iconModal.classList.remove('fa-circle-exclamation');
    iconModal.style.color = 'green';
    iconModal.classList.add('fa-circle-check');
    // enviar pra API
    //fetch().then().then();
}

// Buscar infos no Backend
async function buscarGeneros(){
    // TODO
    await fetch().then().then();
}

loadContent();