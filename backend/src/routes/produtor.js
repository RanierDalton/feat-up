const produtorController = require('../controllers/produtorController');
const express = require("express");
const router = express.Router();

router.get("/produtores/achar/:id", (req, res) =>{
    return produtorController.getAcharFeats(req, res);    
});

router.get("/produtores/convites/:id", (req, res) =>{
    return produtorController.getConvites(req, res);
});

router.get("/produtores/perfil/:id", (req, res) =>{
    return produtorController.getPerfil(req, res);    
})

router.get("/produtores/feats/:id", (req, res) =>{
    return produtorController.getFeatsAtivos(req, res);
});

router.post("/produtor/cadastrar", (req, res) =>{
    return produtorController.postProdutor(req, res);
});

router.post("/auth/produtor", (req, res) =>{
    return produtorController.authProdutor(req, res);
});

router.post("/produtores/feat/cadastrar", (req, res) =>{
    return produtorController.postFeat(req, res);
});

router.put("/produtores/feat/atualizar", (req, res) =>{
    return produtorController.putStatusFeat(req, res);
});

module.exports = router;