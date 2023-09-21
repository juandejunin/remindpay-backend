const jwt = require('jsonwebtoken')

const signToken = (userToken) => {
  console.log(userToken)
  return jwt.sign(userToken,
    process.env.JWT_SECRET_KEY,
    { expiresIn: '12h' }
  )
}

const verifyToken = (request) => {
  const authorization = request.headers.authorization?.toLowerCase().startsWith('bearer ')
  const token = authorization ? request.headers.authorization?.split(' ')[1] : null
  if (token) {
    try {
      const payload = validateToken(token)
      request.userPayload = payload // Devuelve el payload completo
    } catch (error) {
      // Manejar errores de verificación de token
      console.error('Error de verificación de token:', error)
    }
  }
}

const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY)
}


module.exports = { signToken, verifyToken}


