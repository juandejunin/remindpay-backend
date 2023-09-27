const express = require('express')
const expressSanitizer = require('express-sanitizer')
const { body, validationResult } = require('express-validator')
const { registerUser } = require('../../controllers/userController')

const routerAuth = express.Router()

// Configura express-sanitizer como middleware
routerAuth.use(expressSanitizer())

// Ruta de registro que utiliza express-validator y express-sanitizer
routerAuth.post('/registeree', [
  body('username').trim().escape(),
  body('email').trim().escape(),
  body('password').trim().escape()
], (req, res) => {
  // Handle validation and registration logic here
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Access sanitized data
  const { username, email, password } = req.body

  // Call registerUser function or handle registration logic here

  res.json({ message: 'Registration successful' })
})

module.exports = routerAuth
