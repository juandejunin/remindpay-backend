// Importar modulos
const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

// importar clave secreta

// clave secreta
const SECRET_KEY = process.env.JWT_SECRET_KEY

// Middleware de autenticacion
exports.auth = (req, res, next) => {
  // Comprobar sime llega la cabecera de auth
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: 'error',
      message: 'La peticion no tiene la cabecera de autenticacion'
    })
  }
  // limpiar token
  const token = req.headers.authorization.replace(/[]"+/g, '')
  // Decodificar token
  try {
    const payload = jwt.decode(token, SECRET_KEY)

    // comprobar expiracion del token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        status: 'error',
        message: 'Token expirado'

      })
    }

    // Agregar datos de usuario a request
    req.user = payload
  } catch (error) {
    return res.status(404).send({
      status: 'error',
      message: 'Token invalido',
      error
    })
  }
  // Pasar a la ejecucion de accion
  next()
}
