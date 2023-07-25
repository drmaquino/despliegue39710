import mongoose from 'mongoose'

import { app } from '../src/app/app.js'

const CNX_STR = 'mongodb://localhost/testmascotas'
const PORT = 8080

let server

export const mochaHooks = {

  async beforeAll() {
    await mongoose.connect(CNX_STR)
    await new Promise((resolve, reject) => {
      server = app.listen(PORT, () => { resolve(true) })
    })
  },

  async afterAll() {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    server.close()
  }

}