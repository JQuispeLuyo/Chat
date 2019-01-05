
var socket = io();
//Escuchar conecion
socket.on('connect', function(){
    console.log('conectado :D');
});

//Escuchar desconecion
socket.on('disconnect', function(){
    console.log('Perdimos conexión con el servidor');
});

//Enviar info a server
socket.emit('enviarmensaje',{
    usuario: 'Jose Luis',
    mensaje: 'Esta es un mensaje'
}, function(){
    console.log('callback');
});

//Escuchar al server
socket.on('enviarmensaje', (mensaje)=>{
    console.log(mensaje);
});