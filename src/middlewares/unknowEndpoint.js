const { createResponse } = require('../utils/responseGenerator')

const unknownEndpoint = (request, response, next) => {
  // Verifica si la solicitud es para Swagger
  if (request.url.startsWith('/api/v1/docs')) {
    // Si es una solicitud para Swagger, pasa al siguiente middleware (Swagger)
    next()
  } else {
    // Si no es una solicitud para Swagger, maneja como un endpoint desconocido
    const { success, data, errorMsg, statusCode } = createResponse(false, null, 'Endpoint not registered', 404)
    const resp = {
      success,
      data,
      errorMsg
    }
    response.status(statusCode).json(resp)
  }
}

module.exports = unknownEndpoint
