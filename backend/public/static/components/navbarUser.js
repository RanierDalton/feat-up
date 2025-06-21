function construirNavbar(indexSelecionado){
    const navbar = document.getElementsByClassName("cabecalho")[0];
    navbar.innerHTML = `
    <header>
        <div class="conteudo">
            <div class="titulo">
                <span>FEAT UP</span>
            </div>
            <nav>
                <ul class="navbar">
                    <li><a href="./feed.html" ${indexSelecionado == 0 ? "class='ativo'":""}>Feed</a></li>
                    <li><a href="./achar_feats.html" ${indexSelecionado == 1 ? "class='ativo'":""}>Achar Feats</a></li>
                    <li><a href="./convites.html" ${indexSelecionado == 2 ? "class='ativo'":""}>Convites</a></li>
                    <li><a href="./feat_ups.html" ${indexSelecionado == 3 ? "class='ativo'":""}>Feats Ups</a></li>
                    <li><a href="./chat.html" ${indexSelecionado == 4 ? "class='ativo'":""}>Chat</a></li>
                </ul>
            </nav>
            <div class="profile">
                <button onclick="abrirPerfil()">
                    <img id="fotoPerfil" src=${sessionStorage.PATH_FOTO == undefined ? "../static/assets/default.png" : sessionStorage.PATH_FOTO} alt="Imagem de perfil do seu usuário">
                </button>
                <div id="dropdownPerfil" class="dropdown-content">
                    <a href="./self_perfil.html">Ver Perfil</a>
                    <a href="#" onclick="limparSessao()" class="sair">Sair</a>
                </div>
            </div>
        </div>
    </header>`
}   