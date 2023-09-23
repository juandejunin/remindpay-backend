// scheduler.js
const { enviarCorreo } = require('../utils/sendReminder')

function programarTareaEnFecha (fechaISO) {
  const fecha = new Date(fechaISO)
  const ahora = new Date()
  const tiempoRestante = fecha - ahora

  if (tiempoRestante > 0) {
    setTimeout(() => {
      enviarCorreo() // Asegúrate de que enviarCorreo esté disponible aquí
      console.log('Tarea programada ejecutada.')
    }, tiempoRestante)
  } else {
    console.log('La fecha programada ya ha pasado.')
  }
}

module.exports = {
  programarTareaEnFecha
}
