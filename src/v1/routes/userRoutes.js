const express = require('express')
const { registerUser, loginUser, verifyEmail } = require('../../controllers/userController')
const { registroValidator, loginValidator } = require('../../middlewares/validators')

const routerAuth = express.Router()

routerAuth.route('/register').post(registroValidator, registerUser)
routerAuth.route('/login').post(loginValidator, loginUser)
routerAuth.route('/user/verify/:cryptoToken').get(verifyEmail)
// routerAuth.post('/registro', registroValidator, registerUser)
function hola (req, res) {
  res.send('hola gente')
}
routerAuth.get('/user', hola)

module.exports = routerAuth
