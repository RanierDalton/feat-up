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
                    <a href="#" onclick="mudarPagina(2)"><span>Próxima<i class="fa-solid fa-arrow-right"></i></span></a>
                </div>
            </footer>`,
    meio:`
            <div class="campos-input">
                    <div class="campo margin-top" >
                        <div class="add-top">
                            <label for="iptRedeSocial">Redes Sociais:</label>
                            <a href="#" onclick="adicionarRede()"><span>Adicionar</span></a>
                        </div>
                        <input id="iptRedeSocial" name="redesSociais" type="url" placeholder="Link da Rede">
                    </div>
                    <div class="campo margin-top" >
                        <div class="add-top">
                            <label for="slctGenero">Gêneros Produzidos:</label>
                            <a href="#" onclick="adicionarGenero()"><span>Adicionar</span></a>
                        </div>
                        <select id="slctGenero" name="iptGeneros">
                            <option value="">Selecione uma opção</option>
                        </select>
                    </div>
                    <div class="campo margin-top" >
                        <label for="iptAplicativo">Aplicativo que utiliza:</label>
                        <select id="iptAplicativo">
                            <option value="">Selecione uma opção</option>
                        </select>
                    </div>
                    <div class="campo margin-top" >
                        <label for="iptPontoForte">Qual o seu ponto forte:</label>
                        <select id="iptPontoForte">
                            <option value="">Selecione uma opção</option>
                        </select>
                    </div>
                </div>
            <footer>
                <div class="nav">
                    <a href="#" onclick="mudarPagina(1)"><span><i class="fa-solid fa-arrow-left"></i>Anterior</span></a>
                    <a href="#" onclick="mudarPagina(3)"><span>Próxima<i class="fa-solid fa-arrow-right"></i></span></a>
                </div>
            </footer>`,
    final:`     <div class="campos-input">
                    <div class="campo senha">
                        <label for="iptSenha">Senha:</label>
                        <div class="ipt-senha">
                            <input type="password" id="iptSenha" placeholder="Informe sua senha" oninput="validarSenha()">
                            <button class="toggle-password" onclick="mudarVisibilidade(1)">
                                <i id="iconSenha" class="fa-solid fa-eye"></i>
                            </button>
                        </div>
                        <div class="verificacoesSenha margin-top">
                            <span>8 caracteres Total</span>
                            <span>1 caractere Minúcula</span>
                            <span>1 caractere Maiúscula</span>
                            <span>1 Número</span>
                            <span>1 Caractere Especial</span>
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
                    <div class="campo-confirmacao">
                        <input id="iptConfirmarNotificacoes" type="checkbox" />
                        <label for="iptConfirmarNotificacoes">Aceito receber notificações por email</label>
                    </div>
                    </div>
                    </div>
                </div>
                <footer class="margin-bottom">
                    <div class="botao">
                        <button onclick="cadastrar()">Cadastrar</button>
                    </div>
                    <div class="nav margin-top">
                        <a href="#" onclick="mudarPagina(2)"><span><i class="fa-solid fa-arrow-left"></i>Anterior</span></a>
                    </div>
                </footer>`
}

let telAtual = 1;

const divForm = document.getElementById("forms");

function loadContent(){
    if(telAtual==1){
        divForm.innerHTML = telas.inicial;
    } else if(telAtual==2){
        divForm.innerHTML = telas.meio;
    } else if(telAtual==3){
        divForm.innerHTML = telas.final;
    }
}

function mudarPagina(numeroPagina){
    var numeroPaginaAnterior = telAtual;
    if(verificarInputs(numeroPaginaAnterior)){
        telAtual = numeroPagina;
        loadContent();
    }    
}

function verificarInputs(numeroPagina){
    if(numeroPagina==1){
        let nome = iptNome.value;
        let apelido = iptApelido.value;
        let email = iptEmail.value;
        let descricao = iptDescricao.value;

        if(!validarNome(nome)){

        }

        if(apelido == ""){

        }

        if(!validarEmail(email)){

        }

        if(descricao == ""){
            
        }

    } else if(numeroPagina==2){
        let generos =  iptPontoForte.value;
        let redesSociais = iptPontoForte.value;
        let aplicativo = iptPontoForte.value;
        let pontoForte = iptPontoForte.value;
        // coletar os inputs e fzr validações
    } else if(numeroPagina==3){

        // coletar os inputs e fzr validações
    }

    return true;
}

function validarNome(nome){
    nome = nome.split(" ");
    if(nome.length < 2){
        modalErro.showModal()
        span_erro.innerText ="Valor do nome inválido";
        return false;
    }

    return true;
}

function validarEmail(email){
    console.log(email)
    var tamEmail = email.length;
    var isEnd = email.endsWith('.com') || email.endsWith('.br') || email.endsWith('.gov');
    var indiceEnd = email.indexOf('.com') || email.indexOf('.br') || email.indexOf('.gov') ;
    var indiceArroba = email.indexOf('@'); 
    var isArroba = email.includes('@') && indiceArroba < indiceEnd;

    if((tamEmail < 8 || tamEmail > 45) && !isEnd && !isArroba || email == ''){
        modalErro.showModal()
        span_erro.innerText = "Insira um valor de email válido";
        return false;

    }

    return true;
}

function validarSenha(senha, confirmacao){
    var tamSenha = senha.length;
    var isEspecial = CARACTERES_ESPECIAIS.test(senha);

    var isMinuscula = false;
    var isMaiuscula = false;
    var isNum = false;        

    // pd usar um forEach ou find
    for(var i = 0; i < tamSenha; i++){
        if(senha[i] == senha[i].toUpperCase()){
            isMaiuscula = true;
        }

        if(senha[i] == senha[i].toLowerCase()){
            isMinuscula = true;
        }

        if(Number(parseFloat(senha[i])) == senha[i]){
            isNum = true;
        }
    }

    if(tamSenha < 8 || !isMinuscula || !isMaiuscula || !isEspecial || !isNum || senha == ''){
        modalErro.showModal()
        span_erro.innerText = "Insira uma senha válida";
        return false;
    }

    if(senha !== confirmacao){
        modalErro.showModal()
        span_erro.innerText = "As senhas não batem";
        return false;
    }

    return true;
}


function cadastrar(){

}

loadContent();