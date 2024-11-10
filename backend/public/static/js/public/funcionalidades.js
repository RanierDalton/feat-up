function carregarProdutoresAchar(){
    fetch("/produtores/achar").then((resposta) => {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then((resposta) => {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("feed_container");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    // TODO Coletar os dados
                    // construir estrutura HTML dos cards
                    // Colocar os dados na esturtura HTML 
                    // Inserir na página
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function carregarProdutoresConvite(){
    fetch("/produtores/convites").then((resposta) => {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then((resposta) => {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("feed_container");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    // TODO Coletar os dados
                    // construir estrutura HTML dos cards
                    // Colocar os dados na esturtura HTML 
                    // Inserir na página
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function carregarProdutoresFeats(){
    fetch("/produtores/feats").then((resposta) => {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then((resposta) => {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("feed_container");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    // TODO Coletar os dados
                    // construir estrutura HTML dos cards
                    // Colocar os dados na esturtura HTML 
                    // Inserir na página
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta)
    });
}