
//Importar modulos
const fs = require("fs")
const path = require("path")
const Reminder = require("../models/Reminder")
const user = require("../models/User")

//importar servicios

//Guardar Reminder
const createReminder = async (req, res) => {
    try {
        // Recoger datos del body
        const params = req.body;
        
        // Si no llegan, retornar respuesta negativa
        if (!params.remindername || !params.price || !params.date) {
            return res.status(400).send({
                status: "error",
                message: "Debes enviar el texto"
            });
        }

        // Crear y rellenar el objeto del modelo
        const newReminder = new Reminder(params);
        newReminder.user = req.user.id;

        console.log(newReminder)
        // Guardar el objeto en la base de datos
        const reminderStored = await newReminder.save();



        if (!reminderStored) {
            return res.status(400).send({
                status: "error",
                message: "No se guardó la ReminderStored"
            });
        }

        // Devolver respuesta
        return res.status(200).send("Recordatorio creado con exito")
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error interno del servidor"
        });
    }
};


// //Obtener Reminder
// const readReminder = async (req, res) => {
//   try {
//       // Sacar el id de la publicación de la URL
//       const reminderId = req.params.id;
//       console.log(reminderId);

//       // Usar async/await para realizar la búsqueda por ID
//       const reminderStored = await Reminder.findById(reminderId);

//       if (!reminderStored) {
//           return res.status(404).send({
//               status: "error",
//               message: "No se encontró el recordatorio"
//           });
//       }

//       // Devolver respuesta
//       return res.status(200).send({
//           status: "success",
//           message: "Detalle",
//           reminder: reminderStored
//       });
//   } catch (error) {
//       return res.status(500).send({
//           status: "error",
//           message: "Error interno del servidor"
//       });
//   }
// };

const readReminder = async (req, res) => {
    try {
        // Buscar todos los recordatorios del usuario autenticado
        const reminders = await Reminder.find({ "user": req.user.id });

        return res.status(200).send({
            status: "success",
            message: "Reminders encontrados",
            reminders: reminders
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "No se han encontrado reminders"
        });
    }
}



//eliminar Reminder
const deleteReminder = async (req, res) => {

    //Obtener el id de la publicacion que se quiere eliminar
    const reminderId = req.params.id
    

    //Buscar y borrar (solo reminder que creo el usuario autenticado)
    try {
        await Reminder.deleteOne({ "user": req.user.id, "_id": reminderId });
        return res.status(200).send({
            status: "success",
            message: "reminder eliminada",
            reminder: reminderId
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "No se ha eliminado la publicación"
        });
    }
    
}

const readOneReminder = async (req, res) => {
    // Obtener el ID del recordatorio que se quiere mostrar
    const reminderId = req.params.id;
    
    try {
        // Buscar el recordatorio por su ID y asegurarse de que pertenezca al usuario autenticado
        const reminder = await Reminder.findOne({ "_id": reminderId, "user": req.user.id });

        if (!reminder) {
            // Si no se encuentra el recordatorio o no pertenece al usuario, retornar un error
            return res.status(404).send({
                status: "error",
                message: "No se ha encontrado el recordatorio"
            });
        }

        // Si se encuentra el recordatorio y pertenece al usuario, retornar el resultado
        return res.status(200).send({
            status: "success",
            message: "Recordatorio encontrado",
            reminder: reminder
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Ha ocurrido un error al buscar el recordatorio"
        });
    }
}




const pruebaReminder = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde el controlador reminder",
        usuario: req.user

    })
}


module.exports = { pruebaReminder, createReminder, readReminder, deleteReminder, readOneReminder }
