const express = require('express');
const path = require('path');

const router = express.Router();

router.get("/", (req ,res) => {
    res.sendFile(path.join(__dirname, '../templates/html/index.html'));
});

router.get("/login", (req ,res) => {
    res.sendFile(path.join(__dirname, '../templates/html/site-institucional/login.html'));
});

router.get("/cadastro", (req ,res) => {
    res.sendFile(path.join(__dirname, '../templates/html/site-institucional/cadastro.html'));
});

module.exports = router;