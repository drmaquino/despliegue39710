import assert from "assert"

import { criptografiador } from '../../src/services/criptografia.service.js'

describe('servicio de criptografia', () => {

  it('encripta contraseñas correctamente', () => {
    const password = '123abc'
    const passwordHasheado = criptografiador.hashear(password)
    assert.notStrictEqual(passwordHasheado, password)
  })

  it('compara contraseñas hasheadas correctamente', () => {
    const password = '123abc'
    const passwordHasheado = criptografiador.hashear(password)
    assert.ok(criptografiador.comparar(password, passwordHasheado))
  })

  it('crea y descifra correctamente JWT', () => {
    const original = { id: '123abc' }
    const jwt = criptografiador.generarToken(original)
    assert.notDeepStrictEqual(jwt, original)
    const descifrado = criptografiador.decodificarToken(jwt)
    assert.deepStrictEqual(descifrado, original)
  })
})
