const { vigenere, caesar } = require('../generated/src/crypto')

describe('vigenere', () => {
  const MESSAGE = 'Hello World!'
  const KEY = 'key'
  const ENCRYPTED = 'Rijvs Uyvjn!'

  it('should encrypt a message', () => {
    expect(vigenere(MESSAGE, KEY)).toEqual(ENCRYPTED)
  })
  it('should decrypt a message', () => {
    expect(vigenere(ENCRYPTED, KEY, true)).toEqual(MESSAGE)
  })
})


describe('caesar', () => {
  const MESSAGE = 'Hello World!'
  const ENCRYPTED = 'Uryyb Jbeyq!'

  it('should encrypt a message', () => {
    expect(caesar(MESSAGE, 13)).toEqual(ENCRYPTED)
    expect(caesar(MESSAGE, 26)).toEqual(MESSAGE)
    expect(caesar(MESSAGE, 39)).toEqual(ENCRYPTED)
  })
})