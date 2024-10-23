const express = require('express');
const produtoresController = require('./controllers/produtoresController');

const router = express.Router();

router.get('/:tagName', produtoresController.getPerfil);

router.get('/:tagName/feed', produtoresController.acharFeats);


module.exports = router;