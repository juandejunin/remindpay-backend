// Importa y configura la biblioteca 'dotenv' para cargar las variables de entorno desde un archivo .env.
require('dotenv').config()

// Importa y conecta a la base de datos utilizando el módulo './database/db'.
require('./database/db').connectDB()

// Importa las bibliotecas y módulos necesarios.
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
// const swaggerUI = require('swagger-ui-express')

// Importa la documentación de API desde './docs'.

// Importa las rutas para diferentes recursos.
const userRoutes = require('./v1/routes/userRoutes')

// Importa middleware personalizado para manejar rutas desconocidas y errores.

// Crea una instancia de la aplicación Express.
const app = express()

// Obtiene el puerto del archivo .env.
const port = process.env.PORT
console.log(port)

// Configura middlewares globales para la aplicación Express.
app.use(cors()) // Habilita el soporte CORS (Cross-Origin Resource Sharing).
app.use(express.json()) // Permite el análisis de solicitudes JSON.
app.use(helmet()) // Configura encabezados de seguridad HTTP con Helmet.

// Define rutas para diferentes recursos utilizando las rutas importadas.
app.use('/api/auth', userRoutes) // Rutas relacionadas con usuarios.

// Configura una ruta para la documentación de la API utilizando Swagger.

// Configura middleware para manejar rutas desconocidas.

// Configura middleware para manejar errores.

// Inicia el servidor Express en el puerto definido en PORT.
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
