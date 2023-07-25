import 'dotenv/config'
import mongoose from 'mongoose'
import { CNX_STR } from './config/mongodb.config.js'
import { PORT } from './config/server.config.js'
import { app } from './app/app.js'

await mongoose.connect(CNX_STR)
console.log(`conectado a base de datos en '${CNX_STR}'`)

const server = app.listen(PORT, '0.0.0.0', () => { console.log(`escuchando en ${server.address().port}`) })