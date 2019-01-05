const { io } = require('../server');

io.on('connection', (client) => {

    console.log('User connect');

    //Enviar al cliente
    client.emit('enviarmensaje', {
        usuario: 'admin',
        mensaje: 'bienvenido a esta app'
    })

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //Escuchar cliente 
    client.on('enviarmensaje', (data, callback) => {
        console.log(data);
        client.broadcast.emit('enviarmensaje', data);
        //callback()
    });
});