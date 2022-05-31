import { checkPositiveInteger } from './checkers'
import { factorial } from './maths'


/**
 * Calculate the number of k-permutations of n.
 */
export function perm (n: number, k: number): number {
  checkPositiveInteger(n, 'n', false)
  checkPositiveInteger(k, 'k', false)
  return k > n ? 0 : factorial(n) / factorial(n - k)
}


/**
 * Calculate the binomial coefficient of k choose n.
 */
export function comb (n: number, k: number): number {
  checkPositiveInteger(n, 'n', false)
  checkPositiveInteger(k, 'k', false)
  return k == 0 || k == n ? 1 : n < k ? 0 : factorial(n) / (factorial(k) * factorial(n - k))
}


/**
 * Calculate all combinations of n elements in an array.
 * If n is 0, return all combinations (from n = 1 to n = array.length).
 */
export function getCombinations (array: any[], n = 0): any[][] {
  checkPositiveInteger(n, 'n', false)
  const combinations: any[][] = []

  if (n === 0) { // get all combinations
    for (let i = 0; i < 2 ** length; i++) {
      let sub = []
      for (let j = 0; j < length; j++) {
        if (i & 2 ** j) sub.push(array[j])
      }
      if (sub.length) combinations.push(sub)
    }
    combinations.sort((a, b) => a.length - b.length)
  } else { // get combinations of n elements
    for (let i = 0; i < array.length; i++) {
      if (n == 1) {
        combinations.push([array[i]])
      } else {
        const combinationsOfSubset = getCombinations(array.slice(i + 1), n - 1)
        for (const combination of combinationsOfSubset) {
          combinations.push([array[i], ...combination])
        }
      }
    }
  }
  
  return combinations
}
