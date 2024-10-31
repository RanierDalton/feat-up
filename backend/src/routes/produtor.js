const produtorController = require('../controllers/produtorController');
const express = require("express");
const router = express.Router();

router.get("/produtores", (req, res) =>{
    return produtorController.getProdutores(req, res);
    
});

router.post("/produtores/cadastrar", () =>{
    return produtorController.postProdutor(req, res);
});

module.exports = router;