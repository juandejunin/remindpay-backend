const express = require('express')
const { createReminder, readReminder, readOneReminder, updateReminder, deleteReminder } = require('../../controllers/reminderController')
// const { validateJwt, handleErrorAuthentication } = require('../../middlewares/tokenValidator')
const check = require('../../middlewares/auth')
const { reminderValidator } = require('../../middlewares/validators')

const routerReminder = express.Router()

const prueba = async (req, res) => {
  return res.send('Si llegaste  hasta aca es porque pudiste autenticarte exitosamente')
}

routerReminder.get('/', check.auth, prueba)

// routerReminder.route('/create-reminder').post(createReminder)

routerReminder.post('/create', check.auth, reminderValidator, createReminder)
routerReminder.get('/read', check.auth, readReminder)
routerReminder.get('/read/:id', check.auth, readOneReminder)
routerReminder.put('/update/:id', check.auth, updateReminder)
routerReminder.delete('/delete/:id', check.auth, deleteReminder)

module.exports = routerReminder
