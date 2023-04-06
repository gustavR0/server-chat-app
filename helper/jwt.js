const jwt = require('jsonwebtoken')

const generarJWT = (body, expiresIn) => {
  return new Promise((resolve, reject) => {
    const payload = body

    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      resolve(token)
    })
  })
}

const comprobarJWT = (token = '') => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY)
    return [true, uid]
  } catch (error) {
    return [false, null]
  }
}

module.exports = {
  generarJWT,
  comprobarJWT
}
