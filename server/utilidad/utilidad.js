function mensaje(usuario, mensaje) {
    return ({
        usuario,
        mensaje,
        fecha: new Date().getTime()
    })
}

module.exports = {
    mensaje
}