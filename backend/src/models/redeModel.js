const db = require('../db/connection');

const getRedes = () =>{
    const instrucao = 'SELECT idRede as id, nome FROM rede_social ORDER BY nome';

    return db.executar(instrucao);
}

module.exports = {getRedes};