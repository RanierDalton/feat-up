function construirNavbarAdmin() {
    return `
    <header>
            <div class="conteudo">
                <div class="titulo">
                    <span>FEAT UP</span>
                </div>
                <nav>
                    <ul class="navbar">
                        <li><a href="#" class="ativo">Dashboard</a></li>
                    </ul>
                </nav>
                <div class="profile">
                    <button onclick="abrirPerfil()">
                        <img id="fotoPerfil" src="../static/assets/default.png" alt="">
                    </button>
                    <div id="dropdownPerfil" class="dropdown-content">
                        <a href="#" onclick="limparSessao()"  class="sair">Sair</a>
                    </div>
                </div>
            </div>
        </header>
    `;
}