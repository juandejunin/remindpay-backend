const express = require('express')
const { registerUser, loginUser, verifyEmail, deleteUser } = require('../../controllers/userController')
const { registroValidator, loginValidator } = require('../../middlewares/validators')
const check = require('../../middlewares/auth')

const routerAuth = express.Router()

routerAuth.route('/register').post(registroValidator, registerUser)
routerAuth.route('/login').post(loginValidator, loginUser)
routerAuth.route('/user/verify/:cryptoToken').get(verifyEmail)
routerAuth.delete('/delete/:id', check.auth, deleteUser)

function hola (req, res) {
  res.send('hola gente')
}
routerAuth.get('/user', hola)
routerAuth.get('/', (req, res) => {
  return res.json({ msg: "all users" })
})

module.exports = routerAuth
