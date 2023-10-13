const { Schema, model } = require('mongoose')

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: Tommy V  
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
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
