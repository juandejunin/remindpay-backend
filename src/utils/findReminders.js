const Reminder = require('../models/Reminder')
const cron = require('node-cron')

async function getReminders () {
  try {
    // Obtén la fecha actual sin la hora
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    // Realiza la consulta para encontrar documentos con la misma fecha en alarmDate1, alarmDate5 y alarmDate7
    const docs = await Reminder.find({
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

    console.log('Documentos encontrados:', docs)
  } catch (err) {
    console.error('Error al recuperar documentos:', err)
  }
}

// Programa una tarea periódica que ejecute la función cada día a las 3:00 AM
cron.schedule('* * * * *', async () => {
  console.log('Ejecutando busqueda minuto a minuto')
  await getReminders()
})

module.exports = { getReminders }
