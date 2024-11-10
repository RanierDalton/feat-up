const produtorController = require('../controllers/produtorController');
const express = require("express");
const router = express.Router();

router.get("/produtores", (req, res) =>{
    return produtorController.getProdutores(req, res);
    
});

router.get("/produtores/achar", (req, res) =>{
    // TODO return produtorController.getProdutoresAchar(req, res);
    
});

router.get("/produtores/convites", (req, res) =>{
    // TODO return produtorController.getProdutoresConvites(req, res);
    
});

router.get("/produtores/feats", (req, res) =>{
    // TODO return produtorController.getProdutoresFeats(req, res);
});

router.post("/produtor/cadastrar", (req, res) =>{
    return produtorController.postProdutor(req, res);
});

router.post("/auth/produtor", (req, res) =>{
    return produtorController.authProdutor(req, res);
});

module.exports = router;