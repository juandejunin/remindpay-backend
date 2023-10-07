const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('../utils/jwt')
const { validationResult } = require('express-validator')
const { initUserSeguridad, verificarUser, buildForgotPassword, passwordReset } = require('../utils/verificationManager')
const { sendVerificationMail, sendForgotPasswordMail, sendChangedPasswordMail } = require('../utils/emailTransporter')
const buildHostName = require('../utils/hostManager')

// Mensaje de error estándar en caso de problemas al obtener un usuario.
const USER_ERROR = 'Error getting user'

// Número de rondas de sal para el algoritmo de hashing de contraseñas.
const SALT_ROUNDS = 10

// Mensaje para usuarios no verificados.
const MSG_NO_VERIFICADO = 'You must verify the account. Check your mail'

// Función para registrar un usuario.
const registerUser = async (req, res) => {
  let data = null

  // // Valida los datos del usuario utilizando las reglas definidas en validationResult.
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Extrae los campos del cuerpo de la solicitud.
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(401).send({
      status: 'error',
      data,
      message: 'The username, email and password fields are required'
    })
  }

  // // Verifica si ya existe un usuario con el mismo nombre de usuario o correo electrónico.
  const usernameExists = await User.findOne({ username })
  const emailExists = await User.findOne({ email })

  if (usernameExists || emailExists) {
    return res.status(400).send({
      status: 'error',
      data,
      message: 'Invalid Email/Username'
    })
  }

  // // Genera un hash de la contraseña antes de almacenarla en la base de datos.
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  // // Crea un objeto userData con los datos del usuario y la contraseña hash.
  const userData = req.body
  userData.password = passwordHash
  userData.security = initUserSeguridad() // Inicializa la seguridad del usuario.

  // // Crea un nuevo usuario en la base de datos.
  const createdUser = await User.create(userData)

  // // Envía un correo de verificación al usuario recién registrado.
  await sendVerificationMail(createdUser, buildHostName(req))

  data = {
    msg: 'Registered successfully. ' + MSG_NO_VERIFICADO,
    id: createdUser._id
  }

  return res.status(201).send({
    status: 'success',
    // data,
    message: 'User created'
  })
}

const loginUser = async (req, res) => {
  // Recoger parametros que lleguen en la peticion
  const params = req.body

  // // Valida los datos del usuario utilizando las reglas definidas en validationResult.
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  if (!params.email || !params.password) {
    return res.status(404).send({
      status: 'error',
      message: 'missing data to send'
    })
  }

  try {
    // Buscar en la base de datos
    const user = await User.findOne({ email: params.email }).exec()

    if (!user) {
      return res.status(404).send({
        status: 'error',
        message: 'User not found'
      })
    }

    // Comprobar la contraseña
    const pwd = bcrypt.compareSync(params.password, user.password)

    if (!pwd) {
      return res.status(400).send({
        status: 'error',
        message: 'You did not identify yourself correctly'
      })
    }

    // Devolver token
    const token = jwt.createToken(user)

    // Devolver datos de usuario
    return res.status(200).send({
      status: 'success',
      message: 'login action',
      user: {
        id: user._id,
        name: user.name,
        nick: user.nick
      },
      token
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      status: 'error',
      message: 'Server error'
    })
  }
}

/**
 * Función para verificar la dirección de correo electrónico de un usuario mediante un token criptográfico.
 *
 * @param {Object} req - Objeto de solicitud HTTP que contiene el token criptográfico en los parámetros.
 * @returns {Object} - Objeto de respuesta que indica el resultado de la operación de verificación.
 */

const verifyEmail = async (req, res) => {
  let data = null

  try {
    // Paso 1: Obtener el token criptográfico de los parámetros de la solicitud
    const { cryptoToken } = req.params

    // Paso 2: Buscar al usuario en la base de datos por el token criptográfico
    const userExists = await User.findOne({ 'security.cryptoToken': cryptoToken })

    // Paso 3: Verificar si se encontró un usuario con el token criptográfico
    if (!userExists) {
      return res.status(400).send({
        status: 'error',
        message: USER_ERROR
      })
    }

    // Paso 4: Realizar la verificación de la dirección de correo electrónico del usuario
    userExists.security = verificarUser(userExists)

    // Paso 5: Actualizar la información del usuario en la base de datos
    const userUpdated = await User.findOneAndUpdate(
      { 'security.cryptoToken': cryptoToken }, // Condición de búsqueda
      { $set: { 'security.verified': true } }, // Actualización
      { new: true } // Opciones para devolver el documento actualizado
    )

    // Paso 6: Preparar los datos de respuesta con la información actualizada del usuario
    data = {
      email: userUpdated.email,
      username: userUpdated.username,
      verified: userUpdated.security.verified
    }

    // Paso 7: Redireccionar al usuario a la página adecuada
    if (userUpdated.security.verified === true) {
      res.redirect(process.env.URL_SIGNIN)
    } else {
      res.redirect(process.env.URL_REGISTER)
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la validación
    return res.status(500).send({
      status: 'error',
      message: error.message
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    // Obtiene el ID del usuario que se desea eliminar desde los parámetros de la solicitud.
    const { id } = req.params
    const decodedToken = 'user'
    const IdUserRequest = req.user.id
    // Verifica si el usuario autenticado es el propietario del documento o es un superusuario administrador.
    if (id !== IdUserRequest && !decodedToken.isAdmin) {
      return res.status(403).send({
        status: 'error',
        message: 'Unauthorized: You do not have permission to delete this user'
      })
    }

    // Busca el usuario en la base de datos por su ID.
    const user = await User.findById(id)

    // Verifica si el usuario existe.
    if (!user) {
      return res.status(404).send({
        status: 'error',
        message: 'User not found'
      })
    }
    // Realiza la eliminación del usuario.
    await user.deleteOne({ _id: id })

    return res.status(200).send({
      status: 'success',
      message: 'User deleted'
    })
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la eliminación.
    console.error(error)
    return res.status(500).send({
      status: 'error',
      message: 'Server error'
    })
  }
}

// const deleteUser = async (req, res) => {
//   try {
//     // Obtiene el ID del usuario que se desea eliminar desde los parámetros de la solicitud.
//     const { id } = req.params

//     console.log(id)
//     // Busca el usuario en la base de datos por su ID.
//     const user = await User.findById(id)

//     // Verifica si el usuario existe.
//     if (!user) {
//       return res.status(404).send({
//         status: 'error',
//         message: 'User not found'
//       })
//     }

//     // Realiza la eliminación del usuario.
//     await user.deleteOne({ _id: id })

//     return res.status(200).send({
//       status: 'success',
//       message: 'User deleted'
//     })
//   } catch (error) {
//     // Maneja cualquier error que pueda ocurrir durante la eliminación.
//     console.error(error)
//     return res.status(500).send({
//       status: 'error',
//       message: 'Server error'
//     })
//   }
// }

module.exports = { registerUser, loginUser, verifyEmail, deleteUser }
