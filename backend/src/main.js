const app = require('./app/app');
require('dotenv').config();
const PORTA = process.env.SERVER_PORT;

app.listen(PORTA, () =>{
    console.log('Rodando na porta ' + PORTA);
});


