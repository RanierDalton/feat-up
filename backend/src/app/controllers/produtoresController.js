const produtoresModel = require('../models/model');

const acharFeats = async (req, res) => {
    const alias = req.params.tagName;
    let produtor = await produtoresModel.getPerfil(alias);
    let produtores = await produtoresModel.getProdutores(produtor);

    return res.status(200).json(produtores);
};

const getPerfil = async (req, res) => {
    const alias = req.params.tagName;
    let produtor = await produtoresModel.getPerfil(alias);

    return res.status(200).json(produtor);
};

module.exports = {
    acharFeats,
    getPerfil
};