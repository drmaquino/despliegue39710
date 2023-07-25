import assert from 'assert'
import supertest from 'supertest'
import mongoose from 'mongoose'

import { criptografiador } from '../../src/services/criptografia.service.js'
import * as mocks from '../mocks.js'
import { extractTokenFromSignedCookie } from '../utils.js'

const PORT = 8080
const serverBaseUrl = `http://localhost:${PORT}`
const httpClient = supertest(serverBaseUrl)

describe('router de sesiones', () => {

  before(async () => {
    await mongoose.connection.collection('usuarios').deleteMany({})
    await mongoose.connection.collection('usuarios').insertOne(mocks.documentoUsuario)
  })

  after(async () => {
    await mongoose.connection.collection('usuarios').deleteMany({})
  })

  describe('POST', () => {
    describe('si se envian credenciales validas', () => {
      it('crea una sesion para el usuario correspondiente', async () => {
        const { statusCode, ok, headers } = await httpClient.post('/api/sesiones').send(mocks.credencialesUsuario)
        assert.ok(ok, 'la peticion no fue exitosa')
        assert.strictEqual(statusCode, 201)
        const cookie = headers['set-cookie'][0]
        const token = extractTokenFromSignedCookie(cookie)
        const dato = criptografiador.decodificarToken(token)
        assert.deepStrictEqual(dato, mocks.dtoUsuario)
      })
    })
  })

  describe('GET', () => {
    describe('si se solicita info de una sesion (previamente iniciada)', () => {
      it('devuelve los datos del usuario logueado', async () => {
        const { headers } = await httpClient.post('/api/sesiones').send(mocks.credencialesUsuario)
        const cookie = headers['set-cookie'][0]
        const { body } = await httpClient
          .get("/api/sesiones/current")
          .set("Cookie", [cookie])
        assert.deepStrictEqual(body, mocks.dtoUsuario)
      })
    })
  })
})