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

module.exports = {
  generarJWT
}
