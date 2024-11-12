const produtorModel = require('../models/produtorModel');
const generoModel = require('../models/generoModel');

const getData = (req, res) => {
    let dados = {
        usuariosTotais: 0,
        usuariosAtivos: 0,
        featsTotais: 0,
        generosRecorrentes:{},
        statusFeats:{},
        appsRecorrentes:{},
    }

    produtorModel.getProdutoresTotais()
    .then((resultado) => {
        dados.usuariosTotais = resultado[0].total;

        produtorModel.getProdutoresAtivos()
        .then((resultado) => {
            dados.usuariosAtivos = resultado[0].total;
        })
        .catch((err) => res.status(500).json(err.sqlMessage))

        // TODO
        // COLETAR FEATS TOTAIS
    
        // COLETAR GENEROS MAIS USADOS 
            // FILTRAR OS TOP 3 GENEROS E SOMAR OS OUTROS
        // COLETAR FEATS ATIVOS E INATIVOS
        // COLETAR APPS MAIS USADOS
            // FILTRAR OS TOP 3 APPS E SOMAR OS OUTROS
    })
    .catch((err) => console.log(err))

    
};

module.exports = {getData};