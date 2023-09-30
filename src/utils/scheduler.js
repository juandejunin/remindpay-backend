// scheduler.js
const { enviarCorreo } = require('../utils/sendReminder')

let tareaRealizada = false // Variable para realizar un seguimiento del estado de la tarea

function programarTareaConAnticipacion (fechaISO, username, email, remindername, price, date) {
  const fecha = new Date(fechaISO)
  const ahora = new Date()

  // Calcular el tiempo restante en milisegundos para cada programación
  const unaSemanaAntes = fecha - 7 * 24 * 60 * 60 * 1000 - ahora
  const cincoDiasAntes = fecha - 5 * 24 * 60 * 60 * 1000 - ahora
  const unDiaAntes = fecha - 1 * 24 * 60 * 60 * 1000 - ahora

  // Programar notificación una semana antes
  if (!tareaRealizada && unaSemanaAntes > 0) {
    setTimeout(() => {
      enviarCorreo(username, email, remindername, price, date)
      console.log('Notificación programada una semana antes ejecutada.')
    }, unaSemanaAntes)
  } else {
    console.log('La fecha programada para una semana antes ya ha pasado o la tarea se ha realizado.')
  }

  // Programar notificación cinco días antes
  if (!tareaRealizada && cincoDiasAntes > 0) {
    setTimeout(() => {
      enviarCorreo(username, email, remindername, price, date)
      console.log('Notificación programada cinco días antes ejecutada.')
    }, cincoDiasAntes)
  } else {
    console.log('La fecha programada para cinco días antes ya ha pasado o la tarea se ha realizado.')
  }

  // Programar notificación un día antes
  if (!tareaRealizada && unDiaAntes > 0) {
    setTimeout(() => {
      enviarCorreo(username, email, remindername, price, date)
      console.log('Notificación programada un día antes ejecutada.')
    }, unDiaAntes)
  } else {
    console.log('La fecha programada para un día antes ya ha pasado o la tarea se ha realizado.')
  }
}

// Función para detener las alarmas restantes si la tarea se realiza antes de la última notificación
function detenerAlarmasRestantes () {
  tareaRealizada = true
  console.log('La tarea se ha realizado. Se han detenido las alarmas restantes.')
}

module.exports = {
  programarTareaConAnticipacion,
  detenerAlarmasRestantes
}
