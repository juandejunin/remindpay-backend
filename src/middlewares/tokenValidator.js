const jwt = require('jsonwebtoken')
const { expressjwt: expressJwt } = require("express-jwt");

// Obtener la clave secreta desde una variable de entorno
const secretKey = process.env.JWT_SECRET_KEY;

// Configurar el middleware de validación JWT
const validateJwt = expressJwt({ 
  secret: secretKey,
  algorithms: ['HS256'],
})

/**
 * Middleware personalizado para manejar errores de autenticación.
 * @param {Object} err - Error de autenticación.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {function} next - Función para pasar el control al siguiente middleware.
 */

// Middleware personalizado para manejar errores de autenticación
function handleErrorAuthentication(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Token inválido o no proporcionado' });
  }
  next()
}

module.exports = {validateJwt, handleErrorAuthentication}