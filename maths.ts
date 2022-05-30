import { checkPositiveInteger } from './checkers'

/**
 * Calculate the nth root of a given number.
 */
export function nthRoot (number: number, n: number): number {
  return Math.pow(number, 1 / n)
}


/**
 * Calculate the sum of the result of a callback, from a to b excluded.
 * This is the equivalent of Σ.
 */
export function sigma (callback: (x: number) => number, a: number, b: number): number {
  return [...Array(b - a)].map((_, i) => callback(i + a)).reduce((a, b) => a + b, 0)
}


/**
 * Calculate the round of a number, with a given precision.
 * If the precision is positive, the result is rounded to the right of the decimal point.
 * If the precision is negative, the result is rounded to the left of the decimal point.
 */
export function round (number: number, precision: number): number {
  return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)
}


/**
 * Clamp a number between a min and a max.
 */
export function clamp (number: number, min: number, max: number): number {
  return Math.min(Math.max(number, min), max)
}

/**
 * Calculate the modulo of a and n (a % n).
 * It works with negative numbers.
 */
export function modulo (a: number, n: number): number {
  return ((a % n) + n) % n
}


/**
 * Determine if the number is prime
 */
export function isPrime (n: number): boolean {
  if (n < 2 || n % 2 === 0) return false
  if (n === 2) return true
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false
  }
  return true
}


/**
 * Fill a number with non-significant leading zeros.
 */
export function fillZeros (number: number, length: number): string {
  const sign = number >= 0 ? '' : '-'
  const stringNumber = Math.abs(number).toString().split('.')
  stringNumber[0] = stringNumber[0].padStart(length, '0')
  return sign + stringNumber.join('')
}


/**
 * Get an array of range from a to b excluded, with a specified step.
 * If the step is negative, the array will be reversed.
 */
export function range (a: number, b = 0, step = 1): number[] {
  if (a > b) [a, b] = [b, a];
  const array = []
  if (step > 0) {
    for (let i = a; i < b; i += step) {
      array.push(i)
    }
  } else {
    for (let i = a; i > b; i += step) {
      array.push(i)
    }
  }
  return array
}


/**
 * Calculate recursively the factorial of a number.
 */
export function factorial (n: number): number {
  return n == 1 ? n : n * factorial(n - 1)
}


/**
 * Calculate iteratively the factorial of a number.
*/
export function factorialIterative (n: number): number {
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}
