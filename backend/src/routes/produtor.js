const produtorController = require('../controllers/produtorController');
const express = require("express");
const router = express.Router();

router.get("/produtores/achar", (req, res) =>{
    return produtorController.getAcharFeats(req, res);    
});

router.get("/produtores/convites", (req, res) =>{
    return produtorController.getConvites(req, res);
});

router.get("produtores/perfil", (req, res) =>{
    return produtorController.getPerfil(req, res);    
})

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