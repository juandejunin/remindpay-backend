// Importar modulos
const Reminder = require('../models/Reminder')
const { validationResult } = require('express-validator')

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
      return res.status(400).send({
        status: 'error',
        message: 'Debes enviar el texto'
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
    // const fechaISO = new Date(fechaEnCuerpo)
    console.log(reminderStored)

    if (!reminderStored) {
      return res.status(400).send({
        status: 'error',
        message: 'No se guardó la ReminderStored'
      })
    }

    // Devolver respuesta

    return res.status(200).send({
      status: 'success',
      message: 'Recordatorio creado con exito',
      reminder: reminderStored
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'Error interno del servidor'
    })
  }
}

const readReminder = async (req, res) => {
  try {
    // Buscar todos los recordatorios del usuario autenticado
    const reminders = await Reminder.find({ user: req.user.id })

    return res.status(200).send({
      status: 'success',
      message: 'Reminders encontrados',
      reminders
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'No se han encontrado reminders'
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
        message: 'No se ha encontrado el recordatorio'
      })
    }

    // Si se encuentra el recordatorio y pertenece al usuario, retornar el resultado
    return res.status(200).send({
      status: 'success',
      message: 'Recordatorio encontrado',
      reminder
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'Ha ocurrido un error al buscar el recordatorio'
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
        message: 'Debes proporcionar al menos un campo para actualizar'
      })
    }

    // Buscar el recordatorio por su ID y asegurarse de que pertenezca al usuario autenticado
    const reminder = await Reminder.findOne({ _id: reminderId, user: req.user.id })

    if (!reminder) {
      return res.status(404).send({
        status: 'error',
        message: 'No se ha encontrado el recordatorio para actualizar'
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
        message: 'No se pudieron guardar los cambios del recordatorio'
      })
    }

    // Devolver respuesta
    return res.status(200).send({
      status: 'success',
      message: 'Recordatorio actualizado con éxito'
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'Error interno del servidor'
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
        message: 'El recordatorio no se encuentra o no pertenece al usuario autenticado.'
      })
    }

    // Eliminar el recordatorio
    await Reminder.deleteOne({ _id: id, user: userId })

    return res.status(200).send({
      status: 'success',
      message: 'El recordatorio ha sido eliminado exitosamente.'
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'Ha ocurrido un error interno del servidor al intentar eliminar el recordatorio.'
    })
  }
}

const pruebaReminder = (req, res) => {
  return res.status(200).send({
    message: 'Mensaje enviado desde el controlador reminder',
    usuario: req.user

  })
}

module.exports = { pruebaReminder, createReminder, readReminder, updateReminder, deleteReminder, readOneReminder }
