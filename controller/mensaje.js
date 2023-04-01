const { response } = require('express')
const Mensaje = require('../models/mensaje')

const obtenerChat = async (req, res = response) => {
  const { uid } = req
  const mensajesDe = req.params.de

  const mensajes = await Mensaje.find({
    $or: [
      { de: uid, para: mensajesDe },
      { de: mensajesDe, para: uid }
    ]
  })
    .sort({ createdAt: 'desc' })
    .limit(30)

  res.json({
    mensajes
  })
}

module.exports = {
  obtenerChat
}
