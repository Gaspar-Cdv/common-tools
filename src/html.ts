import { checkPositiveInteger } from './checkers'


function insertIf (condition: boolean, ...values: any[]): any[] {
  return condition ? values : []
}

/**
 * From a number of pages and a page number, returns an array of nearest pages.
 * Returns the first page, the current page and around at a distance specified by the argument, and the last page.
 * Replace the pages not displayed by ellipsis.
 */
export function getPages (currentPage: number, nbPages: number, distance: number = 2): any[] {
  checkPositiveInteger(currentPage, 'currentPage')
  checkPositiveInteger(nbPages, 'nbPages')
  checkPositiveInteger(distance, 'distance', false)

  return [
    1,
    ...insertIf(currentPage > distance + 2, '...'),
    ...[...Array(2 * distance + 1)].map((x, i) => i + currentPage - distance).filter(x => x > 1 && x < nbPages),
    ...insertIf(currentPage < nbPages - distance - 1, '...'),
    ...insertIf(nbPages > 1, nbPages)
  ]
}


/**
 * Debounces a callback after the specified delay.
 * Set immediate to true to execute the function immediately instead of after.
 * @returns the debounced function
 */
export function debounce (callback: Function, delay: number, immediate = false): () => void {
  let timeout: NodeJS.Timeout | null

  return function () {
    const later = () => {
      clearTimeout(timeout!)
      if (!immediate) {
        // @ts-ignore
        callback.apply(this, arguments)
      }
    }

    if (!timeout && immediate) {
      // @ts-ignore
      callback.apply(this, arguments)
    }

    clearTimeout(timeout!)
    timeout = setTimeout(later, delay)
  }
}


/**
 * Throttles a callback after the specified delay.
 * @returns the throttled function
 */
export function throttle (callback: Function, delay: number): Function {
  let last: number
  let timeout: NodeJS.Timeout | null

  return function () {
    const now = Date.now()
    const apply = () => {
      // @ts-ignore
      callback.apply(this, arguments)
      last = now
    }
    if (last && now < last + delay) {
      clearTimeout(timeout!)
      timeout = setTimeout(apply, delay)
    } else {
      apply()
    }
  }
}
