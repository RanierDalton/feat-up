function carregarProdutoresConvite(){
    fetch("/produtor/convite", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:sessionStorage.ID_USUARIO})
    })
    .then(function (resposta) {
        organizarCards(resposta);
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function organizarCards(data){
    console.log(data);
    // TODO
}

function atualizarStatus(idAceita){
    // TODO
}