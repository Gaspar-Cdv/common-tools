import { perm, comb, getCombinations } from '../src/stats'


describe('perm', () => {
  it('should return the number of k-permutations of n', () => {
    expect(perm(4, 0)).toBe(1)
    expect(perm(4, 1)).toBe(4)
    expect(perm(4, 2)).toBe(12)
    expect(perm(4, 3)).toBe(24)
    expect(perm(4, 4)).toBe(24)
  })
  it('should throw an error if k is greater than n', () => {
    expect(() => perm(4, 5)).toThrow(RangeError)
  })
  it('should throw an error if one of the arguments is not a positive integer', () => {
    expect(() => perm(4, -2)).toThrow(TypeError)
    expect(() => perm(-4, 2)).toThrow(TypeError)
    expect(() => perm(4, 2.5)).toThrow(TypeError)
    expect(() => perm(4.5, 2)).toThrow(TypeError)
  })
})


describe('comb', () => {
  it('should return the number of k-combinations of n', () => {
    expect(comb(4, 0)).toBe(1)
    expect(comb(4, 1)).toBe(4)
    expect(comb(4, 2)).toBe(6)
    expect(comb(4, 3)).toBe(4)
    expect(comb(4, 4)).toBe(1)
  })
  it('should throw an error if k is greater than n', () => {
    expect(() => comb(4, 5)).toThrow(RangeError)
  })
  it('should throw an error if one of the arguments is not a positive integer', () => {
    expect(() => comb(4, -2)).toThrow(TypeError)
    expect(() => comb(-4, 2)).toThrow(TypeError)
    expect(() => comb(4, 2.5)).toThrow(TypeError)
    expect(() => comb(4.5, 2)).toThrow(TypeError)
  })
})


describe('getCombinations', () => {
  it('should return an array of all combinations of the given array', () => {
    expect(getCombinations([1, 2, 3])).toEqual([
      [1],
      [2],
      [3],
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 2, 3]
    ])
  })
  it('should return an array of combinations of n elements of the given array', () => {
    expect(getCombinations([1, 2, 3], 1)).toEqual([
      [1],
      [2],
      [3]
    ])
    expect(getCombinations([1, 2, 3], 2)).toEqual([
      [1, 2],
      [1, 3],
      [2, 3]
    ])
    expect(getCombinations([1, 2, 3], 3)).toEqual([
      [1, 2, 3]
    ])
  })
  it('should return an empty array if n is greater than the length of the array', () => {
    expect(getCombinations([1, 2, 3], 4)).toEqual([])
  })
  it('should throw an error if n is not a positive integer', () => {
    expect(() => getCombinations([1, 2, 3], -1)).toThrow(TypeError)
    expect(() => getCombinations([1, 2, 3], 1.5)).toThrow(TypeError)
  })
})