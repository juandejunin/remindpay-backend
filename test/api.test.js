const request = require('supertest')
const should = require('should')
const { describe, it } = require('mocha')
const app = require('../src/index') // Asegúrate de ajustar la ruta a tu archivo index.js
const assert = require('assert')

const chai = require('chai')
const expect = chai.expect

let authToken // Para almacenar el token de autenticación
describe('Pruebas de registro y inicio de sesión', () => {
  // Prueba de registro de usuario
  describe('Registro de usuario', () => {
    it('Debería registrar un nuevo usuario con éxito', (done) => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      }

      request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          assert(res.body.status === 'success')
          assert(res.body.message === 'User created')
          done()
        })
    })

    it('Debería devolver un error si se intenta registrar con el mismo email', (done) => {
      const userData = {
        username: 'testuser2',
        email: 'test@example.com', // Mismo email que el registrado anteriormente
        password: 'password123'
      }

      request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err)
          assert(res.body.status === 'error')
          assert(res.body.message === 'Invalid Email/Username')
          done()
        })
    })

    // Otras pruebas de validación pueden ir aquí
  })

  // Prueba de inicio de sesión de usuario
  describe('Inicio de sesión de usuario', () => {
    it('Debería iniciar sesión con éxito y devolver un token', (done) => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      }

      request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert(res.body.status === 'success')
          assert(res.body.message === 'login action')
          assert(res.body.token) // Verifica que se devuelva un token
          authToken = res.body.token // Almacena el token para usarlo en otras pruebas
          console.log(authToken)
          done()
        })
    })

    it('Debería devolver un error si se intenta iniciar sesión con credenciales incorrectas', (done) => {
      const loginData = {
        email: 'test@example.com',
        password: 'incorrectpassword' // Contraseña incorrecta
      }

      request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err)
          assert(res.body.status === 'error')
          assert(res.body.message === 'You did not identify yourself correctly')
          done()
        })
    })

    // Otras pruebas de validación pueden ir aquí
  })

  // Otras pruebas relacionadas con la autenticación pueden ir aquí, utilizando el token almacenado
})

describe('User Routes', () => {
  it('should return JSON with a message for all users', (done) => {
    request(app)
      .get('/api/auth') // Ajusta la ruta según tu configuración en el index.js
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        // Verifica que la respuesta sea un objeto JSON con el mensaje esperado.
        should(res.body).be.an.Object()
        should(res.body).have.property('msg').which.is.equal('all users')

        done()
      })
  })
})

// Crud Reminder

// // Generar token
// const jwt = require('jwt-simple')
// const moment = require('moment')
// require('dotenv').config()

// // Clave secreta
// const SECRET_KEY = process.env.JWT_SECRET_KEY

// // Ejemplo de generación de un token JWT válido para pruebas
// const generateAuthToken = () => {
//   const payload = {
//     id: 'usuario_id', // Cambia esto por un ID válido de usuario
//     username: 'nombre_de_usuario',
//     email: 'correo@ejemplo.com',
//     role: 'rol_de_prueba',
//     imagen: 'imagen_de_prueba',
//     iat: moment().unix(),
//     exp: moment().add(1, 'days').unix()
//   }

//   return jwt.encode(payload, SECRET_KEY)
// }

// // Ejemplo de cómo generar un token y almacenarlo en una variable
// const authToken = generateAuthToken()

describe('Pruebas CRUD de Reminder', () => {
  let reminderId // Variable para almacenar el ID del recordatorio creado en la prueba de creación

  // Prueba de creación de un recordatorio
  it('Debería crear un nuevo recordatorio', (done) => {
    const newReminder = {
      remindername: 'Recordatorio de prueba',
      price: 100,
      date: '2023-10-10T10:00:00.000Z' // Ajusta la fecha y hora según tus necesidades
    }

    request(app)
      .post('/api/reminder/create')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newReminder)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Recordatorio creado con exito')
        expect(res.body.reminder).to.be.an('object')
        reminderId = res.body.reminder._id // Almacena el ID del recordatorio creado

        done()
      })
  })

  // Prueba de lectura de todos los recordatorios
  it('Debería obtener todos los recordatorios', (done) => {
    request(app)
      .get('/api/reminder/read')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Reminders encontrados')
        expect(res.body.reminders).to.be.an('array')

        done()
      })
  })

  // Prueba de lectura de un recordatorio específico
  it('Debería obtener un recordatorio específico', (done) => {
    request(app)
      .get(`/api/reminder/read/${reminderId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Recordatorio encontrado')
        expect(res.body.reminder).to.be.an('object')

        done()
      })
  })

  // Prueba de actualización de un recordatorio
  it('Debería actualizar un recordatorio existente', (done) => {
    const updatedReminder = {
      remindername: 'Recordatorio actualizado',
      price: 200,
      date: '2023-11-11T11:00:00.000Z' // Nueva fecha y hora
    }

    request(app)
      .put(`/api/reminder/update/${reminderId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedReminder)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Recordatorio actualizado con éxito')

        done()
      })
  })

  // Prueba de eliminación de un recordatorio
  it('Debería eliminar un recordatorio existente', (done) => {
    request(app)
      .delete(`/api/reminder/delete/${reminderId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('El recordatorio ha sido eliminado exitosamente')

        done()
      })
  })
})
