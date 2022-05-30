/******************** STRING CONSTANTS ********************/

import { createRegex } from './regex'


export const LOWER = "abcdefghijklmnopqrstuvwxyzàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿœ"
export const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝŸŒ"
export const NUMBERS = "0123456789"
export const PUNCT = "!'#$%&\"()*+-,./:;<=>?@[\\]^_`{|}~ "
export const PUNCT_REGEX = /[\!'#$%&"()*+-,./:;<=>\?@[\\\]^_`{|}~ ]/g

// [a-z] -> [97-122]
// [A-Z] -> [65-90]
// [0-9] -> [48-57]
// punct -> [32-47] [58-64] [91-96] [123-127] [160-191]


/******************** STRING UTILS ********************/


/**
 * Remove all diacritics from a string.
 */
export function removeDiacritics (str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}


/**
 * Remove all punctuations from a string.
 * The except argument is a string of characters to keep.
 */
export function removePunctuation (str: string, except = '') {
  return str.replace(createRegex(PUNCT, except), '')
}


/******************** STRING CHECKERS ********************/


/**
 * Check if the string is lowercase.
 * Put strict argument to true if you want your string to contain only alphabetics characters.
 * Default is false (example : `"hello!" -> true`).
 * @returns true if the string is lowercase, false otherwise.
 */
export function isLower (string: string, strict = false): boolean {
  return strict ?
    new RegExp("^[" + LOWER + "]+$").test(string) :
    [...string].every(x => x == x.toLowerCase())
}


/**
 * Check if the string is uppercase.
 * Put strict argument to true if you want your string to contain only alphabetics characters.
 * Default is false (example : `"HELLO!" -> true`).
 * @returns true if the string is uppercase, false otherwise.
 */
export function isUpper (string: string, strict = false): boolean {
  return strict ? new RegExp("^[" + UPPER + "]+$").test(string) : [...string].every(x => x == x.toUpperCase())
}


/**
 * Check if the string contains only alphabetic charaters.
 * @returns true if the string contains only alphabetic characters, false otherwise.
 */
export function isAlpha (string: string): boolean {
  return new RegExp("^[" + LOWER + "]+$", "i").test(string)
}


/**
 * Check if the string contains only alphanumeric charaters.
 * @returns true if the string contains only alphanumeric characters, false otherwise.
 */
export function isAlnum (string: string): boolean {
  return new RegExp("^[" + LOWER + "0-9]+$", "i").test(string)
}


/**
 * Check if the string contains only punctuation charaters.
 * @returns true if the string contains only punctuation characters, false otherwise.
 */
export function isPunct (string: string): boolean {
  return new RegExp("^[" + PUNCT + "]+$").test(string)
}


/**
 * Check if the string (or the number) is a valid number.
 * @returns true if the argument is a valid number, false otherwise.
 */
export function isNum (n: any) {
  return (typeof n === 'number' && !isNaN(n)) || (typeof n === 'string' && typeof +n === 'number')
}


/******************** STRING CASE ********************/


/**
 * Convert a string to title case (all words are capitalized).
 */
export function toTitleCase (str: string) {
  return str.split(/( *[.!?, ] *)/).filter(x => x !== '').map(x => x[0].toUpperCase() + x.slice(1).toLowerCase()).join('')
}


/**
 * Convert a string to sentence case (all sentences are capitalized).
 */
export function toSentenceCase (str: string) {
  return str.split(/( *[.!?] *)/).filter(x => x !== '').map(x => x[0].toUpperCase() + x.slice(1).toLowerCase()).join('')
}


/**
 * Invert the case of a string.
 */
export function swapCase (str: string) {
  return str.split('').map(x => x === x.toUpperCase() ? x.toLowerCase() : x.toUpperCase()).join('')
}


/**
 * Convert a string to camelCase.
 * Remove all punctuations and diacritics.
 * The except argument is a string of characters to keep.
 */
export function toCamelCase (str: string, except: string = '') {
  str = removeDiacritics(str)
  const regex = createRegex(PUNCT, except)
  return str.split(regex)
    .filter(x => x !== '')
    .map((x, i) => i === 0 ? x.toLowerCase() : toTitleCase(x)).join('')
}


/**
 * Convert a string to snake_case.
 * Remove all punctuations and diacritics.
 * The except argument is a string of characters to keep.
 */
export function toSnakeCase (str: string, except: string = '') {
  str = removeDiacritics(str).toLowerCase()
  const regex = createRegex(PUNCT, except)
  return str.split(regex).filter(x => x !== '').join('_')
}


/**
 * Convert a string to kebab-case.
 * Remove all punctuations and diacritics.
 * The except argument is a string of characters to keep.
 */
export function toKebabCase (str: string, except: string = '') {
  str = removeDiacritics(str).toLowerCase()
  const regex = createRegex(PUNCT, except)
  return str.split(regex).filter(x => x !== '').join('-')
}

/**
 * Convert a string to PascalCase.
 * Remove all punctuations and diacritics.
 * The except argument is a string of characters to keep.
 */
export function toPascalCase (str: string, except: string = '') {
  str = removeDiacritics(str).toLowerCase()
  const regex = createRegex(PUNCT, except)
  return str.split(regex).filter(x => x !== '').map(x => toTitleCase(x)).join('')
}

/******************** STRING MANIPULATION ********************/


/**
 * Splice a string from start to end.
 * If end is not specified, it will cut only one character.
 */
export function cut (str: string, start: number, end = start + 1) {
  return str.slice(0, start) + str.slice(end)
}


/**
 * Center a string by adding the fill argument on both sides, until it reaches the specified length.
 */
export function padCenter (str: string, length: number, fill = ' ') {
  const left = Math.floor((length - str.length) / 2)
  const right = length - str.length - left
  return fill.repeat(left) + str + fill.repeat(right)
}

/**
 * Normalize a string by trimming it, and removing double spaces.
 */
export function normalize (str: string) {
  return str.trim().replace(/\s+/g, ' ')
}


/**
 * Trim a string.
 * Remove the specified chars at the start and end of the string.
 */
export function trim (str: string, chars = ' ') {
  return str.replace(new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'g'), '')
}


/**
 * Get the position of a letter in the alphabet.
 * A is 1, B is 2, ..., Z is 26.
 * @returns the position of the letter in the alphabet, or -1 if the letter is not in the alphabet.
 */
export function getAlphabetPosition (letter: string) {
  const code = removeDiacritics(letter.toUpperCase()).charCodeAt(0)
  return code > 64 && code < 91 ? code - 64 : -1
}