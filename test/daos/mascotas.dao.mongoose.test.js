import mongoose from 'mongoose'
import assert from 'assert'

import { mascotasDaoMongoose } from '../../src/daos/mascotas.dao.mongoose.js'
import { documentoMascota } from '../mocks.js'

describe('dao de mascotas', () => {

  beforeEach(async () => {
    await mongoose.connection.collection('mascotas').deleteMany({})
  })

  describe('al crear una nueva mascota', async () => {
    it('la almacena', async () => {
      await mascotasDaoMongoose.create(documentoMascota)
      const registro = await fetchDirectlyFromMongoDb({ id: documentoMascota.id }, 'mascotas')
      assert.deepStrictEqual(registro, documentoMascota)
    })
  })

  describe('al buscar una mascota por su id', async () => {
    it('si existe la encuentra y la devuelve', async () => {
      await insertDirectlyIntoMongoDb(documentoMascota, 'mascotas')
      const registro = await mascotasDaoMongoose.readOne({ id: documentoMascota.id })
      assert.deepStrictEqual(registro, documentoMascota)
    })

    it('si no existe lanza un error', async () => {
      let lanzoError = false
      try {
        await mascotasDaoMongoose.readOne({ id: 'xxxxxxxxxxxx' })
      } catch (error) { lanzoError = true }
      assert.ok(lanzoError)
    })
  })
})

async function insertDirectlyIntoMongoDb(documentoParaGuardar, coleccion) {
  await mongoose.connection.collection(coleccion).insertOne(documentoParaGuardar)
  delete documentoParaGuardar._id
}

function fetchDirectlyFromMongoDb(criterio, coleccion) {
  return mongoose.connection.collection(coleccion).findOne(criterio, { projection: { _id: 0 } })
}
