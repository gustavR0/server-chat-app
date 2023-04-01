const { Router } = require('express')
const { validarJWT } = require('../middleware/validar-jwt')
const { obtenerChat } = require('../controller/mensaje')

const router = Router()

router.get('/:de', validarJWT, obtenerChat)

module.exports = router
