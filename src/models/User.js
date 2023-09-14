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
  setting: [{
    type: Schema.Types.ObjectId,
    ref: 'Setting'
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
    delete returnedObject._id
  }
})

const User = model('User', userSchema)

module.exports = User
