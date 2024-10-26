const nodemailer = require("nodemailer");

const smtp = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    secure: false,
    auth: {
        user: "contatosinalverde@outlook.com",
        pass: "Urubu#100"
    }
});

module.exports = smtp;