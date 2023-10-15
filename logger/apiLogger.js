const winston = require('winston')
const { createLogger, format, transports } = winston
const { combine, timestamp, json } = format
const mongoose = require('mongoose')
// const { LogEntry } = require('./logEntry')
const MongoDB = require('winston-mongodb').MongoDB

// Conecta a la base de datos MongoDB
mongoose.connect(process.env.URL_MONGO)
  .then(() => {
    console.log('BBDD conectada')
  })
  .catch(err => {
    console.error(err)
  })

// Define un transporte personalizado para MongoDB
const customMongoTransport = new MongoDB({
  db: process.env.URL_MONGO, // Reemplaza esto con tu URL de MongoDB
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
