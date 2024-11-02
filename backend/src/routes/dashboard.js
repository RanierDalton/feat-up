const dashboardController = require('../controllers/dashboardController');
const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) =>{
    return dashboardController.getData(req, res);
});

module.exports = router;