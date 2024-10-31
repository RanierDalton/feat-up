const generoController = require('../controllers/generoController');
const express = require("express");
const router = express.Router();

router.get("/generos", (req, res) =>{
    return generoController.getGeneros(req, res);
});

module.exports = router;