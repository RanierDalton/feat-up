const express = require('express');
const produtoresController = require('./controllers/produtoresController');

const router = express.Router();

router.get('/:tagName', produtoresController.getPerfil);

router.get('/:tagName/feed', produtoresController.acharFeats);

router.post('/contato', (req, res)=>{
    console.log(req);
    res.send({resposta:req});
});


module.exports = router;