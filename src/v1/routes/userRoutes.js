const express = require('express')
const userController = require('../../controllers/userController')

const router = express.Router()

router.route('/register').post(userController.registroUsuario)
function hola (req, res) {
  res.send('hola bola')
}
router.get('/user', hola)

module.exports = router
