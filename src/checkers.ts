/**
 * Check if the number is an integer.
 * @throws TypeError if the number is not an integer.
 */
 export function checkInteger (number: number, name = 'given'): void {
  if (!Number.isInteger(number)) {
    throw TypeError(`The ${name} argument must be an integer. Found ${number}.`)
  }
}


/**
 * Check if the number is positive.
 * The strict argument defines if the number must be strictly positive.
 * Default is true.
 * @throws RangeError if the number is not positive.
 */
export function checkPositive (number: number, name = 'given', strict = true): void {
  if (strict ? number <= 0 : number < 0) {
    throw RangeError(`The ${name} argument must be ${strict ? 'strictly ' : ''}positive. Found ${number}.`)
  }
}


/**
 * Check if the number is a positive integer.
 * The strict argument defines if the number must be strictly positive.
 * Default is true.
 * @throws TypeError if the number is not a positive integer.
 */
export function checkPositiveInteger (number: number, name = 'given', strict = true): void {
  const isNegative = strict ? number <= 0 : number < 0
  if (isNegative || !Number.isInteger(number)) {
    throw TypeError(`The ${name} argument must be a ${strict ? 'strictly ' : ''}positive integer. Found ${number}.`)
  }
}


/**
 * Check if the first number is less than the second.
 * @throws RangeError if the first number is not less than the second.
 */
export function checkLessThan (first: number, second: number, firstName = 'first', secondName = 'second'): void {
  if (first >= second) {
    throw RangeError(`The ${firstName} argument must be less than the ${secondName} argument. Found respectively ${first} and ${second}.`)
  }
}

/**
 * Check if the first number is less than or equal to the second.
 * @throws RangeError if the first number is not less than or equal to the second.
 */
export function checkLessThanOrEqual (first: number, second: number, firstName = 'first', secondName = 'second'): void {
  if (first > second) {
    throw RangeError(`The ${firstName} argument must be less than or equal to the ${secondName} argument. Found respectively ${first} and ${second}.`)
  }
}
