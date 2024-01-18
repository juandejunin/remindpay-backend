const winston = require('winston')
const { createLogger, format, transports } = winston
const { combine, timestamp, json } = format
const mongoose = require('mongoose')
// const { LogEntry } = require('./logEntry')
const MongoDB = require('winston-mongodb').MongoDB

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.URL_MONGO)
  .then(() => {
    console.log('BBDD conectada')
  })
  .catch(err => {
    console.error(err)
  })

// Definir un transporte personalizado para MongoDB
const customMongoTransport = new MongoDB({
  db: process.env.URL_MONGO, // URL de MongoDB
  collection: 'logs', // Nombre de la colección donde se guardarán los logs
  options: {
    useUnifiedTopology: true
  }
})

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
    customMongoTransport // Transporte personalizado para MongoDB
  ]
})

module.exports = { logger }
