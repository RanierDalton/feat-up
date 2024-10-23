const mysql = require('./conection');

const getProdutores = async () => {
    const convites = await mysql.execute(
        'SELECT * FROM produtor'
    );

    return convites;
};

const getPerfil = async (alias) => {
    const convites = await mysql.execute(
        'SELECT * FROM produtor WHERE nome=?',[alias]
    );

    return convites;
};

module.exports = {
    getProdutores,
    getPerfil
}