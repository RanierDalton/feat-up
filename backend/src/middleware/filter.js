const filtrarGenerosRecorrentes = (dados) => {
    let resposta = [];

    

    let i = 0;
    let contador = 0;
    dados.forEach((genero) => {
        if(i < 3){
            resposta.push(genero);
        } else {
            contador += genero.resultado;
        }
        i++;
    });

    const objOutros = {genero: 'Outros', resultado: contador};

    resposta.push(objOutros);

    return resposta;
}

module.exports = {filtrarGenerosRecorrentes};