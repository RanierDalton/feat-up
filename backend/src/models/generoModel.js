const db = require('../db/connection');

const getGeneros = () =>{
    const instrucao = 'SELECT idGenero as id, nome FROM genero ORDER BY nome';

    return db.executar(instrucao);
}

const getGenerosProdutor = (id) =>{
    const instrucao = `SELECT genero.nome as nome FROM genero_produtor JOIN genero ON genero.idGenero = fkGenero JOIN produtor ON fkProdutor = idProdutor WHERE fkProdutor = ${id}`;

    return db.executar(instrucao);
}

const postGeneroProdutor = (values) => {
    const instrucao = `INSERT INTO genero_produtor (fkProdutor, fkGenero) VALUES ${values}`;
    return db.executar(instrucao);
}

const getGenerosRecorrentes = () => {
    const instrucao = `SELECT COUNT(fkGenero) as total, nome FROM genero_produtor JOIN genero ON genero.idGenero = fkGenero GROUP BY fkGenero ORDER BY total DESC`;
    return db.executar(instrucao);
}

module.exports = {getGeneros, postGeneroProdutor, getGenerosRecorrentes, getGenerosProdutor};