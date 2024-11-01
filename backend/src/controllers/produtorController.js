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
    
    // TODO
    // redeModel.postRedes(redes)
    // .then((resultado) => res.status(200).json(resultado))
    // .catch((erro) => {
    //         console.log(erro);
    //         console.log("\nHouve um erro ao realizar o cadastro de Redes! Erro: ", erro.sqlMessage);
    //         res.status(500).json(erro.sqlMessage);
    //     }
    // ); 

    // generoModel.postGeneros(redes)
    // .then((resultado) => res.status(200).json(resultado))
    // .catch((erro) => {
    //         console.log(erro);
    //         console.log("\nHouve um erro ao realizar o cadastro de Gêneros! Erro: ", erro.sqlMessage);
    //         res.status(500).json(erro.sqlMessage);
    //     }
    // ); 
}

const authProdutor = (req, res) => {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        aquarios: resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {getProdutores, postProdutor, authProdutor};