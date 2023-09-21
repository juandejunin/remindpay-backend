const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config()

// Crear funcion que reciba el nombre del recordatorio, la fecha y el precio y envie un correo en la fecha indicada con los datos correspondientes.


// Configura el transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD
  }
})



// Define la función para enviar el correo
function enviarCorreo() {
  const correoOptions = {
    from: process.env.EMAIL_ACCOUNT, // Cambia esto con tu dirección de correo
    to: 'juandejunin75@gmail.com', // Cambia esto con la dirección del destinatario
    subject: 'Asunto del correo',
    text: 'Cuerpo del correo electrónico'
  };

  // Envía el correo electrónico
  transporter.sendMail(correoOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}

let fecha = '22 7 19 9 *'

// Programa la tarea cron para ejecutar la función a una fecha y hora específicas
// En este ejemplo, se programa para que se ejecute a las 10:00 AM el 1 de enero de 2024
cron.schedule(fecha, () => {
    enviarCorreo()
    console.log('Tarea programada ejecutada.');
  });