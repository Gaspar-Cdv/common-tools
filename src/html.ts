// TODO
// Debounce and throttle

import { checkPositiveInteger } from './checkers'

function insertIf(condition: boolean, ...values: any[]): any[] {
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
    ...insertIf(currentPage > distance + 1, '...'),
    ...[...Array(2 * distance + 1)].map((x, i) => i + currentPage - distance).filter(x => x > 1 && x < nbPages),
    ...insertIf(currentPage < nbPages - distance, '...'),
    ...insertIf(nbPages > 1, nbPages)
  ]
}

