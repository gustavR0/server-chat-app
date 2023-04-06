const Usuario = require('../models/usuario')
const Mensaje = require('../models/mensaje')

const usuarioEstadoConexion = async (uid, online = true) => {
  const usuario = await Usuario.findById(uid)
  usuario.online = online
  await usuario.save()
  return usuario
}

const getUsuarios = async () => await Usuario.find().sort('-online')

const guardarMensaje = async (payload) => {
  try {
    const mensaje = new Mensaje(payload)
    await mensaje.save()
    return mensaje
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = {
  usuarioEstadoConexion,
  getUsuarios,
  guardarMensaje
}
