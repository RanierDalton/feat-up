const poolDb = require('./conection');

const getProdutores = async (dados) => {
    const dadosFeats = await poolDb.execute(
        'SELECT * FROM produtor WHERE aplicativo = ? OR genero = ?',[dados.aplicativo, dados.genero]
    );

    // Realizar filtros para retirar o próprio perfil, perfil de pessoas que convidaram e que já participam de um feat

    return dadosFeats[0];
};

const getPerfil = async (alias) => {
    const dados = await poolDb.execute(
        'SELECT * FROM produtor WHERE nome=?',[alias]
    );

    return dados[0][0];
};

module.exports = {
    getProdutores,
    getPerfil
}