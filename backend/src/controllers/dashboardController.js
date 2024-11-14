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

    Promise.all([produtorModel.getProdutoresTotais(), produtorModel.getProdutoresAtivos(), featModel.getFeatsTotais(), generoModel.getGenerosRecorrentes(), featModel.getStatusFeats(), produtorModel.getAplicativosUsados()])
    .then((resultados) => {
 
        dados.usuariosTotais = resultados[0][0].resultado;
        dados.usuariosAtivos = resultados[1][0].resultado;
        dados.featsTotais = resultados[2][0].resultado;
        dados.generosRecorrentes = filterMiddleware.filtrarPodio(resultados[3]);
        dados.statusFeats = resultados[4];
        dados.appsRecorrentes = filterMiddleware.filtrarPodio(resultados[5]);
        console.log(dados)
        res.status(200).json(dados);

    })
    .catch((err) => {
        console.log(err);
        res.status(503).json(err.sqlMessage);
    });
};

module.exports = {getData};