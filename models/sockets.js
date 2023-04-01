
class Sockets {
  constructor (io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents () {
    // On connection
    this.io.on('connection', (socket) => {
      // TODO: Validar JWT
      // Si el token no es valido desconectar

      // Saber el usuario que esta activo por uid

      // TODO: Emitir todos los usuarios conectados

      // TODO: Socket Join, uid

      // TODO: Escuchar cuando el cliente manda un mensajes mensaje-personal

      // TODO: Disconnect
      // Marcar como desconectado en DB
      // TODO: Emitir todos los usuarios conectados
    })
  }
}

module.exports = Sockets
