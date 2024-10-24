const express = require('express');
const router = require('./router');
const path = require('path');

const app = express();

app.use(router);
app.use(express.static(path.join(__dirname, '../templates')));

module.exports = app;