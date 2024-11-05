const db = require('../db/connection');

const getGeneros = () =>{
    const instrucao = 'SELECT idGenero as id, nome FROM genero ORDER BY nome';

    return db.executar(instrucao);
}

const postGeneroProdutor = (values) => {
    const instrucao = `INSERT INTO genero_produtor (fkProdutor, fkGenero) VALUES ${values}`;
    return db.executar(instrucao);
}

// -- SCRIPT GENEROS MAIS USADOS
// -- SELECT COUNT(fkGenero), nome as genero FROM genero_produtor JOIN genero ON genero.idGenero = fkGenero GROUP BY fkGenero;


module.exports = {getGeneros, postGeneroProdutor};