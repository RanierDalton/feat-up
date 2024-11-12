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

module.exports = {filtrarPodio};