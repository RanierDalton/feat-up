const db = require('../db/connection');

const getFeatsAtivos = (id) => {
    const instrucao = `SELECT idProdutor, alias, aplicativo, pontoForte, pathFotoPerfil as foto, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor 
JOIN genero as g ON gp.fkGenero = g.idGenero
JOIN feat ON idProdutor = fkProdutorAceita OR idProdutor = fkProdutorSolicita
WHERE idProdutor <> ${id} AND statusFeat = 1;`;
    return db.executar(instrucao);
};

const getConvites = (id) => {
    const instrucao = `SELECT idProdutor, alias, aplicativo, pontoForte, pathFotoPerfil as foto, g.nome as genero FROM produtor JOIN genero_produtor as gp ON gp.fkProdutor = idProdutor JOIN genero as g ON gp.fkGenero = g.idGenero JOIN feat ON idProdutor = feat.fkProdutorSolicita WHERE feat.statusFeat = 0 AND fkProdutorAceita = ${id}`
    return db.executar(instrucao);
};

const getFeatsTotais = () => {
    const instrucao = 'SELECT COUNT(idFeat) as resultado FROM feat';

    return db.executar(instrucao);
};

const getStatusFeats = () => {
    const instrucao = `SELECT COUNT(statusFeat) as total, CASE WHEN statusFeat = 0 THEN 'Pendente' WHEN statusFeat = 1 THEN 'Aceito' ELSE 'Recusado' END AS nome FROM feat GROUP BY statusFeat`;

    return db.executar(instrucao);
};

const postFeat = (idSolicita, idAceita) => {
    const instrucao = `INSERT INTO feat (dtFeat, fkProdutorSolicita, fkProdutorAceita) VALUES (now(), '${idSolicita}', '${idAceita}')`;

    return db.executar(instrucao);
};

const putStatusFeat = (idSolicita, idAceita, status) => {
    const instrucao = `UPDATE feat SET statusFeat = ${status} WHERE fkProdutorAceita = ${idAceita} AND fkProdutorSolicita = ${idSolicita}`;

    return db.executar(instrucao);
};

module.exports = {getFeatsTotais, getStatusFeats, getConvites, getFeatsAtivos, putStatusFeat, postFeat};