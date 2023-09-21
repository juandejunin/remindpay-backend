
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
        console.log(params)
        // Si no llegan, retornar respuesta negativa
        if (!params.name || !params.price || !params.date) {
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
        return res.status(200).send("ok")
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error interno del servidor"
        });
    }
};


// //Obtener Reminder
const readReminder = async (req, res) => {
  try {
      // Sacar el id de la publicación de la URL
      const reminderId = req.params.id;
      console.log(reminderId);

      // Usar async/await para realizar la búsqueda por ID
      const reminderStored = await Reminder.findById(reminderId);

      if (!reminderStored) {
          return res.status(404).send({
              status: "error",
              message: "No se encontró el recordatorio"
          });
      }

      // Devolver respuesta
      return res.status(200).send({
          status: "success",
          message: "Detalle",
          reminder: reminderStored
      });
  } catch (error) {
      return res.status(500).send({
          status: "error",
          message: "Error interno del servidor"
      });
  }
};


//eliminar Reminder
const deleteReminder = (req, res) => {

    //Obtener el id de la publicacion que se quiere eliminar
    const reminderId = req.params.id
    console.log(req.user)

    //Buscar y borrar (solo reminder que creo el usuario autenticado)
    Reminder.find({ "user": req.user.id, "_id": reminderId }).remove(error => {
        if (error) {
            return res.status(500).send({
                status: "error",
                message: "No se ha eliminado la publicacion"
            })
        }

        //devolver la respuesta
        return res.status(200).send({
            status: "success",
            message: "reminder eliminada",
            reminder: reminderId

        })
    })


}






// //listar las Reminder de un usuario
// const feed = async (req, res) => {
//     //Obtener pagina actual
//     let page = 1

//     if (req.params.page) {
//         page = req.params.page

//     }

//     //Establecer numero de elementos por pagina
//     let itemsPerPage = 5


//     try {
//         //Sacar un array limpio de identificadores de usuarios que yo sigo como usuario identificado
//         const myFollows = await followService.followUserIds(req.user.id)

//         // Buscar publicaciones in, ordenar, popular , paginar
//         const publications = await Publication.find({ user: myFollows.following })
//             .populate("user","-password -role -__v -email")
//             .sort("-created_at")

//             .paginate(page, itemsPerPage)

//         return res.status(200).send({
//             status: "success",
//             message: "Fedd",
//             following: myFollows.following,
//             publications
//         })

//     } catch (error) {
//         return res.status(500).send({
//             status: "error",
//             message: "No se han listado las publicaciones del Feed",

//         })
//     }


//     return res.status(200).send({
//         status: "success",
//         message: "Fedd",

//     })

// }






const pruebaReminder = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde el controlador reminder",
        usuario: req.user

    })
}


module.exports = { pruebaReminder, createReminder, readReminder, deleteReminder }
