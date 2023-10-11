const Reminder = require('../models/Reminder')
const cron = require('node-cron')
const { enviarCorreo } = require('../utils/sendReminder') // Asegúrate de importar el módulo de enviarCorreo adecuadamente
const User = require('../models/User')
// ... (código para obtener documentos de Reminder) ...
let docs = null
async function recordatorioPorCorreo () {
  try {
    // ... (código para obtener documentos de Reminder) ...
    async function getReminders () {
      try {
        // Obtén la fecha actual sin la hora
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        // Realiza la consulta para encontrar documentos con la misma fecha en alarmDate1, alarmDate5 y alarmDate7
        docs = await Reminder.find({
          $or: [
            {
              alarmDate1: {
                $gte: currentDate,
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
              }
            },
            {
              alarmDate5: {
                $gte: currentDate,
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
              }
            },
            {
              alarmDate7: {
                $gte: currentDate,
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
              }
            }
          ]
        })

        for (const doc of docs) {
          const { remindername, price, date, user } = doc

          // Obtén la dirección de correo del usuario desde tu base de datos o donde esté almacenada
          // Supongamos que la dirección de correo está almacenada en el campo email del usuario
          const userWithEmail = await User.findById(user) // Reemplaza 'User' con tu modelo de usuario
          const userEmail = userWithEmail.email

          // Envía el correo de recordatorio
          enviarCorreo(userWithEmail.username, userEmail, remindername, price, date)

          console.log(`Correo de recordatorio enviado a ${userEmail}`)
        }
      } catch (err) {
        console.error('Error al recuperar documentos:', err)
      }
    }

    // Programa una tarea periódica que ejecute la función cada día a las 3:00 AM
    cron.schedule('* * * * *', async () => {
      console.log('Ejecutando busqueda minuto a minuto')
      await getReminders()
    })
  } catch (err) {
    console.error('Error al enviar correos de recordatorio:', err)
  }
}

// ... (código para programar la tarea periódica) ...

// Llamar a la función recordatorioPorCorreo para enviar correos de recordatorio
module.exports = recordatorioPorCorreo
