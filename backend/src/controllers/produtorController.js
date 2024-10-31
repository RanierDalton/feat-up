const produtorModel = require('../models/produtorModel');

const getProdutores = (req, res) => {
    const produtores = produtorModel.getProdutores();
    produtores.then((data) =>{
        return res.status(200).json(data);
    });    
}

const postProdutor = (req, res) =>{
    // TODO
    console.log(req.body);
    // Coletar os dados do body do request
    var nome = req.body.nome;
    var email = req.body.email;
    var alias = req.body.alias;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaVincularServer;
    // Validar os dados 
    // se tiver certinho, chamar o model para cadastrar

    res.status(200).json({message: "OK"});
    
}

module.exports = {getProdutores, postProdutor};