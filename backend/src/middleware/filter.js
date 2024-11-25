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
    let resposta = "g.nome IN (";

    for(let i=0; i<generos.length; i++){
        resposta += `'${generos[i].nome}'${i != generos.length-1? ',': ')'} `;
    }

    return resposta;
};

const filtrarGenerosCard = (dados) => {
    let produtores = [];
    console.log(dados);
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
                foto: dados[i].foto,
                genero: [dados[i].genero]
            };

            produtores.push(produtorAtual);
        } else {
            let generosProdutor = produtores[indexProdutor].genero;
            if(!generosProdutor.includes(dados[i].genero)){
                generosProdutor.push(dados[i].genero);
            } 
        }       
    }  
    
    return produtores;
};

const filtrarPerfilInfo = (data)=> {
    console.log(data);
    let info = {
        alias: data[0].alias,
        aplicativo: data[0].aplicativo,
        pontoForte: data[0].pontoForte,
        descricao: data[0].descricao,
        pathFoto: data[0].pathFoto,
        generos:[],
        redes:[]
    };

    for(let i=0; i<data.length;i++){
        if(!info.generos.includes(data[i].genero)){
            info.generos.push(data[i].genero);
        }
        
        if(info.redes.findIndex(rede => rede.url == data[i].url) == -1){
            info.redes.push({url:data[i].url, class:data[i].class, user:data[i].user});
        }
    }  
    
    return info;
};

module.exports = {filtrarPodio, filtrarGenerosProdutor,filtrarGenerosCard,filtrarPerfilInfo};