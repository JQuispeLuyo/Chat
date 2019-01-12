var socket = io();
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('name') || !searchParams.has('room')) {
    window.location = 'index.html';
    throw new Error('El el nombre y la sala son necesarios');
}

var usuario = {
    usuario: searchParams.get('name'),
    room: searchParams.get('room')
}

//Escuchar conexión
socket.on('connect', function() {
    console.log('conectado :D');
});

//Escuchar desconexión
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

//Enviar info a server
socket.emit('unirChat', usuario, function(res) {
    console.log('Servidor', res);
});

//Enviar mensaje
// socket.emit('mandarMensaje', {
//     usuario: 'jose luis',
//     mensaje: 'hola que tal'
// })

//Escuhar los mensajes
socket.on('mandarMensaje', function(mensaje) {
    console.log(mensaje);
})

//Escuchar el mensaje privado
socket.on('mensajePrivado', function(mensaje) {
    console.log(mensaje);
})

//Persona desconectada
socket.on('salio', (mensaje) => {
    console.log(mensaje);
});

//Lista de usuarios conectados
socket.on('lista', (mensaje) => {
    console.log(mensaje);
});