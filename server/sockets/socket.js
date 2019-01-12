const { io } = require('../server');
const { Usuarios } = require('../classes/usuario');
const { mensaje } = require('../utilidad/utilidad');
let usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('unirChat', (data, callback) => {

        console.log(data);

        if (!data.usuario || !data.room) {
            return callback({
                error: true,
                mensaje: 'El nombre y la sala son necesarios'
            })
        }

        client.join(data.room);

        let personas = usuarios.agregarPersona(client.id, data.usuario, data.room);

        client.broadcast.to(data.room).emit('lista', {
            listaUsuarios: usuarios.getPersonasPorSala(data.room)
        })

        callback(personas);
    });


    client.on('mandarMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(persona.room).emit('mandarMensaje', mensaje(persona.nombre, data.mensaje))
    })


    client.on('disconnect', () => {
        let userDelete = usuarios.borrarPersona(client.id);

        if (!userDelete) {
            return ({
                error: true,
                mensaje: 'No se encuentra el usuario en la base de datos'
            })
        }
        client.broadcast.to(userDelete.room).emit('salio', {
            usuario: 'Administrador',
            mensaje: `El usuario ${userDelete.nombre} ha abandonado el chat`
        });

        client.broadcast.to(userDelete.room).emit('lista', {
            listaUsuarios: usuarios.getPersonasPorSala(userDelete.room)
        })
    });

    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', mensaje(persona.nombre, data.mensaje));

    })

});