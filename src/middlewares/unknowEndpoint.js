const { createResponse } = require('../utils/responseGenerator')

const unknownEndpoint = (request, response) => {
  const { success, data, errorMsg, statusCode } = createResponse(false, null, 'Endpoint not registered', 404)
  const resp = {
    success,
    data,
    errorMsg
  }
  response.status(statusCode).json(resp)
}

module.exports = unknownEndpoint