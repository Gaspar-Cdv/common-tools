const {
  nthRoot,
  sigma,
  round,
  clamp,
  modulo,
  isPrime,
  fillZeros,
  range,
  factorial,
  factorialIterative
} = require('../src/maths')


describe('nthRoot', () => {
  it('should return the square root of a number', () => {
    expect(nthRoot(4, 2)).toBe(2)
    expect(nthRoot(9, 2)).toBe(3)
    expect(nthRoot(16, 2)).toBe(4)
    expect(nthRoot(25, 2)).toBe(5)
  })
  it('should return the 3rd root of a number', () => {
    expect(nthRoot(8, 3)).toBe(2)
    expect(nthRoot(27, 3)).toBe(3)
    expect(nthRoot(64, 3)).toBeCloseTo(4, 10)
    expect(nthRoot(125, 3)).toBeCloseTo(5, 10)
  })
})


describe('sigma', () => {
  const CALLBACK = (x: number) => x * x
  it('should return the sum of the squares of the numbers in the specified range', () => {
    expect(sigma(CALLBACK, 1, 10)).toBe(285)
    expect(sigma(CALLBACK, 1, 100)).toBe(328350)
    expect(sigma(CALLBACK, 1, 1000)).toBe(332833500)
  })
  it('should throw an error if a or b are not positive or are not integers', () => {
    expect(() => sigma(CALLBACK, -2, 2)).toThrow(TypeError)
    expect(() => sigma(CALLBACK, 2, -2)).toThrow(TypeError)
    expect(() => sigma(CALLBACK, 1.5, 2)).toThrow(TypeError)
    expect(() => sigma(CALLBACK, 1, 1.5)).toThrow(TypeError)
  })
  it('should throw an error if a is greater than b', () => {
    expect(() => sigma(CALLBACK, 2, 1)).toThrow(RangeError)
  })
})


describe('round', () => {
  it('should round a number to the closest integer if n = 0', () => {
    expect(round(1.4)).toBe(1)
    expect(round(1.5)).toBe(2)
  })
  it('should round a number to the specified number of decimal places if n > 0', () => {
    expect(round(1.23, 1)).toBe(1.2)
    expect(round(1.23, 2)).toBe(1.23)
    expect(round(1.23, 3)).toBe(1.230)
  })
  it('should round a number with trailing zeros if n < 0', () => {
    expect(round(123, -1)).toBe(120)
    expect(round(123, -2)).toBe(100)
    expect(round(123, -3)).toBe(0)
  })
  it('should throw an error if n is not an integer', () => {
    expect(() => round(1.23, 1.5)).toThrow(TypeError)
  })
})


describe('clamp', () => {
  it('should return the value if it is within the specified range', () => {
    expect(clamp(0, 1, 2)).toBe(1)
    expect(clamp(1, 1, 2)).toBe(1)
    expect(clamp(2, 1, 2)).toBe(2)
  })
  it('should return the minimum value if the value is less than the minimum', () => {
    expect(clamp(-1, 1, 2)).toBe(1)
  })
  it('should return the maximum value if the value is greater than the maximum', () => {
    expect(clamp(3, 1, 2)).toBe(2)
  })
  it('should invert min and max arguments if max < min', () => {
    expect(clamp(4, 5, 3)).toBe(4)
    expect(clamp(2, 5, 3)).toBe(3)
    expect(clamp(6, 5, 3)).toBe(5)
  })
})


describe('modulo', () => {
  it('should return a positive modulo when then number is positive', () => {
    expect(modulo(5, 2)).toBe(1)
    expect(modulo(5, 3)).toBe(2)
    expect(modulo(5, 4)).toBe(1)
    expect(modulo(5, 5)).toBe(0)
    expect(modulo(5, 6)).toBe(5)
  })
  it('should return a positive modulo when then number is negative', () => {
    expect(modulo(-5, 2)).toBe(1)
    expect(modulo(-5, 3)).toBe(1)
    expect(modulo(-5, 4)).toBe(3)
    expect(modulo(-5, 5)).toBe(0)
    expect(modulo(-5, 6)).toBe(1)
  })
  it('should return a negative modulo when then modulo is negative', () => {
    expect(modulo(5, -2)).toBe(-1)
    expect(modulo(5, -3)).toBe(-1)
    expect(modulo(5, -4)).toBe(-3)
    expect(modulo(5, -5)).toBe(0)
    expect(modulo(5, -6)).toBe(-1)
  })
})


describe('isPrime', () => {
  it('should return true if the number is prime', () => {
    expect(isPrime(2)).toBeTruthy()
    expect(isPrime(3)).toBeTruthy()
    expect(isPrime(5)).toBeTruthy()
    expect(isPrime(7)).toBeTruthy()
    expect(isPrime(11)).toBeTruthy()
    expect(isPrime(13)).toBeTruthy()
    expect(isPrime(17)).toBeTruthy()
    expect(isPrime(19)).toBeTruthy()
  })
  it('should return false if the number is not prime', () => {
    expect(isPrime(-1)).toBeFalsy()
    expect(isPrime(0)).toBeFalsy()
    expect(isPrime(1)).toBeFalsy()
    expect(isPrime(4)).toBeFalsy()
    expect(isPrime(6)).toBeFalsy()
    expect(isPrime(8)).toBeFalsy()
    expect(isPrime(9)).toBeFalsy()
    expect(isPrime(10)).toBeFalsy()
    expect(isPrime(12)).toBeFalsy()
    expect(isPrime(14)).toBeFalsy()
    expect(isPrime(15)).toBeFalsy()
    expect(isPrime(16)).toBeFalsy()
    expect(isPrime(18)).toBeFalsy()
    expect(isPrime(20)).toBeFalsy()
  })
})


