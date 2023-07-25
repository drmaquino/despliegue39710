import mongoose from 'mongoose'
import assert from 'assert'

import { usuariosDaoMongoose } from '../../src/daos/usuarios.dao.mongoose.js'
import { documentoUsuario } from '../mocks.js'

describe('dao de usuarios', () => {

  beforeEach(async () => {
    await mongoose.connection.collection('usuarios').deleteMany({})
  })

  describe('al crear un nuevo usuario', async () => {
    it('lo almacena', async () => {
      await usuariosDaoMongoose.create(documentoUsuario)
      const registro = await fetchDirectlyFromMongoDb(documentoUsuario, 'usuarios')
      assert.deepStrictEqual(registro, documentoUsuario)
    })
  })

  describe('al buscar un usuario por su id', async () => {
    it('si existe lo encuentra y lo devuelve', async () => {
      await insertDirectlyIntoMongoDb(documentoUsuario, 'usuarios')
      const registro = await usuariosDaoMongoose.readOne({ id: documentoUsuario.id })
      assert.deepStrictEqual(registro, documentoUsuario)
    })

    it('si no existe lanza un error', async () => {
      let lanzoError = false
      try {
        await usuariosDaoMongoose.readOne({ id: 'xxxxxxxxxxxx' })
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
