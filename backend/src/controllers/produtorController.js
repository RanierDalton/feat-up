const produtorModel = require('../models/produtorModel');
const generoModel = require('../models/generoModel');
const redeModel = require('../models/redeModel');
const featModel = require('../models/featModel');

const cadastroValidation = require('../validation/cadastroValidation');
const filterMiddleware = require('../middleware/filter');

const putStatusFeat = (req, res) => {
    const idSolicita = req.body.idSolicita;
    const idAceita = req.body.idAceita;
    const status = req.body.status;

    featModel.putStatusFeat(idSolicita, idAceita, status)
    .then((resultado) =>{
        return res.status(200).json(resultado);
    })
    .catch((err) => res.status(500).json(err.sqlMessage)); 
};

const postFeat = (req, res) => {
    const idSolicita = req.body.idSolicita;
    const idAceita = req.body.idAceita;

    featModel.postFeat(idSolicita, idAceita)
    .then((resultado) =>{
        return res.status(200).json(resultado);
    })
    .catch((err) => res.status(500).json(err.sqlMessage)); 
};

const getFeatsAtivos = (req, res) => {
    let id = req.params.id;

    featModel.getFeatsAtivos(id)
    .then((data) =>{
        return res.status(200).json(filterMiddleware.filtrarGenerosCard(data));
    })
    .catch((err) => res.status(500).json(err.sqlMessage)); 
};

const getConvites = (req, res) => {
    let id = req.params.id;

    featModel.getConvites(id)
    .then((data) =>{
        return res.status(200).json(filterMiddleware.filtrarGenerosCard(data));
    })
    .catch((err) => res.status(500).json(err.sqlMessage)); 
};

const getPerfil = (req, res) => {
    let id = req.params.id;

    produtorModel.getPerfil(id)
    .then((data) =>{
        return res.status(200).json(filterMiddleware.filtrarPerfilInfo(data));
    })
    .catch((err) => res.status(500).json(err.sqlMessage)); 
};

const getProdutores = (req, res) => {
    produtorModel.getProdutores()
    .then((data) =>{
        return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json(err.sqlMessage));    
}

const getAcharFeats = (req, res) => {
    const idProdutor = req.params.id;

    generoModel.getGenerosProdutor(idProdutor)
    .then((resultado) => {
        let condicoesGeneros = filterMiddleware.filtrarGenerosProdutor(resultado);

        produtorModel.getAcharFeats(condicoesGeneros)
        .then((resultado) => res.status(200).json(filterMiddleware.filtrarGenerosCard(resultado)))
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
    const alias = req.body.alias;
    const senha = req.body.senha;

    if (alias == undefined || alias == "") {
        res.status(400).send("Apelido Incorreto");
    } else if (senha == undefined || senha == "") {
        res.status(400).send("Senha Incorreto");
    } else {
        produtorModel.auth(alias, senha)
        .then((resAuth) => {
                if(resAuth[0].auth == 1){
                    produtorModel.patchHorarioLogin(alias).then(() =>
                        res.status(200).json({
                            id: resAuth[0].idProdutor,
                            email: resAuth[0].email,
                            senha: resAuth[0].senha,
                            alias: resAuth[0].alias
                        })
                    );
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

const patchPathFotoPerfil = (req, res) => {
    let idProdutor = req.params.id;
    try {
        produtorModel.patchPathFotoPerfil(`../static/assets/profiles/${req.file.filename}`,idProdutor)
        .then((resultado) => res.status(200).json({message: "Upload feito com sucesso!"}))
        .catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o upload! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {getProdutores, postProdutor, authProdutor, getAcharFeats, getPerfil, getConvites,getFeatsAtivos,putStatusFeat,postFeat, patchPathFotoPerfil};