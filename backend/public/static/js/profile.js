function carregarPerfil(){
    fetch(`/produtores/perfil/${sessionStorage.ID_PRODUTOR_PERFIL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    })
    .then((resposta) => {
        resposta.json()
        .then((data)=>{
            organizarInformacoes(data);
        });
    })
    .catch((resposta) => {
        console.log(`#ERRO: ${resposta}`);
    });
}

function organizarInformacoes(data){
    title.innerText = `${data.alias} | Perfil`;
    imgPerfil.src = `${data.pathFoto}`;
    alias.innerText = `${data.alias}`;
    perfil.innerText = `${data.descricao}`;
    pontoForte.innerText = `${data.pontoForte}`;
    appUtiliza.innerText = `${data.aplicativo}`;
    divGeneros.innerHTML = organizarGeneros(data.generos);
    divRedes.innerHTML = organizarRedes(data.redes);
}

function organizarRedes(redes){
    let html = '';

    redes.forEach(rede => {
        html += `
        <a href="${rede.url+rede.user}">
            <div class="rede-social">
                <i class="fa-brands ${rede.class}"></i>
                <span>${rede.user}</span>
            </div>
        </a>
        `;
    });

    return html;
}

function organizarGeneros(generos){
    let html = '';

    generos.forEach(genero => {
        html += `
        <div class="genero-perfil">
            <div class="caixa-item">
                <span>${genero}</span>
            </div>
        </div>
        `;
    });

    return html;
}

