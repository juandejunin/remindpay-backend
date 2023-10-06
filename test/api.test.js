const request = require('supertest')
const should = require('should')
const { describe, it } = require('mocha')

const app = require('../src/index') // Asegúrate de ajustar la ruta a tu archivo index.js

const assert = require('assert')

describe('Pruebas de registro y inicio de sesión', () => {
  let authToken // Para almacenar el token de autenticación
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
