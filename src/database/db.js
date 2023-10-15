const mongoose = require('mongoose')
const { logger, LogEntry } = require('../../logger/apiLogger')

const connectDB = () => {
  mongoose.connect(process.env.URL_MONGO)
    .then(() => { logger.info('BBDD conectada') })
    .catch(err => { console.error(err) })
}

const disconnectDB = () => {
  mongoose.disconnect()
    .then(() => { logger.info('BBDD desconectada') })
    .catch(err => { console.error(err) })
}

module.exports = { connectDB, disconnectDB }
