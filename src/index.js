// Importa y configura la biblioteca 'dotenv' para cargar las variables de entorno desde un archivo .env.
require('dotenv').config()
const {programarTareaConAnticipacion} = require('../src/utils/scheduler')
const { logger, LogEntry } = require('../logger/apiLogger')
// Importa y conecta a la base de datos utilizando el módulo './database/db'.
require('./database/db').connectDB()

const bodyParser = require('body-parser')

// Importa las bibliotecas y módulos necesarios.
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

// const swaggerUI = require('swagger-ui-express')

// Importa la documentación de API desde './docs'.

// Importa las rutas para diferentes recursos.
const userRoutes = require('./v1/routes/userRoutes')

const reminderRoutes = require('./v1/routes/reminderRoutes')

// Importa middleware personalizado para manejar rutas desconocidas y errores.
const unknownEndpoint = require('../src/middlewares/unknowEndpoint')
const errorHandler = require('../src/middlewares/errorHandler')
// Crea una instancia de la aplicación Express.
const app = express()

// Obtiene el puerto del archivo .env.
const port = process.env.PORT

// Configura middlewares globales para la aplicación Express.
app.use(express.urlencoded({ extended: true }))
app.use(cors()) // Habilita el soporte CORS (Cross-Origin Resource Sharing).
app.use(express.json()) // Permite el análisis de solicitudes JSON.
app.use(bodyParser.json())
app.use(helmet()) // Configura encabezados de seguridad HTTP con Helmet.

app.get('/', (req, res) => {
  logger.info('Se ha realizado una solicitud GET en la ruta /')
  res.send('¡Hola, mundo!')
})

// Define rutas para diferentes recursos utilizando las rutas importadas.
app.use('/api/auth', userRoutes) // Rutas relacionadas con usuarios.

app.use('/api/reminder', reminderRoutes)

// Configura una ruta para la documentación de la API utilizando Swagger.

// Configura middleware para manejar rutas desconocidas.
app.use(unknownEndpoint)
// Configura middleware para manejar errores.
app.use(errorHandler)

programarTareaConAnticipacion()

// Inicia el servidor Express en el puerto definido en PORT.
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

module.exports = app
