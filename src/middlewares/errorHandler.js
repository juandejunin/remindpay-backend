const { createResponse } = require('../utils/responseGenerator')
const { logger, LogEntry } = require('../../logger/apiLogger')

const errorHandler = (error, request, response, next) => {
  let responseData = null

  if (error.name === 'CastError') {
    responseData = createResponse(false, null, 'Invalid id', 400)
  } else if (error.name === 'ValidationError') {
    responseData = createResponse(false, null, error.message, 400)
  } else if (error.name === 'TokenExpiredError') {
    responseData = createResponse(false, null, 'The token has expired', 401)
  } else if (error.name === 'JsonWebTokenError') {
    responseData = createResponse(false, null, 'Your request does not have an authorization header or it is incorrect', 401)
  }

  if (!responseData) {
    next(error)
  }

  const { success, data, errorMsg, statusCode } = responseData
  const resp = {
    success,
    data,
    errorMsg
  }
  logger.error(error.stack)
  response.status(statusCode).json(resp)
}

module.exports = errorHandler
