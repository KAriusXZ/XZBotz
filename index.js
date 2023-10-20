const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');

async function Turnon() {
  const auth = await useMultiFileAuthState('On')
  
  const socket = makeWASocket({
    printQRInTerminal: true,
    browser: ['XZCloud', 'Firefox', '1.0.0']
    auth = auth.state,
    logger: pino({ level: "silent" })
  })
  
  socket.ev.on("creds.update", auth.saveCreds)
  socket.ev.on("connection.update", ({
    connection 
  }) => {
    if(connection === "open") {
      console.log("Connected")
    }
    if(connection === "close") {
      Turnon() console.log("Reconnecting")
    }
  })
