const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
  // Hader: Authorization opcioonal puede ser personalizado ejemplo: x-token
  const token = req.header('Authorization') || ''

  if (!token) return res.status(401).json({ ok: false, msg: 'No hay token en la petición' })

  try {
    const { uid } = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_KEY)

    req.uid = uid
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token ha caducado'
    })
  }

  next()
}

module.exports = {
  validarJWT
}
