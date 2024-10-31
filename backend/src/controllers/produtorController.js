const produtorModel = require('../models/produtorModel');

const getProdutores = (req, res) => {
    const produtores = produtorModel.getProdutores();
    produtores.then((data) =>{
        return res.status(200).json(data);
    });    
}

const postProdutor = (req, res) =>{
    // TODO
    console.log(req);
    // Coletar os dados do body do request
    var nome = req.body.nome;
    var email = req.body.email;
    var alias = req.body.alias;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaVincularServer;
    // Validar os dados 
    // se tiver certinho, chamar o model para cadastrar
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } 
    
}

module.exports = {getProdutores, postProdutor};