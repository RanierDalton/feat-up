const db = require('../db/connection');

const postProdutor = (nome, alias, email, descricao, aplicativo, pontoForte, senha) => {
    const instrucao = `INSERT INTO produtor (nome, alias, senha, email, descricao, pontoForte, aplicativo) VALUES ('${nome}', '${alias}', '${senha}', '${email}', '${descricao}', '${pontoForte}', '${aplicativo}')`;
    
    return db.executar(instrucao);
};

const getProdutor = (alias) => {
    const instrucao = `SELECT idProdutor FROM produtor WHERE alias = '${alias}'`;

    return db.executar(instrucao);
};

const auth = (alias, senha) =>{
    const instrucao = `SELECT COUNT(idProdutor) as auth, idProdutor, alias, email FROM produtor WHERE alias = '${alias}' AND senha = '${senha}'`;

    return db.executar(instrucao);
};

const getProdutoresTotais = () => {
    const instrucao = `SELECT COUNT(idProdutor) as resultado FROM produtor`;
    return db.executar(instrucao);
};

const getProdutoresAtivos = () => {
    const instrucao = `SELECT COUNT(idProdutor) as resultado FROM produtor WHERE TIMESTAMPDIFF(DAY,now(),lastLogin) <= 10`;
    return db.executar(instrucao);
};

const getAplicativosUsados = () => {
    const instrucao = `SELECT COUNT(aplicativo) as total, aplicativo as nome FROM produtor GROUP BY aplicativo`;
    return db.executar(instrucao);
};

const getAcharFeats = (condicoesGeneros) => {
    // SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero WHERE
    const instrucao = `SELECT idProdutor, alias, aplicativo, pontoForte, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero WHERE ${condicoesGeneros}`;
    console.log(instrucao);
    return db.executar(instrucao);
};

const getPerfil = (id) => {
    const instrucao = `
        SELECT descricao, pathFotoPerfil as pathFoto, alias, aplicativo, pontoForte, g.nome as genero,r.url as url, r.fontAwesomeTag as class, rp.usuario as 'user' 
        FROM produtor 
        JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor 
        JOIN genero as g ON gp.fkGenero = g.idGenero 
        JOIN rede_produtor as rp ON rp.fkProdutor = idProdutor 
        JOIN rede_social as r ON fkRede = idRede
        WHERE idProdutor = ${id};
    `;

    return db.executar(instrucao);
};

const patchHorarioLogin = (alias) => {
    const instrucao = `
        UPDATE produtor SET lastLogin = now() WHERE alias = '${alias}';
    `;

    return db.executar(instrucao);
};

module.exports = {postProdutor, getProdutor, auth, getProdutoresTotais, getProdutoresAtivos, getAplicativosUsados, getAcharFeats, getPerfil, patchHorarioLogin};