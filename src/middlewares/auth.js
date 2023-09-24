// Importar módulos
const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

// Clave secreta
const SECRET_KEY = process.env.JWT_SECRET_KEY

// Middleware de autenticación
exports.auth = (req, res, next) => {
  // Comprobar si llega la cabecera de autenticación
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    return res.status(403).send({
      status: 'error',
      message: 'La petición no tiene la cabecera de autenticación'
    })
  }

  // Verificar si la cabecera de autorización comienza con 'Bearer ' (sin distinción de mayúsculas/minúsculas).
  const isBearerToken = authorizationHeader.toLowerCase().startsWith('bearer ')

  if (!isBearerToken) {
    return res.status(401).send({
      status: 'error',
      message: 'Formato de autorización inválido. Se espera un token tipo "Bearer <token>"'
    })
  }

  // Extraer el token después de 'Bearer '.
  const token = authorizationHeader.split(' ')[1]

  // Decodificar token
  try {
    const payload = jwt.decode(token, SECRET_KEY)

    // Comprobar la expiración del token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        status: 'error',
        message: 'Token expirado'
      })
    }

    // Agregar datos de usuario a request
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).send({
      status: 'error',
      message: 'Token inválido',
      error
    })
  }
}
