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
