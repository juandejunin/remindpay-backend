const { Schema, model } = require("mongoose")

const ReminderSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
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
        type: String,
        required: true
    },

    file: String,
    created_at: {
        type: Date,
        default: Date.now
    }
})


module.exports = model("Reminder", ReminderSchema)