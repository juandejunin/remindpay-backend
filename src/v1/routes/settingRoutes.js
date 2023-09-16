
const express = require('express')

const tokenValidator = require('../../middlewares/tokenValidator')


const routerSetting = express.Router()

// routerSetting.route('/register').post(registerUser)



function hola (req, res) {
  res.send('Hola gente desde setting, si estas aca es porque pudiste autenticarte exitosamente')
}
routerSetting.get('/',tokenValidator, hola )

module.exports = routerSetting


