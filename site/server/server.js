const app = require('./src/app');
require('dotenv').config();

const port = process.env.SERVER_PORT;

app.listen(port, () => console.log('Aberto na porta '+ port));