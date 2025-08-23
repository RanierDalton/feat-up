const db = require('../db/connection');

const postProdutor = (nome, alias, email, descricao, aplicativo, pontoForte, senha) => {
    const instrucao = `CALL prPostProdutor('${nome}', '${alias}', '${senha}', '${email}', '${descricao}', '${pontoForte}', '${aplicativo}')`;
    
    return db.executar(instrucao);
};

const getProdutor = (alias) => {
    const instrucao = `SELECT idProdutor FROM produtor WHERE alias = '${alias}'`;

    return db.executar(instrucao);
};

const auth = (alias, senha) =>{
    const instrucao = `CALL prAuth('${alias}', '${senha}')`;

    return db.executar(instrucao);
};

const getProdutoresTotais = () => {
    const instrucao = `CALL prGetProdutoresTotais()`;
    return db.executar(instrucao);
};

const getProdutoresAtivos = () => {
    const instrucao = `CALL prGetProdutoresAtivos()`;
    return db.executar(instrucao);
};

const getAplicativosUsados = () => {
    const instrucao = `SELECT COUNT(aplicativo) as total, aplicativo as nome FROM produtor GROUP BY aplicativo`;
    return db.executar(instrucao);
};

const getAcharFeats = (condicoesGeneros, idProdutor) => {
    const instrucao = `SELECT p.idProdutor, p.alias, p.aplicativo, p.pontoForte, p.pathFotoPerfil as foto, g.nome as genero
        FROM produtor AS p
        JOIN genero_produtor as gp ON gp.fkProdutor = p.idProdutor 
        JOIN genero as g ON gp.fkGenero = g.idGenero 
        JOIN feat ON fkProdutorSolicita = idProdutor 
        WHERE ${condicoesGeneros} AND p.idProdutor <> ${idProdutor} and
        	isNull((
        		SELECT COUNT(feat.fkProdutorAceita) FROM produtor as prod
                JOIN feat ON prod.idProdutor = fkProdutorAceita AND fkProdutorSolicita = ${idProdutor}
                WHERE fkProdutorAceita = p.idProdutor
                GROUP BY feat.fkProdutorAceita

        	)) and 
        	isNull((
        		SELECT COUNT(feat.fkProdutorSolicita) FROM produtor as prod
                JOIN feat ON prod.idProdutor = fkProdutorSolicita AND fkProdutorAceita = ${idProdutor}
                WHERE fkProdutorSolicita = p.idProdutor
                GROUP BY feat.fkProdutorSolicita
        	));`;
    
    return db.executar(instrucao);
};

const getAcharFeatsGenericos = (idProdutor) => {
    const instrucao = `CALL prGetAcharFeatsGenericos(${idProdutor})`;

    return db.executar(instrucao);
}

const getPerfil = (id) => {
    const instrucao = `CALL prGetPerfil(${id})`;

    return db.executar(instrucao);
};

const patchHorarioLogin = (alias) => {
    const instrucao = `CALL prPatchHorarioLogin('${alias}')`;

    return db.executar(instrucao);
};

const patchPathFotoPerfil = (path, id) => {
    const instrucao = `CALL prPatchPathFotoPerfil(${id}, '${path}')`;

    return db.executar(instrucao);
}

module.exports = {getAcharFeatsGenericos, postProdutor, getProdutor, auth, getProdutoresTotais, getProdutoresAtivos, getAplicativosUsados, getAcharFeats, getPerfil, patchHorarioLogin, patchPathFotoPerfil};