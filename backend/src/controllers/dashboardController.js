const produtorModel = require('../models/produtorModel');
const generoModel = require('../models/generoModel');
const featModel = require('../models/featModel');

const filterMiddleware = require('../middleware/filter');

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
        dados.usuariosTotais = resultado[0].resultado;

        produtorModel.getProdutoresAtivos()
        .then((resultado) => {
            dados.usuariosAtivos = resultado[0].resultado;

            featModel.getFeatsTotais()
            .then((resultado) => {
                dados.featsTotais = resultado[0].resultado;

                generoModel.getGenerosRecorrentes()
                .then((resultado) => {
                    dados.generosRecorrentes = filterMiddleware.filtrarGenerosRecorrentes(resultado);

                    console.log(dados);
                })
                .catch((err) => res.status(500).json(err.sqlMessage))
            })
            .catch((err) => res.status(500).json(err.sqlMessage))
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
    .catch((err) => res.status(500).json(err.sqlMessage))

    
};

module.exports = {getData};