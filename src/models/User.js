const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: true // Valor predeterminado: usuario activo
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  security: {
    verified: Boolean,
    cryptoToken: String,
    restorePassword: Boolean
  },
  reminder: [{
    type: Schema.Types.ObjectId,
    ref: 'Reminder'
  }],
  Rol: [{
    type: Schema.Types.ObjectId,
    default: 'user',
    ref: 'Rol'
  }],
  searches: [{
    type: Schema.Types.ObjectId,
    ref: 'Search'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password
    // delete returnedObject._id
  }
})

const User = model('User', userSchema)

module.exports = User

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         active:
 *           type: boolean
 *           example: true
 *         security:
 *           type: object
 *           properties:
 *             verified:
 *               type: boolean
 *               example: true
 *             cryptoToken:
 *               type: string
 *               example: abcdef123456
 *             restorePassword:
 *               type: boolean
 *               example: false
 *         reminder:
 *           type: array
 *           items:
 *             type: string
 *           example: ["61dbae02-c147-4e28-863c-db7bd402b2d6"]
 *         Rol:
 *           type: array
 *           items:
 *             type: string
 *           example: ["user"]
 *         searches:
 *           type: array
 *           items:
 *             type: string
 *           example: ["61dbae02-c147-4e28-863c-db7bd402b2d6"]
 */
