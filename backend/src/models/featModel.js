const db = require('../db/connection');

const getFeatsAtivos = (id) => {
    const instrucao = `CALL prFeatsAtivos(${id});`;
    return db.executar(instrucao);
};

const getConvites = (id) => {
    const instrucao = `CALL prConvites(${id});`
    return db.executar(instrucao);
};

const getFeatsTotais = () => {
    const instrucao = 'CALL prFeatsTotais()';

    return db.executar(instrucao);
};

const getStatusFeats = () => {
    const instrucao = `CALL prStatusFeats();`;

    return db.executar(instrucao);
};

const postFeat = (idSolicita, idAceita) => {
    const instrucao = `CALL prPostFeat(${idSolicita}, ${idAceita});`;

    return db.executar(instrucao);
};

const putStatusFeat = (idSolicita, idAceita, status) => {
    const instrucao = `CALLL prPutStatusFeat(${idSolicita}, ${idAceita}, ${status});`;

    return db.executar(instrucao);
};

module.exports = {getFeatsTotais, getStatusFeats, getConvites, getFeatsAtivos, putStatusFeat, postFeat};