const express = require('express')
const { registerUser, loginUser, verifyEmail } = require('../../controllers/userController')

const routerAuth = express.Router()

routerAuth.route('/register').post(registerUser)
routerAuth.route('/login').post(loginUser)
routerAuth.route('/user/verify/:cryptoToken').get(verifyEmail)

function hola (req, res) {
  res.send('hola gente')
}
routerAuth.get('/user', hola)

module.exports = routerAuth
