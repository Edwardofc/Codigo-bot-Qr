const fs = require('fs')
const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');

const SESSION_FILE_PATH ="./session.js"

const country_code = "51"
const number = "935531943"
const msg = "Hola, como estas?"
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)){
    sessionData = require(SESSION_FILE_PATH)
}

const client = new Client({
    session = sessionData,
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot conectado-Hola');

    let chatId = country_code + number + "@c.us";

    client.sendMessage(chatId, msg)
               .then(Response => {
                   if(Response.id.fromMe) {
                    console.log('El mensaje fue enviado');
                   }
               })
});

Client.on('autheticated', session => {
    sessionData = session
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session),err => {
        if(err){
            console.error(err);
        }
    })
})
client.on('auth_failure', smg => {
    console.error('hubo un error en el autenticacion', msg);
})
client.initialize();
