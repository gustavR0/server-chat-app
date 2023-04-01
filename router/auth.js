const { Router } = require('express')
const { crearUsuario, login, renew } = require('../controller/auth')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos')
const { validarJWT } = require('../middleware/validar-jwt')

const router = Router()
// Crear nuevos usuarios
// localhost:8080/api/login/new
router.post('/new', [
  check('nombre', 'El nombre es necesario').not().isEmpty(),
  check('email', 'El email es necesario').isEmail(),
  check('password', 'El password es necesario').not().isEmpty(),
  validarCampos
], crearUsuario)

// Login usario
// localhost:8080/api/login/
router.post('/', [
  check('email', 'El email es necesario').isEmail(),
  check('password', 'El password es necesario').not().isEmpty(),
  validarCampos
], login)

// Renew token
// localhost:8080/api/login/renew
router.get('/renew', [validarJWT], renew)

module.exports = router
