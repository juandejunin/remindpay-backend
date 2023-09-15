const express = require('express')
const {registerUser,loginUser, verifyEmail} = require('../../controllers/userController')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/user/verify/:cryptoToken').get(verifyEmail)


function hola (req, res) {
  res.send('hola gente')
}
router.get('/user', hola)

module.exports = router
