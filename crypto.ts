import { removeDiacritics } from './string'

/**
 * Vigenere cipher.
 * Encore or decodes a message using a key.
 * Set decode argument to true to decode.
 */
export function vigenere (message: string, key: string, decode = false): string {
  message = removeDiacritics(message)
  let result = ''
  let keyIndex = 0
  let keyLength = key.length
  for (let i = 0; i < message.length; i++) {
    let char = message[i]
    if (char.match(/[a-zA-Z]/)) {
      let charCode = char.charCodeAt(0)
      let keyChar = key[keyIndex]
      let keyCode = keyChar.charCodeAt(0)
      let shift = decode ? -keyCode : keyCode
      let newCode = charCode + shift
      if (newCode < 97) newCode += 26
      if (newCode > 122) newCode -= 26
      result += String.fromCharCode(newCode)
      keyIndex = (keyIndex + 1) % keyLength
    } else {
      result += char
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

