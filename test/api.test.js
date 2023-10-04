const request = require('supertest');
const should = require('should');

const app = require('../src/index'); // Asegúrate de ajustar la ruta a tu archivo index.js

describe('User Routes', () => {
  it('should return JSON with a message for all users', (done) => {
    request(app)
      .get('/api/auth') // Ajusta la ruta según tu configuración en el index.js
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Verifica que la respuesta sea un objeto JSON con el mensaje esperado.
        should(res.body).be.an.Object();
        should(res.body).have.property('msg').which.is.equal('all users');
        
        done();
      });
  });
});
