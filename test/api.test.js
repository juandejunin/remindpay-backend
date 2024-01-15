const request = require('supertest')
const { describe, it } = require('mocha')
const app = require('../src/index')
const assert = require('assert')
const User = require('../src/models/User')
const nodemailerMock = require('nodemailer-mock');

const chai = require('chai')
const expect = chai.expect
let idUser = null
let authToken // Para almacenar el token de autenticación
describe('Registration and login tests', () => {
  // Prueba de registro de usuario
  describe('User register', () => {
    it('You should register a new user successfully', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      }

      try {
        const res = await request(app)
          .post('/api/v1/auth/register')
          .send(userData)
          .expect(201)

          console.log('Response:', res.body);

          expect(res.body.status).to.equal('success')
          expect(res.body.message).to.equal('User created')

        // Busca el usuario recién creado en la base de datos
        const newUser = await User.findOne({ email: 'test@example.com' })
        console.log(newUser)
              // Obtén el token criptográfico del usuario
      const cryptoToken = newUser.security?.cryptoToken;
        // Simula la respuesta del usuario al hacer clic en el enlace de verificación de email
        const verifyEmailRes = await request(app)
          .get(`/api/v1/auth/user/verify/${cryptoToken}`)
          .expect(302) // Código de redirección

        // Verifica la redirección y ajusta según tu lógica específica
        expect(verifyEmailRes.header.location).to.equal(process.env.URL_SIGNIN)

        // También podrías realizar más aserciones según sea necesario

        // Verifica que se haya enviado el correo electrónico de verificación
        const sentMails = nodemailerMock.mock.getSentMail()
        expect(sentMails.length).to.equal(1)
        const email = sentMails[0]
        // Agrega más aserciones según el contenido del correo electrónico si es necesario

        // Restablece la configuración de nodemailer después de la prueba
        nodemailerMock.mock.reset()
      } catch (err) {
        // Si hay algún error, la prueba fallará con el mensaje de error adecuado.
        throw new Error(`Error during registration: ${err.message}`);
      }
    })

    it('It should return an error if you try to register with the same email', (done) => {
      const userData = {
        username: 'testuser2',
        email: 'test@example.com', // Mismo email que el registrado anteriormente
        password: 'password123'
      }

      request(app)
        .post('/api/v1/auth/register')
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
  describe('User login', () => {
    it('It should log in successfully and return a token', (done) => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      }

      request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert(res.body.status === 'success')
          assert(res.body.message === 'login action')
          assert(res.body.token) // Verifica que se devuelva un token
          authToken = res.body.token // Almacena el token para usarlo en otras pruebas
          assert(res.body.user.id)
          idUser = res.body.user.id
          done()
        })
    })

    it('Should return an error if an attempt is made to log in with incorrect credentials', (done) => {
      const loginData = {
        email: 'test@example.com',
        password: 'incorrectpassword' // Contraseña incorrecta
      }

      request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err)
          assert(res.body.status === 'error')
          assert(res.body.message === 'You did not identify yourself correctly')
          done()
        })
    })
  })
})

// Crud Reminder

describe('Reminder CRUD Testing', () => {
  let reminderId // Variable para almacenar el ID del recordatorio creado en la prueba de creación

  // Prueba de creación de un recordatorio
  it('You should create a new reminder', (done) => {
    const newReminder = {
      remindername: 'Reminder test',
      price: '7',
      date: '2023-10-10T10:00:00.000Z'
    }

    request(app)
      .post('/api/v1/reminder/create')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newReminder)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Reminder created successfully')
        expect(res.body.reminder).to.be.an('object')
        reminderId = (res.body.reminder._id)
        done()
      })
  })

  // Prueba de lectura de todos los recordatorios
  it('You should get all the reminders', (done) => {
    request(app)
      .get('/api/v1/reminder/read')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Reminders found')
        expect(res.body.reminders).to.be.an('array')

        done()
      })
  })

  // Prueba de lectura de un recordatorio específico
  it('You should get a specific reminder', (done) => {
    request(app)
      .get(`/api/v1/reminder/read/${reminderId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Reminder found')
        expect(res.body.reminder).to.be.an('object')

        done()
      })
  })

  // Prueba de actualización de un recordatorio
  it('You should update an existing reminder', (done) => {
    const updatedReminder = {
      remindername: 'update a reminder',
      price: 200,
      date: '2023-11-11T11:00:00.000Z' // Nueva fecha y hora
    }

    request(app)
      .put(`/api/v1/reminder/update/${reminderId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedReminder)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Reminder successfully updated')

        done()
      })
  })

  // Prueba de eliminación de un recordatorio
  it('You should delete an existing reminder', (done) => {
    request(app)
      .delete(`/api/v1/reminder/delete/${reminderId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('The reminder has been successfully deleted.')

        done()
      })
  })
})

// Prueba de eliminación de usuario
describe('User deletion', () => {
  it('You should delete an existing user', (done) => {
    request(app)
      .delete(`/api/v1/auth/delete/${idUser}`)
      .set('Authorization', `Bearer ${authToken}`) // Asegúrate de tener un token válido para realizar la eliminación
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('User deleted')

        done()
      })
  })

  // Otras pruebas de validación de eliminación pueden ir aquí
})
