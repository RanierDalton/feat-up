const produtoresModel = require('../models/model');

const acharFeats = async (req, res) => {
    let arrayProdutores = await produtoresModel.getProdutores();
    const produtores = arrayProdutores[0];
    return res.status(200).json(produtores);
};

const getPerfil = async (req, res) => {
    const alias = req.params.tagName;
    let arrayProdutores = await produtoresModel.getPerfil(alias);
    const produtores = arrayProdutores[0];
    return res.status(200).json(produtores);
};

module.exports = {
    acharFeats,
    getPerfil
};