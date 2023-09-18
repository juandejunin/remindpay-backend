const jwt = require('jsonwebtoken')

const signToken = (userToken) => {
  return jwt.sign(userToken,
    process.env.JWT_SECRET_KEY,
    { expiresIn: '12h' }
  )
}


module.exports = { signToken }