function carregarProdutoresAchar(){
    fetch(`/produtores/achar/${sessionStorage.ID_USUARIO}`, {
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
    /*
    <div class="linha three-boxes">
        <div class="box">
            <div class="cabecalho-box">
                <img src="../static/assets/profiles/sonotws.jpg" alt="">
                <span>Sono TWS</span>
            </div>
            <div class="corpo-box">
                <span><b>Pontos Fortes: </b>Instrumental</span>
                <span><b>Aplicativo: </b>Ableton</span>
                <span><b>Gêneros: </b>Hip Hop, Boombap</span>
            </div>
            <div class="acoes-box">
                <button onclick="convidar()">Convidar</button>
            </div>
        i
        <div class="box">
            <div class="cabecalho-box">
                <isrc="../static/assets/profiles/sonotws.jpg" alt="">
                <span>Sono TWS</span>
            </div>
            <div class="corpo-box">
                <span><b>Pontos Fortes: </b>Instrumental</span>
                <span><b>Aplicativo: </b>Ableton</span>
                <span><b>Gêneros: </b>Hip Hop, Boombap</span>
            </div>
            <div class="acoes-box">
                <button onclick="convidar()">Convidar</button>
            </div>
        i
        <div class="box">
            <div class="cabecalho-box">
                <img src="../static/assets/profiles/sonotws.jpg" alt="">
                <span>Sono TWS</span>
            </div>
            <div class="corpo-box">
                <span><b>Pontos Fortes: </b>Instrumental</span>
                <span><b>Aplicativo: </b>Ableton</span>
                <span><b>Gêneros: </b>Hip Hop, Boombap</span>
            </div>
            <div class="acoes-box">
                <button onclick="convidar()">Convidar</button>
            </div>
        </div>
    </div>
    */

    let qtdLinhas = Math.floor(data.length / 3);
    let contadorLinhas = 0;
    let contadorCards = 0;
    let divProdutores = document.getElementById("produtores");
    let linhaAtual;
    for(let i=1; i<=data.length;i++){
        if(contadorCards == 0 && contadorLinhas <= qtdLinhas){
            linhaAtual = document.createElement("div");
            linhaAtual.classList.add("linha");
            linhaAtual.classList.add("three-boxes");
        }

        let caixa = `
            <div class="box">
                <div class="cabecalho-box">
                    <img src="../static/assets/profiles/default.png" alt="Foto de perfil do Produtor">
                    <span>${data[i-1].alias}</span>
                </div>
                <div class="corpo-box">
                    <span><b>Ponto Forte: </b>${data[i-1].pontoForte}</span>
                    <span><b>Aplicativo: </b>${data[i-1].aplicativo}</span>
                    <span><b>Gêneros: </b>${data[i-1].genero}</span>
                </div>
                <div class="acoes-box">
                    <button onclick="convidarProdutor(${data[i-1].idProdutor})">Convidar</button>
                </div>
            </div>
        `;

        linhaAtual.innerHTML += caixa;
        contadorCards++;

        if(contadorCards == 3){
            contadorCards = 0;
            contadorLinhas++;
            divProdutores.appendChild(linhaAtual);
        }
    }
}

function convidarProdutor(idAceita){
    // TODO
}