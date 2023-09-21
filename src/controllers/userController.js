const userService = require('../services/userService')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('../utils/jwt')

const registerUser = async (req, res) => {
  try {
    // Recoger datos de la petición
    const params = req.body;

    // Comprobar que se envían todos los datos obligatorios
    if (!params.username || !params.email || !params.password || !params.nick) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos que son obligatorios",
      });
    }

    // Control de usuarios duplicados
    const existingUser = await User.findOne({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    });

    if (existingUser) {
      return res.status(200).json({
        status: "success",
        message: "El usuario ya existe",
      });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(params.password, 10);
    params.password = hashedPassword;

    // Guardar información del nuevo usuario
    const newUser = new User(params);

    // Guardar en la base de datos
    await newUser.save();

    // Devolver el resultado
    return res.status(200).json({
      status: "success",
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error en el servidor",
    });
  }
};


const loginUser = async (req, res) => {
  // Recoger parametros que lleguen en la peticion
  let params = req.body;

  if (!params.email || !params.password) {
    return res.status(404).send({
      status: "error",
      message: "faltan datos por enviar"
    });
  }

  try {
    // Buscar en la base de datos
    const user = await User.findOne({ email: params.email }).exec();

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "No se encuentra el usuario"
      });
    }

    // Comprobar la contraseña
    let pwd = bcrypt.compareSync(params.password, user.password);

    if (!pwd) {
      return res.status(400).send({
        status: "error",
        message: "No te identificaste correctamente"
      });
    }

    // Devolver token
    const token = jwt.createToken(user);

    // Devolver datos de usuario
    return res.status(200).send({
      status: "success",
      message: "accion de login",
      user: {
        id: user._id,
        name: user.name,
        nick: user.nick
      },
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en el servidor"
    });
  }
};


const verifyEmail = async (req, res, next) => {
  try {
    const { success } = await userService.verifyEmail(req)
    if (success === true) {
      res.redirect(process.env.URL_SIGNIN)
    } else {
      res.redirect(process.env.URL_REGISTER)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {   registerUser, loginUser, verifyEmail }
