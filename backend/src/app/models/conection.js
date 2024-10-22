const mysql = require('mysql2/promise');
require('dotenv').config();
const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const SENHA = process.env.MYSQL_PASSWORD;
const DB = process.env.MYSQL_DB;
const PORTA = process.env.MYSQL_PORT;

const conection = mysql.createPool({
    host: HOST,
    user: USER,
    password:SENHA,
    database: DB,
    port: PORTA
});

module.exports = mysql;