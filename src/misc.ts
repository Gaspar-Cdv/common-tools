/**
 * @returns the type of an element (array, object, map, set, number, string, boolean,...).
 */
export function getType (element: any): string {
  return toString.call(element).slice(8, -1).toLowerCase()
}


/**
 * Calculate the benchmark for a specific callback.
 * You can choose the number of tests. Default is 100000.
 * @returns the number of calls per second.
 */
export function benchmark (callback: Function, times = 100000): number {
  let time = -Date.now()
  for (let i = 0; i < times; i++) {
    callback()
  }
  time = (time + Date.now()) / 1000
  return Math.round(times / time)
}


/**
 * Wait the specified number of milliseconds.
 */
export function sleep (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}


/**
 * Memoise a function.
 * @returns a memoised version of the function.
 */
export function memoize<T extends any[], U> (callback: (...args: T) => U): (...args: T) => U {
  const cache: { [key: string]: any } = {}

  return function (...args: T): U {
    const key = JSON.stringify(args)
    if (cache[key] === undefined) {
      cache[key] = callback(...args)
    }
    return cache[key]
  }
}
