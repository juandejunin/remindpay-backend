const winston = require('winston')
const mongoose = require('mongoose')

// Configuración de Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// Conexión a MongoDB con Mongoose

const LogEntry = mongoose.model('LogEntry', {
  timestamp: Date,
  level: String,
  message: String
})

module.exports = { logger, LogEntry }
