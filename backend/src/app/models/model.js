const db = require('./conection');

const getConvites = async (idUsuario) => {
    const convites = await db.execute(
        'SELECT * FROM '
    );

    return convites;
}

module.exports = {
    getConvites
}