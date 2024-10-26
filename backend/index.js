var ambiente_processo = 'producao';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({path: caminho_env});

// IMPORTAR PACOTES EXTERNOS E VARIÁVEIS DO .ENV
var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

// IMPORTAR TODAS AS ROTAS DO BACKEND
var indexRouter = require("./src/routes/root");
// var usuarioRouter = require("path");
// var avisosRouter = require("path");
// var medidasRouter = require("path");
// var aquariosRouter = require("path");
// var empresasRouter = require("path");

// CONFIGURAÇÃO DO APP (SERVIDOR)
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/aquarios", aquariosRouter);
app.use("/empresas", empresasRouter);

// SUBIR O SERVER
app.listen(PORTA_APP, function () {
    console.log(`                                                                                                
        Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
        Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
        `
    );
});

