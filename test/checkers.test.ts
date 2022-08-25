import { checkPositiveInteger } from '../src/checkers'

describe('checkPositiveInteger', () => {
  it('should throw an error if the parameter is not a strictly positive integer', () => {
    expect(() => checkPositiveInteger(0)).toThrow()
    expect(() => checkPositiveInteger(-1)).toThrow()
    expect(() => checkPositiveInteger(1.5)).toThrow()
    expect(() => checkPositiveInteger(1)).not.toThrow()
  })
  it('should throw an error if the parameter is not a positive integer', () => {
    expect(() => checkPositiveInteger(0, '', false)).not.toThrow()
    expect(() => checkPositiveInteger(-1, '', false)).toThrow()
    expect(() => checkPositiveInteger(1.5, '', false)).toThrow()
    expect(() => checkPositiveInteger(1, '', false)).not.toThrow()
  })
})
