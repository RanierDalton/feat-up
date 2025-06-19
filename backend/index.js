const ambiente_processo = 'producao';
const caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({path: caminho_env});

const express = require("express");
const cors = require("cors");
const path = require("path");

const PORTA_APP = process.env.SERVER_PORT;
const HOST_APP = process.env.SERVER_HOST;

const indexRouter = require("./src/routes/root");
const emailRouter = require("./src/routes/email");
const produtorRouter = require('./src/routes/produtor');
const generoRouter = require("./src/routes/genero");
const redeRouter = require("./src/routes/rede");
const dashboardRouter = require("./src/routes/dashboard");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(indexRouter);
app.use(emailRouter);
app.use(produtorRouter);
app.use(generoRouter);
app.use(redeRouter);
app.use(dashboardRouter);

app.listen(PORTA_APP, function () {
    console.log(`Acesse o caminho a seguir para visualizar: http://${HOST_APP}:${PORTA_APP}`);
});

