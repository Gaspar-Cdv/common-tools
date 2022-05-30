import { checkPositiveInteger } from './checkers'

/**
 * Universal sort of an array (destructive).
 */
export function sort (array: any[], reverse = false): any[] {
  return array.sort((a, b) => {
    if (reverse) [a, b] = [b, a]
    return typeof a == "number" ? a - b : a.localeCompare(b)
  })
}


/**
 * Search deeply a value in an array.
 */
export function search (value: any, array: any[]): boolean {
  let regex = new RegExp("[[,]" + JSON.stringify(value) + "[,\\]]")
  return regex.test(JSON.stringify(array))
}


/**
 * @returns array without duplicates.
 */
export function unique (array: any[]): any[] {
  return [...new Set(array)]
}


/**
 * @returns the number of times a value appears in a string or an array.
 */
export function count<T> (value: T | string, element: T[] | string) {
  let count = 0
  for (let i = 0, l = element.length; i < l; i++) {
    if (element[i] === value) count++
  }
  return count
}

/**
 * Count all items in an element.
 * (all characters in a string or all values in an array).
 * @returns an object with items as keys and their count as values.
 */
export function countItems (element: any[] | string): { [key: string]: number } {
  let counts: { [key: string]: number } = {}
  for (let i = 0, l = element.length; i < l; i++) {
    let item = element[i]
    counts[element[i]] = counts[element[i]] + 1 || 1
  }
  return counts
}


/**
 * Zip arrays together.
 */
export function zip (...arrays: any[][]) {
  let longest = Math.max(...arrays.map(x => x.length))
  for (let i = 0; i < longest; i++) {
    arrays[0][i] = arrays.map(array => array[i])
  }
  return arrays[0]
}


/**
 * Deeply clones an array, an object, a map or a set.
 * @returns the cloned element.
 */
export function clone<T extends any[] | object | Map<any, any> | Set<any>> (element: T): T {
  if (element instanceof Map) {
    return new Map(element) as T
  } else if (element instanceof Set) {
    return new Set(element) as T
  } else {
    return JSON.parse(JSON.stringify(element)) as T
  }
}


/**
 * Rotate an array or a string n times. Rotate right for positive numbers and left for negative numbers.
 * @returns the rotated element.
 */
export function rotate<T extends string | any[]> (element: T, n = 1): T {
  return (typeof element === 'string' ?
    internalRotate(element.split(''), n).join('') :
    internalRotate(element, n)) as T
}


function internalRotate (element: any[], n = 1): any[] {
  return n > 0 ? element.splice(element.length - n).concat(element) : element.concat(element.splice(0, -n % element.length))
}


/******************** ARRAY DIVISION ********************/


/**
 * Convert array or string to array, grouping identical consecultive values together.
 */
export function groupBy<T extends any[] | string> (element: T): T[] {
  if (Array.isArray(element)) {
    return element.reduce((acc, curr, i) => {
      if (i === 0 || curr !== acc[acc.length - 1][0]) {
        acc.push([curr])
      } else {
        acc[acc.length - 1].push(curr)
      }
      return acc
    }, [])
  }

  return element.match(/(.)\1*/g) as T[]
}

/**
 * Chunk an element in sub elements of size n.
 * @returns an array of chunked elements
 */
export function chunk (element: any[] | string, n: number): any[] {
  checkPositiveInteger(n, 'n')

  let chunks = []
  for (let i = 0, l = element.length; i < l; i += n) {
    chunks.push(element.slice(i, i + n))
  }
  return chunks
  // for strings : element.match(/.{1, n}/g) // slower but smaller
}


/**
 * Divide an array or a string in n arrays of equal size.
 * If the length of the element is not divisible by n, you can choose if you want the biggest chunks on start, using `biggerOnStart`.
 * Default value is true.
 * @returns an array of n arrays of equal size.
 */
export function divide (element: any[] | string, n: number, biggerOnStart = true) {
  checkPositiveInteger(n, 'n')

  let length = element.length
  let chunkSize = Math.floor(length / n) + Number(biggerOnStart)
  let middle = chunkSize * (biggerOnStart ? length % n : n - length % n)
  let sizeChanged = false

  let chunks = []
  for (let i = 0; i < length; i += chunkSize) {
    if (!sizeChanged && i + chunkSize > middle) {
      chunkSize += biggerOnStart ? -1 : 1
      sizeChanged = true
    }
    chunks.push(element.slice(i, i + chunkSize))
  }

  return chunks
}


/**
 * Split an array in two arrays, according to a condition given in the callback.
 * The callback can accept three arguments : `value`, `index` and `array` (like a native filter function).
 * @returns an array of two sub arrays : where callback is true and where callback is false
 */
export function partition (array: any[], callback: (value: any, index: number, array: any[]) => boolean): [any[], any[]] {
  let trueFilter = []
  let falseFilter = []
  for (let i = 0, l = array.length; i < l; i++) {
    if (callback(array[i], i, array)) {
      trueFilter.push(array[i])
    } else {
      falseFilter.push(array[i])
    }
  }
  return [trueFilter, falseFilter]
}


/******************** MULTIDIMENSIONAL ARRAY ********************/


/**
 * Initialize a multidimensional array with specified value (default is undefined)
 * @returns a multidimensional array
 */
export function createMulti (height: number, width: number, value: any = undefined) {
  checkPositiveInteger(height, 'height')
  checkPositiveInteger(width, 'width')

  return [...Array(height)].map(() => [...Array(width)].map(() => value))
}


/**
 * Rotate a multidimensional array to left.
 * @returns the rotated array
 */
export function turnLeft (array: any[][]): any[][] {
  return array[0].map((x, i) => array.map(y => y[i])).reverse()
}


/**
 * Rotate a multidimensional array to right.
 * @returns the rotated array
 */
export function turnRight (array: any[][]): any[][] {
  return array[0].map((x, i) => [...array].reverse().map(y => y[i]))
}