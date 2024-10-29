require("dotenv").config();

const enviarCredenciais = () => {
    const credenciais = {
        host: process.env.HOST,
        port: process.env.PORTA,
        email: process.env.EMAIL,
        senha: process.env.SENHA
    };
    return credenciais;
};

module.exports = {enviarCredenciais};