const { usuarioEstadoConexion, getUsuarios, guardarMensaje } = require('../controller/sockets')
const { comprobarJWT } = require('../helper/jwt')

class Sockets {
  constructor (io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents () {
    // On connection
    this.io.on('connection', async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query.Authorization)

      // TODO: Validar JWT
      // Si el token no es valido desconectar
      if (!valido) {
        console.log('socket no identificado')
        socket.disconnect()
      }

      // Saber el usuario que esta activo por uid
      await usuarioEstadoConexion(uid)

      // unir al usuario a una sala de socket.io
      // TODO: Socket Join, uid
      socket.join(uid)

      // TODO: Emitir todos los usuarios conectados
      this.io.emit('lista-usuarios', await getUsuarios())

      // TODO: Escuchar cuando el cliente manda un mensajes mensaje-personal
      socket.on('mensaje-personal', async (payload) => {
        const mensaje = await guardarMensaje(payload)
        this.io.to(payload.para).emit('mensaje-personal', mensaje)
        this.io.to(payload.de).emit('mensaje-personal', mensaje)
      })

      // TODO: Disconnect
      // Marcar como desconectado en DB
      socket.on('disconnect', async () => {
        await usuarioEstadoConexion(uid, false)
        this.io.emit('lista-usuarios', await getUsuarios())
      })
    })
  }
}

module.exports = Sockets
