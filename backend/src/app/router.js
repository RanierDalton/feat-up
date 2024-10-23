const express = require('express');
const produtoresController = require('./controllers/produtoresController');

const router = express.Router();

router.get('/:tagName', produtoresController.getPerfil);

router.get('/feed', produtoresController.acharFeats);


module.exports = router;