
const express = require('express')

const {validateJwt, handleErrorAuthentication} = require('../../middlewares/tokenValidator')


const routerSetting = express.Router()

// routerSetting.route('/register').post(registerUser)

const prueba = async (req, res) => {
  
  return res.send('Si llegaste  hasta aca es porque pudiste autenticarte exitosamente')
}

routerSetting.get('/seting', validateJwt,handleErrorAuthentication, prueba )

module.exports = routerSetting
