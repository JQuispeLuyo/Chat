const { io } = require('../server');
const { Usuarios } = require('../classes/usuario');
const { mensaje } = require('../utilidad/utilidad');
let usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('unirChat', (data, callback) => {
        if (!data.usuario) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            })
        }
        let nombre = data.usuario;
        let personas = usuarios.agregarPersona(client.id, nombre);

        client.broadcast.emit('lista', {
            listaUsuarios: usuarios.getPersonas()
        })

        callback(personas);
    });


    client.on('mandarMensaje', (data) => {
        client.broadcast.emit('mandarMensaje', mensaje(data.usuario, data.mensaje))
    })


    client.on('disconnect', () => {
        let userDelete = usuarios.borrarPersona(client.id);

        if (!userDelete) {
            return ({
                error: true,
                mensaje: 'No se encuentra el usuario en la base de datos'
            })
        }
        client.broadcast.emit('salio', {
            usuario: 'Administrador',
            mensaje: `El usuario ${userDelete.nombre} ha abandonado el chat`
        });

        client.broadcast.emit('lista', {
            listaUsuarios: usuarios.getPersonas()
        })
    });

});