const db = require('../db/connection');

const getProdutores = () =>{
    const instrucao = 'SELECT * FROM produtor';

    return db.executar(instrucao);
}

module.exports = {getProdutores};