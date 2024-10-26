const smtp = require("../models/emailModel");

// mensageiro, destinatario, assunto, mensagem
const enviarEmailContato = function () {
    const configEmail = {
        from: "contatosinalverde@outlook.com",
        to: "contatosinalverde@outlook.com",
        subject: "Teste",
        html: "<h1>Helo World!</h1>"
    };
    
    new Promise((resolve, reject) => {
        smtp.sendMail(configEmail)
        .then(res => {
            smtp.close();7
            return resolve(res);
        }).catch(error => {
            console.log(error);
            smtp.close();
            return reject(error);
        })
    });
}


module.exports = {
    enviarEmailContato
};