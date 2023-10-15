const { Schema, model } = require('mongoose')

const ReminderSchema = Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  remindername: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  date: {
    type: Date, // Cambiado a tipo Date
    required: true
  },
  alarmDate7: {
    type: Date // Fecha de alarma calculada
  },
  alarmDate5: {
    type: Date // Fecha de alarma calculada
  },
  alarmDate1: {
    type: Date // Fecha de alarma calculada
  },
  file: String,
  created_at: {
    type: Date,
    default: Date.now
  }
})
// Antes de guardar un nuevo reminder, calcula y establece la fecha de alarma
ReminderSchema.pre('save', function (next) {
  // Aquí puedes calcular la fecha de alarma, por ejemplo, un día antes de la fecha original
  const alarmDate7 = new Date(this.date)
  alarmDate7.setDate(alarmDate7.getDate() - 7)
  this.alarmDate7 = alarmDate7

  const alarmDate5 = new Date(this.date)
  alarmDate5.setDate(alarmDate5.getDate() - 5)
  this.alarmDate5 = alarmDate5

  const alarmDate1 = new Date(this.date)
  alarmDate1.setDate(alarmDate1.getDate() - 1)
  this.alarmDate1 = alarmDate1
  next()
})

module.exports = model('Reminder', ReminderSchema)

/**
 * @openapi
 * components:
 *   schemas:
 *     Reminder:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: El ID del usuario al que pertenece el recordatorio.
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         remindername:
 *           type: string
 *           description: El nombre del recordatorio.
 *           example: Comprar regalos de cumpleaños
 *         price:
 *           type: string
 *           description: El precio estimado asociado al recordatorio.
 *           example: $100
 *         date:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora del recordatorio.
 *           example: 2023-10-31T15:00:00Z
 *         alarmDate7:
 *           type: string
 *           format: date-time
 *           description: Fecha de alarma calculada 7 días antes del recordatorio.
 *           example: 2023-10-24T15:00:00Z
 *         alarmDate5:
 *           type: string
 *           format: date-time
 *           description: Fecha de alarma calculada 5 días antes del recordatorio.
 *           example: 2023-10-26T15:00:00Z
 *         alarmDate1:
 *           type: string
 *           format: date-time
 *           description: Fecha de alarma calculada 1 día antes del recordatorio.
 *           example: 2023-10-30T15:00:00Z
 *         file:
 *           type: string
 *           description: Nombre de archivo asociado al recordatorio (si aplicable).
 *           example: reminder.pdf
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora en que se creó el recordatorio.
 *           example: 2023-10-10T12:30:00Z
 */

