const userService = require('../services/userService')

const registroUsuario = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await userService.registroUsuario(req)
    const response = {
      success,
      data,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = { registroUsuario }
