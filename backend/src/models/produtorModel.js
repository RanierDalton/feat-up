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

const getProdutoresTotais = () => {
    const instrucao = `SELECT COUNT(idProdutor) FROM produtor`;
    return db.executar(instrucao);
}

const getProdutoresAtivos = () => {
    const instrucao = `SELECT COUNT(idProdutor) FROM produtor WHERE TIMESTAMPDIFF(DAY,now(),lastLogin) <= 10`;
    return db.executar(instrucao);
}

const getAplicativosUsados = () => {
    const instrucao = `SELECT COUNT(aplicativo), aplicativo FROM produtor GROUP BY aplicativo`;
    return db.executar(instrucao);
}

const getAcharFeats = (condicoesGeneros) => {
    // SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero WHERE
    const instrucao = `SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero WHERE ${condicoesGeneros}`;
    return db.executar(instrucao);
}

/* 

-- SCRIPT PARA ACESSAR INFORMAÇÕES DO PERFIL DE USUÁRIO
-- SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero WHERE idProdutor = idPerfilQueUserClicou;
-- --------------------------------------------------------------------------------------------------

*/

module.exports = {getProdutores, postProdutor, getProdutor, auth, getProdutoresTotais, getProdutoresAtivos, getAplicativosUsados, getAcharFeats};