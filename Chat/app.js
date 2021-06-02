const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

//Configuracion del servidor
app.set('port', 3002);
app.use(express.static(__dirname + '/public'));

//Inicialización del servidor
server.listen(app.get('port'), function() {
    console.log('Servidor iniciado');
});

//Logica de los socket
require('./sockets')(server);