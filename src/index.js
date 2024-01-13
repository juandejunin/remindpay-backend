require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

// Importa tus módulos y middlewares personalizados
const db = require('./database/db')
const recordatorioPorCorreo = require('../src/utils/recordatorioPorCorreo')
const { logger, LogEntry } = require('../logger/apiLogger')
const { routerAuth } = require('./v1/routes/userRoutes')
const reminderRoutes = require('./v1/routes/reminderRoutes')
const unknownEndpoint = require('../src/middlewares/unknowEndpoint')
const errorHandler = require('../src/middlewares/errorHandler')
const { swaggerDocs: V1swaggerDocs } = require('./v1/swagger')

const app = express()
const port = process.env.PORT || 3000

// Conexión a la base de datos.
db.connectDB()

// Middlewares globales
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(helmet())

// Verificar recordatorios de BBDD y enviar notificaciones.
recordatorioPorCorreo()

// Ruta de inicio
app.get('/', (req, res) => {
  logger.info('Se ha realizado una solicitud GET en la ruta /')
  res.send('RemindPay')
})

// Rutas para usuarios y recordatorios

app.use('/api/v1/auth', routerAuth)
app.use('/api/v1/reminder', reminderRoutes)

// Middleware para manejar rutas desconocidas y errores
app.use(unknownEndpoint)
app.use(errorHandler)

// Iniciar el servidor
app.listen(port, () => {
  logger.info(`Server started on port ${port}`)
  V1swaggerDocs(app, port)
})

module.exports = app
