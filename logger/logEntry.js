const { Schema, model } = require('mongoose')

const LogEntrySchema = Schema({

  timestamp: Date,
  level: String,
  message: String
})

module.exports = model('LogEntry', LogEntrySchema)
