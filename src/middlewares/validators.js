const { body } = require('express-validator')
const Joi = require('joi')

const registroValidator = [

  body('username').trim().not().isEmpty().withMessage('Username is required'),

  body('email').trim().not().isEmpty().withMessage('Email is required')
    .isEmail().normalizeEmail().withMessage('Invalid email'),

  body('password').trim().not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must have at least 6 characters')
]

const loginValidator = [
  body('email').trim().not().isEmpty().withMessage('Email is required')
    .isEmail().normalizeEmail().withMessage('Invalid email'),

  body('password').trim().not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must have at least 6 characters')
]

const modificarUsuarioValidator = [
  body('password').optional({ nullable: true }).isString().withMessage('Invalid password')
    .isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),

  body('name').optional({ nullable: true }).isString().withMessage('Invalid name'),

  body('username').optional({ nullable: true }).isString().withMessage('Invalid username')
]

const guardarBusquedaValidator = [
  body('text').trim().not().isEmpty().isString().withMessage('Invalid search')
]

const reminderValidator = [
  body('remindername').trim().not().isEmpty().withMessage('remindername is required'),
  body('price').optional({ nullable: true }).isString().withMessage('Invalid price'),
  body('date')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid date')
    .custom((value, { req }) => {
      const dateSchema = Joi.string().isoDate()
      const validationResult = dateSchema.validate(value)
      if (validationResult.error) {
        throw new Error('Invalid date format')
      }
      return true
    })
]

module.exports = { registroValidator, loginValidator, modificarUsuarioValidator, guardarBusquedaValidator, reminderValidator }
