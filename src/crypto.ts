import { removeDiacritics } from './string'


/**
 * Vigenere cipher.
 * Encore or decodes a message using a key.
 * Set decode argument to true to decode.
 */
export function vigenere (message: string, key: string, decode = false): string {
  message = removeDiacritics(message)
  let result = ''
  let gap = 0
  let lower = 'abcdefghijklmnopqrstuvwxyz'
  let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0, l = message.length; i < l; i++) {
    let char = message[i]
    if (/[a-zA-Z]/.test(char)) {
      let charPosition = (char.toLowerCase()).codePointAt(0)! - 97
      let keyPosition = (key[(i - gap) % key.length].toLowerCase()).codePointAt(0)! - 97
      let alphabet = char === char.toLowerCase() ? lower : upper
      if (!decode) {
        result += alphabet[(charPosition + keyPosition) % 26]
      } else {
        result += alphabet[(charPosition - keyPosition + 26) % 26]
      }
    } else { // non alphabetic character : adding a gap in the key index
      result += char
      gap++
    }
  }
  return result
}


/**
 * Caesar cipher.
 * Encode or decode a message with the specified shift.
 * Default shift is 13.
 */
export function caesar (message: string, n = 13): string {
  n = (n % 26 + 26) % 26
  return message.replace(/[a-z]/gi, char => {
    let delta = char == char.toLowerCase() ? 97 : 65
    return String.fromCharCode((char.charCodeAt(0) - delta + n) % 26 + delta)
  })
}
