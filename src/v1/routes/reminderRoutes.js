const express = require('express')
const { createReminder, readReminder, deleteReminder, readOneReminder } = require('../../controllers/reminderController')
const {validateJwt, handleErrorAuthentication} = require('../../middlewares/tokenValidator')
const check = require("../../middlewares/auth")

const routerReminder = express.Router()

const prueba = async (req, res) => {

    return res.send('Si llegaste  hasta aca es porque pudiste autenticarte exitosamente')
}

routerReminder.get('/',check.auth, prueba )

// routerReminder.route('/create-reminder').post(createReminder)

routerReminder .post("/create", check.auth, createReminder)
routerReminder .get("/read/:id",check.auth, readOneReminder)
routerReminder .get("/read", check.auth, readReminder)
routerReminder .delete("/delete/:id",check.auth, deleteReminder)


module.exports = routerReminder