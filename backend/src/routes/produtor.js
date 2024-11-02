const produtorController = require('../controllers/produtorController');
const express = require("express");
const router = express.Router();

router.get("/produtores", (req, res) =>{
    return produtorController.getProdutores(req, res);
    
});

router.post("/produtor/cadastrar", (req, res) =>{
    return produtorController.postProdutor(req, res);
});

router.post("/auth/cadastrar", (req, res) =>{
    return produtorController.authProdutor(req, res);
});

module.exports = router;