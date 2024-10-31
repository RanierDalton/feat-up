const db = require('../db/connection');

const getProdutores = () =>{
    const instrucao = 'SELECT * FROM produtor';

    return db.executar(instrucao);
}

const postProdutor = (nome, alias, email, descricao) => {
    // TODO
    // FAZER INSERT NO BANCO DE DADOS
}

module.exports = {getProdutores};