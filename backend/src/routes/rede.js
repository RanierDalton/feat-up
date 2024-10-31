const redeController = require('../controllers/redeController');
const express = require("express");
const router = express.Router();

router.get("/redes", (req, res) =>{
    return redeController.getRedes(req, res);
});

module.exports = router;