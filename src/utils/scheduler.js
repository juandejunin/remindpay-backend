const { enviarCorreo } = require('../utils/sendReminder')
const cron = require('node-cron')
const { format, addDays, isAfter } = require('date-fns')

let tareaRealizada = false

function fechaIsoToCronExpression (fechaISO) {
  const fecha = new Date(fechaISO)
  const fechaCron7 = addDays(fecha, -7) // Una semana antes
  const fechaCron5 = addDays(fecha, -5) // 5 días antes
  const fechaCron1 = addDays(fecha, -1) // Un día antes

  console.log(fechaCron1)
  // Validar que la fecha sea válida antes de formatearla
  if (isAfter(fechaCron7, new Date())) {
    return { expression: format(fechaCron7, 'm H D M *'), message: 'Notificación programada una semana antes ejecutada.' }
  }
  if (isAfter(fechaCron5, new Date())) {
    return { expression: format(fechaCron5, 'm H D M *'), message: 'Notificación programada 5 días antes ejecutada.' }
  }
  if (isAfter(fechaCron1, new Date())) {
    return { expression: format(fechaCron1, 'm H D M *'), message: 'Notificación programada un día antes ejecutada.' }
  }

  // Devuelve null si la fecha no es válida
  return null
}

function programarTareaConAnticipacion (fechaISO, username, email, remindername, price, date) {
  const fechaCron7 = fechaIsoToCronExpression(fechaISO)
  const fechaCron5 = fechaIsoToCronExpression(fechaISO)
  const fechaCron1 = fechaIsoToCronExpression(fechaISO)
  console.log('esta es la fecha 1', fechaCron1)
  if (fechaCron7 !== null) {
    // Programar notificación una semana antes
    cron.schedule(fechaCron7.expression, function () {
      enviarCorreo(username, email, remindername, price, date)
      console.log(fechaCron7.message)
    })

    // ... Resto del código para otras notificaciones
  } else {
    console.log('La fecha programada ya ha pasado o la tarea se ha realizado.')
  }

  if (fechaCron5 !== null) {
    // Programar notificación 5 días antes
    cron.schedule(fechaCron5.expression, function () {
      enviarCorreo(username, email, remindername, price, date)
      console.log(fechaCron5.message)
    })
  } else {
    console.log('La fecha programada para 5 días antes ya ha pasado o la tarea se ha realizado.')
  }

  if (fechaCron1 !== null) {
    // Programar notificación 1 día antes
    cron.schedule(fechaCron1.expression, function () {
      enviarCorreo(username, email, remindername, price, date)
      console.log(fechaCron1.message)
    })
  } else {
    console.log('La fecha programada para 1 día antes ya ha pasado o la tarea se ha realizado.')
  }
}

function detenerAlarmasRestantes () {
  tareaRealizada = false
  console.log('La tarea se ha realizado. Se han detenido las alarmas restantes.')
}

module.exports = {
  programarTareaConAnticipacion,
  detenerAlarmasRestantes
}
