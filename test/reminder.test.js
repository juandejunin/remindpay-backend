const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
const app = require('../src/index') // Asegúrate de ajustar la ruta a tu archivo index.js

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
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('El recordatorio ha sido eliminado exitosamente')

        done()
      })
  })
})
