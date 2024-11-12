const produtorModel = require('../models/produtorModel');
const generoModel = require('../models/generoModel');
const redeModel = require('../models/redeModel');

const cadastroValidation = require('../validation/cadastroValidation');
const filterMiddleware = require('../middleware/filter');

const getProdutores = (req, res) => {
    produtorModel.getProdutores()
    .then((data) =>{
        return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json(err.sqlMessage));    
}

const getAcharFeats = (req, res) => {
    console.log(req.body);
    const idProdutor = req.body.id;

    generoModel.getGenerosProdutor(idProdutor)
    .then((resultado) => {
        let condicoesGeneros = filterMiddleware.filtrarGenerosProdutor(resultado);

        produtorModel.getAcharFeats(condicoesGeneros)
        .then((resultado)=> res.status(200).json(resultado))
        .catch((err) => res.status(500).json(err.sqlMessage))
    })
    .catch((err) => res.status(500).json(err.sqlMessage))
};

const postProdutor = (req, res) =>{
    let nome = req.body.nome;
    let email = req.body.email;
    let alias = req.body.apelido;
    let senha = req.body.senha;
    let descricao = req.body.descricao;
    let aplicativo = req.body.aplicativo;
    let pontoForte = req.body.pontoForte;

    let redes = req.body.redes;
    let generos = req.body.generos;

    const resValidation = cadastroValidation.validarCadastro(nome, alias, email, descricao, redes, generos, aplicativo, pontoForte, senha);

    if(!resValidation.status){
        return res.status(400).json(resValidation);
    }

    produtorModel.postProdutor(nome, alias, email, descricao, aplicativo, pontoForte, senha) 
    .then((resultado) => {
        let getId = produtorModel.getProdutor(alias);

        getId.then((resultado) => {
            let idProdutor = 0;
            resultado.forEach((id) => {idProdutor = id.idProdutor; console.log(id.idProdutor)});
            console.log(idProdutor);
    
            let valuesRedes = "";
            
            
            for(let i = 0; i < redes.length; i++){
                valuesRedes += `(${idProdutor}, ${redes[i].idRede}, '${redes[i].user}')${i != (redes.length -1) ? ",":""}`;
            }
        
            console.log(valuesRedes);
         
            redeModel.postRedeProdutor(valuesRedes)
            .then((resultado) => {
                let valuesGeneros = "";
        
                for(let i = 0; i < generos.length; i++){
                    valuesGeneros += `(${idProdutor}, ${generos[i]})${i != (redes.length -1) ? ",":""}`;
                }
            
                console.log(valuesGeneros);
            
                generoModel.postGeneroProdutor(valuesGeneros)
                .then((resultado) => res.status(200).json({message: "Cadastro feito com sucesso!"}))
                .catch((erro) => {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro de Gêneros! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                });
            })
            .catch((erro) => {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro de Redes! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
        });
    })
    .catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro do Produtor! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    ); 
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

module.exports = {getProdutores, postProdutor, authProdutor, getAcharFeats};