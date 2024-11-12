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
}

const filtrarGenerosProdutor = (generos) => {
    let resposta = "";

    for(let i=0; i<generos.length; i++){
        resposta += `g.nome = '${generos[i].nome}' ${i != generos.length-1? 'OR ': ''} `;
    }

    return resposta;
};

module.exports = {filtrarPodio, filtrarGenerosProdutor};