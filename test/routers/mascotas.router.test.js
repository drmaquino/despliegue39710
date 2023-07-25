import assert from 'assert'
import supertest from 'supertest'
import mongoose from 'mongoose'

import * as mocks from '../mocks.js'

const PORT = 8080
const serverBaseUrl = `http://localhost:${PORT}`
const httpClient = supertest(serverBaseUrl)

describe('router de mascotas', () => {

  before(async () => {
    await mongoose.connection.collection('usuarios').deleteMany({})
    await mongoose.connection.collection('usuarios').insertOne(mocks.documentoUsuario)
  })

  after(async () => {
    await mongoose.connection.collection('usuarios').deleteMany({})
  })

  describe('POST', () => {
    describe('si se envian todos los datos obligatorios correctamente', () => {
      it('crea una mascota en el sistema con valores agregados por defecto', async () => {
        const { statusCode, ok, body: { id, ...restoDeLaMascota } } = await httpClient.post('/api/mascotas').send(mocks.inputMascotaSinFoto)
        assert.ok(ok, 'la peticion no fue exitosa')
        assert.strictEqual(statusCode, 201)
        assert.ok(id, 'la rta no incluye id')
        assert.deepStrictEqual(restoDeLaMascota, {
          nombre: mocks.inputMascotaSinFoto.nombre,
          especie: mocks.inputMascotaSinFoto.especie,
          fechaNacimiento: mocks.inputMascotaSinFoto.fechaNacimiento,
          adoptada: false,
          duenio: null,
          foto: ''
        })
      })
    })

    describe('si se envian todos los datos incluyendo la foto', () => {
      it('crea una mascota en el sistema con la ruta de la foto recibida', async () => {
        const { statusCode, ok, body: { id, foto, ...restoDeLaMascota } } = await httpClient.post('/api/mascotas')
          .field('nombre', mocks.inputMascotaConFoto.nombre)
          .field('especie', mocks.inputMascotaConFoto.especie)
          .field('fechaNacimiento', mocks.inputMascotaConFoto.fechaNacimiento)
          .attach('foto', mocks.inputMascotaConFoto.foto)
        assert.ok(ok, 'la peticion no fue exitosa')
        assert.strictEqual(statusCode, 201, 'no se obtuvo el codigo de estado esperado')
        assert.ok(id, 'la rta no incluye id')
        assert.ok(foto, 'la rta no incluye foto')
        assert.ok(foto.endsWith(mocks.nombreArchivoFoto), 'no coincide la ruta con el nombre de la foto enviada')
        assert.deepStrictEqual(restoDeLaMascota, {
          nombre: mocks.inputMascotaConFoto.nombre,
          especie: mocks.inputMascotaConFoto.especie,
          fechaNacimiento: mocks.inputMascotaConFoto.fechaNacimiento,
          adoptada: false,
          duenio: null,
        })
      })
    })
  })
})