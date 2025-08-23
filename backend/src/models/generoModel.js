const db = require('../db/connection');

const getGeneros = () =>{
    const instrucao = 'CALL prGetGeneros()';

    return db.executar(instrucao);
}

const getGenerosProdutor = (id) =>{
    const instrucao = `prGetGenerosProdutor(${id})`;

    return db.executar(instrucao);
}

const postGeneroProdutor = (values) => {
    const instrucao = `INSERT INTO genero_produtor (fkProdutor, fkGenero) VALUES ${values}`;
    return db.executar(instrucao);
}

const getGenerosRecorrentes = () => {
    const instrucao = `CALL prGetGenerosRecorrentes()`;
    return db.executar(instrucao);
}

module.exports = {getGeneros, postGeneroProdutor, getGenerosRecorrentes, getGenerosProdutor};