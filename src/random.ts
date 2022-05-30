import { checkPositiveInteger } from './checkers'
import { clamp, range } from './maths'

/**
 * Get a random integer, from a to b excluded, with a specified step.
 * Distribution = 1 means uniform distribution.
 * Distribution = 2 means triangular distribution.
 * Distribution = 3 and above means gaussian distribution, more or less tight.
 */
export function randomInt (a: number, b = 0, step = 1, distribution = 1): number {
  if (b > a) [b, a] = [a, b]
  let random = 0
  for (let i = 0; i < distribution; i++) {
    random += Math.random()
  }
  random /= distribution
  return Math.floor(random * (a - b) / step) * step + b
}


/**
 * Return true with the specified probability, false otherwise.
 * The probability must be between 0 and 100.
 */
export function chance (probability = 50): boolean {
  probability = clamp(probability, 0, 100) / 100
  return Math.random() < probability
}


/**
 * Pick a random element from an array.
 * Set the remove argument to true to remove the element from the array.
 * If the array is empty, return undefined.
 */
export function choice<T> (array: T[], remove = false): T | undefined {
  if (array.length === 0) return undefined
  const position = randomInt(array.length)
  return remove ? array.splice(position, 1)[0] : array[position]
}


/**
 * Pick randomly n elements from an array.
 * Set replacement to true if you want your sample to be a replacement sample.
 * Undefined values are ignored.
 */
export function sample<T> (array: T[], n = 1, replacement = false): T[] {
  checkPositiveInteger(n, 'n')
  const clone = [...array]
  const choices = []
  for (let i = 0; i < n; i++) {
    const picked = choice(clone, !replacement)
    if (picked !== undefined) {
      choices.push(picked)
    }
  }
  return choices as T[]
}


/**
 * Shuffle randomly an array or a string (non-mutating).
 */
export function shuffled<T> (element: T[] | string): T[] | string {
  let keys = range(element.length)
  const random = () => {
    const key = choice(keys, true)
    return key != null ? element[key] : undefined
  }
  if (typeof element === 'string') {
    return [...element].map(random).join('')
  }
  return element.map(random) as T[]
}


/**
 * Suffle randomly an array.
 * This method is 10x faster than shuffled, but mutates the array.
 */
export function shuffle<T> (array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}