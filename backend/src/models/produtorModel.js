const db = require('../db/connection');

const getProdutores = () =>{
    const instrucao = 'SELECT * FROM produtor';

    return db.executar(instrucao);
}

const postProdutor = (nome, alias, email, descricao, aplicativo, pontoForte) => {
    const instrucao = `INSERT INTO produtor (nome, alias, senha, email, descricao, pontoForte, aplicativo) VALUES (${nome}, ${alias}, ${senha}, ${email}, ${descricao}, ${pontoForte}, ${aplicativo})`;
    
    return db.executar(instrucao);
}

const getProdutor = (alias) => {
    const instrucao = `SELECT idProdutor FROM produtor WHERE alias = '${alias}'`;

    return db.executar(instrucao);
}

const auth = (alias, senha) =>{
    const instrucao = `SELECT COUNT(idProdutor) as auth, idProdutor, alias, email FROM produtor WHERE alias = '${alias}' AND senha = '${senha}'`;

    return db.executar(instrucao);
};

/* 

-- SCRIPT DE CADASTRO
-- INSERT INTO produtor (nome, alias, senha, email, descricao, pontoForte, aplicativo) VALUES (nome, apelido, senha, email, descricao, pontoForte, aplicativo);
-- SELECT idProdutor FROM produtor WHERE alias = alias que acabou de cadastrar;
-- INSERT INTO rede_produtor (fkProdutor, fkRede, usuario) VALUES (idProdutor, idRede, user); FAZER LOOP EM CASO DE MAIS DE UMA REDE
-- INSERT INTO genero_produtor (fkProdutor, fkGenero) VALUES (idProdutor, idGenero),  FAZER LOOP EM CASO DE MAIS DE UM GENERO
-- SCRIPT MOSTRAR PRODUTORES PARA FEAT
-- SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero WHERE adicionar genero de acordo com os generos que o user que acessou;
-- ------------------------------------------------------------------------------------------------

-- SCRIPT DE LOGIN
-- SELECT COUNT(idProdutor) FROM produtor WHERE alias = apelidoInformado AND senha = senhaInformada;
-- ------------------------------------------------------------------------------------------------

-- SCRIPT PARA ACESSAR INFORMAÇÕES DO PERFIL DE USUÁRIO
-- SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero WHERE idProdutor = idPerfilQueUserClicou;
-- --------------------------------------------------------------------------------------------------


-- SCRIPT APPS MAIS USADOS
-- SELECT COUNT(aplicativo), aplicativo FROM produtor GROUP BY aplicativo;

-- SCRIPT USUARIOS TOTAL
-- SELECT COUNT(idProdutor) FROM produtor;

-- SCRIPT USUARIOS ATIVO
-- SELECT COUNT(idProdutor) FROM produtor WHERE TIMESTAMPDIFF(DAY,now(),lastLogin) <= 10;

*/

module.exports = {getProdutores, postProdutor, getProdutor, auth};