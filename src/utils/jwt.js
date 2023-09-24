// Importar dependencias
const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

// clave secreta
const SECRET_KEY = process.env.JWT_SECRET_KEY

// crear funcion para generar tokens
exports.createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    imagen: user.imagen,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix()

  }
  return jwt.encode(payload, SECRET_KEY)
}

// devolver jwt token codificado
