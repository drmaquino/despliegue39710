import { criptografiador } from '../src/services/criptografia.service.js'
import { Id } from '../src/models/Id.js'

const passwordSinHashear = 'abc123'

export const documentoUsuario = {
  id: new Id().toString(),
  nombre: 'marian',
  apellido: 'profe',
  email: 'marian@mail.com',
  password: criptografiador.hashear(passwordSinHashear),
  rol: 'admin',
  mascotas: []
}

export const credencialesUsuario = {
  email: documentoUsuario.email,
  password: passwordSinHashear
}

export const dtoUsuario = {
  nombreCompleto: documentoUsuario.nombre + ' ' + documentoUsuario.apellido,
  email: documentoUsuario.email
}

export const documentoMascota = {
  id: new Id().toString(),
  nombre: 'un_nombre',
  especie: 'un_especie',
  fechaNacimiento: new Date(),
  foto: 'una_foto'
}

export const inputMascotaSinFoto = {
  nombre: 'pepito',
  especie: 'loro',
  fechaNacimiento: new Date('1986-04-15').toISOString(),
  foto: 'una_foto'
}

const rutaCarpetaFoto = './test/resources/imgs/'
export const nombreArchivoFoto = 'baby.jpg'
const rutaFoto = rutaCarpetaFoto + nombreArchivoFoto

export const inputMascotaConFoto = {
  nombre: 'un_nombre',
  especie: 'un_especie',
  fechaNacimiento: new Date('1986-04-15').toISOString(),
  foto: rutaFoto
}
