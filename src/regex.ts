import { without } from './sets'


/**
 * Escape critical characters (put a backslash before).
 */
export function escapeRegex (string: string): string {
  return string.replace(/[.*+-?^${}()|[\]\\]/g, '\\$&')
}


/**
 * Create a RegExp of match argument, without except argument.
 * @returns created RegExp : `/[match without except]+/g`
 */
export function createRegex (match: string, except = ''): RegExp {
  match = without(match, ...except)
  return new RegExp('[' + escapeRegex(match) + ']+', 'g')
}
