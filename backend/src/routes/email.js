const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.get("/contato", function (req, res) {
    res.send('Recebi o get');
    let resposta = emailController.enviarEmailContato();
    res.send(resposta);
});

module.exports = router;