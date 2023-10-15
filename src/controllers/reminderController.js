// Importar modulos
const Reminder = require('../models/Reminder')
const { validationResult } = require('express-validator')
const { logger, LogEntry } = require('../../logger/apiLogger')

// importar servicios

// Guardar Reminder
const createReminder = async (req, res) => {
  try {
    // Recoger datos del body
    const params = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Si no llegan, retornar respuesta negativa
    if (!params.remindername || !params.price || !params.date) {
      logger.info('Fields cannot be empty')
      return res.status(400).send({
        status: 'error',
        message: 'Fields cannot be empty'
      })
    }
    const fechaEnCuerpo = params.date

    const userRemind = req.user
    params.date = new Date(fechaEnCuerpo)
    // Crear y rellenar el objeto del modelo
    const newReminder = new Reminder(params)
    newReminder.user = userRemind.id
    // Guardar el objeto en la base de datos

    const reminderStored = await newReminder.save()

    if (!reminderStored) {
      logger.info('ReminderStored was not saved')
      return res.status(400).send({
        status: 'error',
        message: 'ReminderStored was not saved'
      })
    }

    // Devolver respuesta

    logger.info('Reminder created successfully')
    return res.status(200).send({
      status: 'success',
      message: 'Reminder created successfully',
      reminder: reminderStored
    })
  } catch (error) {
    logger.info('Internal Server Error')
    return res.status(500).send({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

const readReminder = async (req, res) => {
  try {
    // Buscar todos los recordatorios del usuario autenticado
    const reminders = await Reminder.find({ user: req.user.id })

    return res.status(200).send({
      status: 'success',
      message: 'Reminders found',
      reminders
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'No reminders found'
    })
  }
}

const readOneReminder = async (req, res) => {
  // Obtener el ID del recordatorio que se quiere mostrar
  const reminderId = req.params.id

  try {
    // Buscar el recordatorio por su ID y asegurarse de que pertenezca al usuario autenticado
    const reminder = await Reminder.findOne({ _id: reminderId, user: req.user.id })

    if (!reminder) {
      // Si no se encuentra el recordatorio o no pertenece al usuario, retornar un error
      return res.status(404).send({
        status: 'error',
        message: 'No reminders found'
      })
    }

    // Si se encuentra el recordatorio y pertenece al usuario, retornar el resultado
    return res.status(200).send({
      status: 'success',
      message: 'Reminder found',
      reminder
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'An error occurred while searching for the reminder'
    })
  }
}

const updateReminder = async (req, res) => {
  try {
    // Recoger el ID del recordatorio que se quiere actualizar
    const reminderId = req.params.id

    // Recoger los datos del body
    const updatedData = req.body

    // Verificar que al menos uno de los campos se esté actualizando
    if (!updatedData.remindername && !updatedData.price && !updatedData.date) {
      return res.status(400).send({
        status: 'error',
        message: 'You must provide at least one field to update'
      })
    }

    // Buscar el recordatorio por su ID y asegurarse de que pertenezca al usuario autenticado
    const reminder = await Reminder.findOne({ _id: reminderId, user: req.user.id })

    if (!reminder) {
      return res.status(404).send({
        status: 'error',
        message: 'Reminder to update not found'
      })
    }

    // Actualizar los campos necesarios
    if (updatedData.remindername) {
      reminder.remindername = updatedData.remindername
    }

    if (updatedData.price) {
      reminder.price = updatedData.price
    }

    if (updatedData.date) {
      reminder.date = updatedData.date
    }

    // Guardar los cambios en la base de datos
    const updatedReminder = await reminder.save()

    if (!updatedReminder) {
      return res.status(500).send({
        status: 'error',
        message: 'Reminder changes could not be saved'
      })
    }

    // Devolver respuesta
    return res.status(200).send({
      status: 'success',
      message: 'Reminder successfully updated'
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

const deleteReminder = async (req, res) => {
  const userId = req.user.id
  const { id } = req.params

  try {
    // Buscar el recordatorio por su ID y asegurarse de que pertenezca al usuario autenticado
    const reminderToDelete = await Reminder.findOne({ _id: id, user: userId })

    if (!reminderToDelete) {
      return res.status(404).send({
        status: 'error',
        message: 'The reminder cannot be found or does not belong to the authenticated user.'
      })
    }

    // Eliminar el recordatorio
    await Reminder.deleteOne({ _id: id, user: userId })

    return res.status(200).send({
      status: 'success',
      message: 'The reminder has been successfully deleted.'
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'An internal server error occurred while trying to delete the reminder.'
    })
  }
}

module.exports = { createReminder, readReminder, updateReminder, deleteReminder, readOneReminder }
