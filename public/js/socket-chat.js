var socket = io();
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('name')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var usuario = {
    usuario: searchParams.get('name')
}

//Escuchar conecion
socket.on('connect', function() {
    console.log('conectado :D');

});
//Escuchar desconecion
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

//Enviar mensaje
// socket.emit('mandarMensaje', {
//     usuario: 'jose luis',
//     mensaje: 'hola que tal'
// })

//Escuhar los mmensajes
socket.on('mandarMensaje', function(mensaje) {
    console.log(mensaje);
})

//Enviar info a server
socket.emit('unirChat', usuario, function(res) {
    console.log('Servidor', res);
});

//Persona desconectada
socket.on('salio', (mensaje) => {
    console.log(mensaje);
});

//Lista de usuarios conectados
socket.on('lista', (mensaje) => {
    console.log(mensaje);
});