const db = require('../db/connection');

const getGeneros = () =>{
    const instrucao = 'SELECT idGenero as id, nome FROM genero ORDER BY nome';

    return db.executar(instrucao);
}


module.exports = {getGeneros};