describe('fillZeros', () => {
  it('should return a string of a positive integer with the specified number of zeros', () => {
    expect(fillZeros(0, 3)).toBe('000')
    expect(fillZeros(10, 3)).toBe('010')
    expect(fillZeros(100, 3)).toBe('100')
    expect(fillZeros(1000, 3)).toBe('1000')
  })
  it('should return a string of a negative integer with the specified number of zeros', () => {
    expect(fillZeros(-1, 3)).toBe('-001')
    expect(fillZeros(-10, 3)).toBe('-010')
    expect(fillZeros(-100, 3)).toBe('-100')
    expect(fillZeros(-1000, 3)).toBe('-1000')
  })
  it('should return a string of a positive decimal with the specified number of zeros', () => {
    expect(fillZeros(1.1, 3)).toBe('001.1')
    expect(fillZeros(10.1, 3)).toBe('010.1')
    expect(fillZeros(100.1, 3)).toBe('100.1')
    expect(fillZeros(1000.1, 3)).toBe('1000.1')
  })
  it('should return a string of a negative decimal with the specified number of zeros', () => {
    expect(fillZeros(-1.1, 3)).toBe('-001.1')
    expect(fillZeros(-10.1, 3)).toBe('-010.1')
    expect(fillZeros(-100.1, 3)).toBe('-100.1')
    expect(fillZeros(-1000.1, 3)).toBe('-1000.1')
  })
})


describe('range', () => {
  it('should return an array of consecutive numbers in ascendant order', () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4])
    expect(range(1, 5)).toEqual([1, 2, 3, 4])
    expect(range(5, 1)).toEqual([1, 2, 3, 4])
  })
  it('should return an array of consecutive numbers in descendant order', () => {
    expect(range(1, 5, -1)).toEqual([5, 4, 3, 2])
    expect(range(5, 1, -1)).toEqual([5, 4, 3, 2])
  })
  it('should return an array of consecutive numbers in ascendant order with a step', () => {
    expect(range(1, 5, 2)).toEqual([1, 3])
    expect(range(5, 1, 2)).toEqual([1, 3])
  })
  it('should return an array of consecutive numbers in descendant order with a step', () => {
    expect(range(5, 1, -2)).toEqual([5, 3])
    expect(range(1, 5, -2)).toEqual([5, 3])
  })
  it('should return an array of negative numbers in ascendant order', () => {
    expect(range(-5)).toEqual([-5, -4, -3, -2, -1])
    expect(range(-5, -1)).toEqual([-5, -4, -3, -2])
    expect(range(-1, -5)).toEqual([-5, -4, -3, -2])
  })
  it('should return an array of negative numbers in descendant order', () => {
    expect(range(-5, -1, -1)).toEqual([-1, -2, -3, -4])
    expect(range(-1, -5, -1)).toEqual([-1, -2, -3, -4])
  })
  it('should return an array of negative numbers in ascendant order with a step', () => {
    expect(range(-5, -1, 2)).toEqual([-5, -3])
    expect(range(-1, -5, 2)).toEqual([-5, -3])
  })
  it('should return an array of negative numbers in descendant order with a step', () => {
    expect(range(-5, -1, -2)).toEqual([-1, -3])
    expect(range(-1, -5, -2)).toEqual([-1, -3])
  })
})


describe('factorial and factorialIterative', () => {
  it('should return the factorial of a number', () => {
    expect(factorial(0)).toBe(1)
    expect(factorial(1)).toBe(1)
    expect(factorial(2)).toBe(2)
    expect(factorial(3)).toBe(6)
    expect(factorial(4)).toBe(24)
    expect(factorial(5)).toBe(120)
    expect(factorial(6)).toBe(720)
    expect(factorial(7)).toBe(5040)
    expect(factorial(8)).toBe(40320)
    expect(factorial(9)).toBe(362880)
    expect(factorial(10)).toBe(3628800)
  })
  it('should return the factorial of a number iteratively', () => {
    expect(factorialIterative(0)).toBe(1)
    expect(factorialIterative(1)).toBe(1)
    expect(factorialIterative(2)).toBe(2)
    expect(factorialIterative(3)).toBe(6)
    expect(factorialIterative(4)).toBe(24)
    expect(factorialIterative(5)).toBe(120)
    expect(factorialIterative(6)).toBe(720)
    expect(factorialIterative(7)).toBe(5040)
    expect(factorialIterative(8)).toBe(40320)
    expect(factorialIterative(9)).toBe(362880)
    expect(factorialIterative(10)).toBe(3628800)
  })
})
