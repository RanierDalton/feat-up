const produtorModel = require('../models/produtorModel');
const generoModel = require('../models/generoModel');
const redeModel = require('../models/redeModel');

const cadastroValidation = require('../validation/cadastroValidation');

const getProdutores = (req, res) => {
    const produtores = produtorModel.getProdutores();
    produtores.then((data) =>{
        return res.status(200).json(data);
    });    
}

const postProdutor = (req, res) =>{
    console.log(req.body);
    let nome = req.body.nome;
    let email = req.body.email;
    let alias = req.body.alias;
    let senha = req.body.senha;

    let redes = req.body.redes;
    let generos = req.body.generos;

    const resValidation = cadastroValidation.validarCadastro(nome, email, alias, descricao, redes, generos, aplicativo, pontoForte, senha);

    if(!resValidation.status){
        return res.status(400).json(resValidation);
    }

    produtorModel.postProdutor(nome, email, alias, descricao, aplicativo, pontoForte, senha) 
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro do Produtor! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    ); 
    
    for(let i = 0; i < redes.length; i++){
        redeModel.postRedeProdutor(redes[i].idProdutor, redes[i].idRede, redes[i].user)
        .then((resultado) => "Cadastrou rede!")
        .catch((erro) => {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro de Redes! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
 

    for(let i = 0; i < generos.length; i++){
        generoModel.postGeneroProdutor(redes)
        .then((resultado) => "Cadastrou genero!")
        .catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro de Gêneros! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }

    res.status(200).json({message: "Cadastro feito com sucesso!"});
}

const authProdutor = (req, res) => {
    var alias = req.body.alias;
    var senha = req.body.senha;

    if (alias == undefined || alias == "") {
        res.status(400).send("Apelido Incorreto");
    } else if (senha == undefined || senha == "") {
        res.status(400).send("Senha Incorreto");
    } else {
        produtorModel.auth(alias, senha)
        .then(
            function (resAuth) {
                console.log(`\nResultados encontrados: ${resAuth.length}`);
                console.log(`Resultados: ${JSON.stringify(resAuth)}`); // transforma JSON em String
                if(resAuth[0].auth == 1){
                    res.status(200).json({
                        id: resAuth[0].idProdutor,
                        email: resAuth[0].email,
                        senha: resAuth[0].senha,
                        alias: resAuth[0].alias
                    });
                } else {
                    res.status(403).send("Email e/ou senha inválido(s)");
                }
                
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

}

module.exports = {getProdutores, postProdutor, authProdutor};