// const { createLogger, format, transports } = require('winston')
// const { combine, timestamp, label, printf } = format
// const mongoose = require('mongoose')

// const myFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} [${level}] ${message}`
// })

// const apiLogger = () => {
//   return createLogger({
//     level: 'debug',
//     format: combine(format.colorize(), timestamp({ format: 'HH:mm:ss' }), myFormat),

//     // defaultMeta: { service: 'user-service' },
//     transports: [
//       new transports.Console(),
//       new transports.File({ filename: 'error.log', level: 'error' }),
//       new transports.File({ filename: 'combined.log' })

//     ]
//   })
// }
// require('../src/database/db').connectDB()

// const LogEntry = mongoose.model('LogEntry', {
//   timestamp: Date,
//   level: String,
//   message: String
// })

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
