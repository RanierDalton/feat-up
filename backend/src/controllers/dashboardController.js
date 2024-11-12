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
                    dados.generosRecorrentes = filterMiddleware.filtrarPodio(resultado);

                    featModel.getStatusFeats()
                    .then((resultado) => {
                        dados.statusFeats = resultado;

                        produtorModel.getAplicativosUsados()
                        .then((resultado) => {
                            dados.appsRecorrentes = filterMiddleware.filtrarPodio(resultado);

                            console.log(dados)
                            res.json(dados);
                        })
                        .catch((err) => res.status(500).json(err.sqlMessage))
                    })
                    .catch((err) => res.status(500).json(err.sqlMessage))
                })
                .catch((err) => res.status(500).json(err.sqlMessage))
            })
            .catch((err) => res.status(500).json(err.sqlMessage))
        })
        .catch((err) => res.status(500).json(err.sqlMessage))
    })
    .catch((err) => res.status(500).json(err.sqlMessage))
};

module.exports = {getData};