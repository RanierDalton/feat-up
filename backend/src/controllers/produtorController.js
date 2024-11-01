const produtorModel = require('../models/produtorModel');
const cadastrarMiddleware = require('../middleware/cadastroMiddleware');

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
    let nome = req.body.nome;
    let email = req.body.email;
    let alias = req.body.alias;
    let senha = req.body.senha;

    let redes = req.body.redes;
    let generos = req.body.generos;
    // Validar os dados 
    // se tiver certinho, chamar o model para cadastrar

    if(apelido == "" || apelido == undefined){
        return res.status(400).send("Por favor, preencha corretamente o campo apelido.");
    }

    if(descricao == "" || descricao == undefined){
        return res.status(400).send("Por favor, preencha corretamente o campo descrição");
    }

    if(!cadastrarMiddleware.validarRedes(redes)){
        return res.status(400).send("Por favor, preencha corretamente os campos das redes sociais");
    }

    if(!cadastrarMiddleware.validarGeneros(generos)){
        return res.status(400).send("Por favor, preencha corretamente os campos dos gêneros");
    }

    if(aplicativo == "" || aplicativo == undefined){
        return res.status(400).send("Por favor, preencha corretamente o campo do aplicativo");
    }

    if(pontoForte == "" || pontoForte == undefined){
        return res.status(400).send("Por favor, preencha corretamente o campo do ponto forte");
    }

    if(!cadastrarMiddleware.validarSenha(senha)){
        return res.status(400).send("Por favor, preencha corretamente o campo da senha");
    }

    const cadastroProdutor = produtorModel.postProdutor();

    return res.status(200).json();
    
}

module.exports = {getProdutores, postProdutor};