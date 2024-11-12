const filtrarPodio = (dados) => {
    let resposta = [];

    let i = 0;
    let contador = 0;
    dados.forEach((item) => {
        if(i < 3){
            resposta.push(item);
        } else {
            contador += item.total;
        }
        i++;
    });

    const objOutros = {nome: 'Outros', total: contador};

    resposta.push(objOutros);

    return resposta;
};

const filtrarGenerosProdutor = (generos) => {
    let resposta = "";

    for(let i=0; i<generos.length; i++){
        resposta += `g.nome = '${generos[i].nome}' ${i != generos.length-1? 'OR ': ''} `;
    }

    return resposta;
};

const filtrarGenerosCard = (dados) => {
    let produtores = [];
    
    for(let i=0; i<dados.length;i++){
        let idProdutorAtual = dados[i].idProdutor;
        let indexProdutor = produtores.findIndex(produtor => produtor.idProdutor == idProdutorAtual);

        console.log()
        if(indexProdutor == -1){
            let produtorAtual = {
                idProdutor: dados[i].idProdutor,
                alias: dados[i].alias,
                aplicativo: dados[i].aplicativo,
                pontoForte: dados[i].pontoForte,
                genero: [dados[i].genero]
            };

            produtores.push(produtorAtual);
        } else {
            let generosProdutor = produtores[indexProdutor].genero;
            generosProdutor.push(dados[i].genero);
        }       
    }  
    
    return produtores;
};

module.exports = {filtrarPodio, filtrarGenerosProdutor,filtrarGenerosCard};