const express = require("express");
const emailController = require("../controllers/emailController");
const router = express.Router();

router.get("/credenciais", function (req, res) {
    const credenciais = emailController.enviarCredenciais();
    res.json(credenciais);
});

module.exports = router;