const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helper/jwt')

const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body

    const existEmail = await Usuario.findOne({ email })
    // Verificar email
    if (existEmail) return res.status(400).json({ msg: 'El email ya esta en uso' })

    const usuario = new Usuario(req.body)
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    // Guardar en DB
    await usuario.save()

    // Generar JWT (JSON Web Token)
    const token = await generarJWT({ uid: usuario.id }, '2h')

    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hablar Administrador'
    })
  }
}

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body

    const usuario = await Usuario.findOne({ email })

    if (!usuario) return res.status(404).json({ msg: 'Usuario o contraseña incorrecta' })

    // validar password
    const validatePassword = bcrypt.compareSync(password, usuario.password)

    if (!validatePassword) return res.status(404).json({ msg: 'Usuario o contraseña incorrecta' })

    const token = await generarJWT({ uid: usuario.id }, '2h')

    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hablar Administrador'
    })
  }
}

const renew = async (req, res = response) => {
  const { uid } = req

  const token = await generarJWT({ uid }, '2h')

  const usuario = await Usuario.findById(uid)

  res.json({
    usuario,
    token
  })
}

module.exports = {
  crearUsuario,
  login,
  renew
}
