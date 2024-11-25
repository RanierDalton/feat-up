function carregarProdutoresConvite(){
    loading();
    document.getElementById("fotoPerfil").src = sessionStorage.PATH_FOTO;
    fetch(`/produtores/convites/${sessionStorage.ID_USUARIO}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    })
    .then((resposta) => {
        resposta.json()
        .then((data)=>{
            
            organizarCards(data);
        });
    })
    .catch((resposta) => {
        console.log(`#ERRO: ${resposta}`);
    });
}

function organizarCards(data){
    let qtdLinhas = Math.floor(data.length / 3);
    let cardsSobrar = data.length - (qtdLinhas * 3);
    let contadorLinhas = 0;
    let contadorCards = 0;
    let divProdutores = document.getElementById("produtores");
    let linhaAtual;

    for(let i=1; i<=data.length;i++){
        if(contadorCards == 0 && contadorLinhas < qtdLinhas){
            linhaAtual = document.createElement("div");
            linhaAtual.classList.add("linha");
            linhaAtual.classList.add("three-boxes");
        }  else if(contadorCards == 0 && contadorLinhas == qtdLinhas){
            linhaAtual = document.createElement("div");
            linhaAtual.classList.add("linha");
            if(cardsSobrar == 2){
                linhaAtual.classList.add("two-boxes");
            }
        }

        let caixa = `
            <div class="box">
                <div class="cabecalho-box">
                    <img src="${data[i-1].foto}" alt="Foto de perfil do Produtor">
                    <span>${data[i-1].alias}</span>
                </div>
                <div class="corpo-box">
                    <span><b>Ponto Forte: </b>${data[i-1].pontoForte}</span>
                    <span><b>Aplicativo: </b>${data[i-1].aplicativo}</span>
                    <span><b>Gêneros: </b>${data[i-1].genero}</span>
                </div>
                <div class="acoes-box convite">
                    <button onclick="atualizarStatusFeat(${data[i-1].idProdutor}, 2)">Recusar</button>
                    <button onclick="atualizarStatusFeat(${data[i-1].idProdutor}, 1)">Aceitar</button>
                </div>
            </div>
        `;

        linhaAtual.innerHTML += caixa;
        contadorCards++;

        if(contadorCards == 3 || (contadorCards == cardsSobrar && contadorLinhas == qtdLinhas)){
            contadorCards = 0;
            contadorLinhas++;
            divProdutores.appendChild(linhaAtual);
        }
    }

    finalizarLoading();
}

function atualizarStatusFeat(idSolicita, status){
    fetch(`/produtores/feat/atualizar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({idSolicita: idSolicita, idAceita: sessionStorage.ID_USUARIO, status: status})
    })
    .then((resposta) => {
        resposta.json()
        .then((data)=>{
            console.log(data);
            location.replace(location.href);
        });
    })
    .catch((resposta) => {
        console.log(`#ERRO: ${resposta}`);
    });
}