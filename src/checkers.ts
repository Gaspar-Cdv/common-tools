/**
 * Check if the number is a positive integer.
 * The strict argument defines if the number must be strictly positive.
 * Default is true.
 */
export function checkPositiveInteger (number: number, name = 'given', strict = true): void {
  const isNegative = strict ? number <= 0 : number < 0
  if (isNegative || !Number.isInteger(number)) {
    throw TypeError(`The ${name} argument must be a ${strict ? 'strictly ' : ''}positive integer.`)
  }
}
