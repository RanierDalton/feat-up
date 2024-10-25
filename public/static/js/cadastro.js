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
                            <label for="iptGenero">Gêneros Produzidos:</label>
                            <a href="#" onclick="adicionarGenero()"><span>Adicionar</span></a>
                        </div>
                        <select id="slctGenero" name="slctGeneros">
                            <option value="">Selecione uma opção</option>
                        </select>
                    </div>
                    <div class="campo margin-top" >
                        <label for="iptAplicativo">Aplicativo que Utiliza:</label>
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
    final:`
            <div class="campos-input">
                <div class="campo senha">
                    <label for="iptSenha">Senha:</label>
                    <div class="ipt-senha">
                        <input type="password" id="iptSenha" placeholder="Informe sua senha" oninput="validarSenha()">
                        <button class="toggle-password" onclick="mudarVisibilidade(1)">
                            <i id="iconSenha" class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                    <div class="verificacoesSenha">

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
            </div>
            </div>
            </div>
            <footer class="margin-bottom">
                <div class="botao margin-top">
                    <br>
                    <button onclick="cadastrar()">Cadastrar</button>
                </div>
                <div class="nav margin-top">
                    <a href="#" onclick="mudarPagina(2)"><span><i class="fa-solid fa-arrow-left"></i>Anterior</span></a>
                </div>
            </footer><br>`
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
        // coletar os inputs e fzr validações
    } else if(numeroPagina==2){
        // coletar os inputs e fzr validações
    } else if(numeroPagina==3){
        // coletar os inputs e fzr validações
    }

    return true;
}

function cadastrar(){
    
}

loadContent();