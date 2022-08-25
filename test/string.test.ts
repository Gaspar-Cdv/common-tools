import {
	removeDiacritics,
	removePunctuation,
	isLower,
	isUpper,
	isAlpha,
	isAlnum,
	isPunct,
	isNum,
	toTitleCase,
	toSentenceCase,
	swapCase,
	toCamelCase,
	toSnakeCase,
	toKebabCase,
	cut,
	toPascalCase,
	padCenter,
	normalize,
	trim,
	getAlphabetPosition
} from '../src/string'


describe('removeDiacritics', () => {
	it('should remove diacritics', () => {
		expect(removeDiacritics('áéíóú')).toEqual('aeiou')
		expect(removeDiacritics('ÁÉÍÓÚ')).toEqual('AEIOU')
		expect(removeDiacritics('àèìòù')).toEqual('aeiou')
		expect(removeDiacritics('ÀÈÌÒÙ')).toEqual('AEIOU')
		expect(removeDiacritics('âêîôû')).toEqual('aeiou')
		expect(removeDiacritics('ÂÊÎÔÛ')).toEqual('AEIOU')
		expect(removeDiacritics('ãõũ')).toEqual('aou')
		expect(removeDiacritics('ÃÕŨ')).toEqual('AOU')
	})
})


describe('removePunctuation', () => {
	it('should remove punctuation', () => {
		expect(removePunctuation('Hello World')).toEqual('Hello World')
		expect(removePunctuation('Hello, World !')).toEqual('Hello World')
		expect(removePunctuation('!@#$%^&*()_+-=[]{};:\'\\"|,./<>?`~')).toEqual('')
	})
	it('should remove punctuation except the ones passed as argument', () => {
		expect(removePunctuation('Hello, World !', '! ')).toEqual('Hello World !')
		expect(removePunctuation('Hello, World !', ', ')).toEqual('Hello, World')
	})
})


describe('isLower', () => {
	it('should return true if the string is lowercase', () => {
		expect(isLower('hello')).toBeTruthy()
		expect(isLower('hello, world !')).toBeTruthy()
		expect(isLower('HELLO')).toBeFalsy()
		expect(isLower('Hello, World !')).toBeFalsy()
	})
	it('should return true if the string is strictly lowercase', () => {
		expect(isLower('hello', true)).toBeTruthy()
		expect(isLower('hello, world !', true)).toBeFalsy()
		expect(isLower('HELLO', true)).toBeFalsy()
		expect(isLower('Hello, World !', true)).toBeFalsy()
	})
})


describe('isUpper', () => {
	it('should return true if the string is uppercase', () => {
		expect(isUpper('hello')).toBeFalsy()
		expect(isUpper('hello, world !')).toBeFalsy()
		expect(isUpper('HELLO')).toBeTruthy()
		expect(isUpper('HELLO WORLD !')).toBeTruthy()
	})
	it('should return true if the string is strictly uppercase', () => {
		expect(isUpper('hello', true)).toBeFalsy()
		expect(isUpper('hello, world !', true)).toBeFalsy()
		expect(isUpper('HELLO', true)).toBeTruthy()
		expect(isUpper('HELLO WORLD !', true)).toBeFalsy()
	})
})


describe('isAlpha', () => {
	it('should return true if the string is made of only letters', () => {
		expect(isAlpha('hello')).toBeTruthy()
		expect(isAlpha('hello, world !')).toBeFalsy()
		expect(isAlpha('HELLO')).toBeTruthy()
		expect(isAlpha('Hello, World !')).toBeFalsy()
		expect(isAlpha('hello 123')).toBeFalsy()
	})
})


describe('isAlnum', () => {
	it('should return true if the string is made of only letters and numbers', () => {
		expect(isAlnum('hello')).toBeTruthy()
		expect(isAlnum('hello, world !')).toBeFalsy()
		expect(isAlnum('HELLO')).toBeTruthy()
		expect(isAlnum('Hello, World !')).toBeFalsy()
		expect(isAlnum('hello123')).toBeTruthy()
		expect(isAlnum('hello 123')).toBeFalsy()
	})
})


describe('isPunct', () => {
	it('should return true if the string is made of only punctuation', () => {
		expect(isPunct('?')).toBeTruthy()
		expect(isPunct('hello, world !')).toBeFalsy()
		expect(isPunct('!@#$%^&*()_+-=[]{};:\'\\"|,./<>?`~')).toBeTruthy()
	})
})


describe('isNum', () => {
	it('should return true if the string is made of only numbers', () => {
		expect(isNum('123')).toBeTruthy()
		expect(isNum(123)).toBeTruthy()
		expect(isNum('hello 123')).toBeFalsy()
		expect(isNum(Infinity)).toBeTruthy()
		expect(isNum(NaN)).toBeFalsy()
	})
})


describe('toTitleCase', () => {
	it('should return a title case string', () => {
		expect(toTitleCase('hello')).toEqual('Hello')
		expect(toTitleCase('HELLO')).toEqual('Hello')
		expect(toTitleCase('hello, world !')).toEqual('Hello, World !')
		expect(toTitleCase('HELLO, WORLD !')).toEqual('Hello, World !')
	})
})


describe('toSentenceCase', () => {
	it('should return a sentence case string', () => {
		expect(toSentenceCase('hello')).toEqual('Hello')
		expect(toSentenceCase('HELLO')).toEqual('Hello')
		expect(toSentenceCase('hello, world !')).toEqual('Hello, world !')
		expect(toSentenceCase('HELLO, WORLD !')).toEqual('Hello, world !')
		expect(toSentenceCase('hello, world ! how are you ?')).toEqual('Hello, world ! How are you ?')
		expect(toSentenceCase('HELLO, WORLD ! HOW ARE YOU ?')).toEqual('Hello, world ! How are you ?')
	})
})


describe('swapCase', () => {
	it('should return a string with each letter swapped case', () => {
		expect(swapCase('hello')).toEqual('HELLO')
		expect(swapCase('HELLO')).toEqual('hello')
		expect(swapCase('hello, world !')).toEqual('HELLO, WORLD !')
		expect(swapCase('HELLO, WORLD !')).toEqual('hello, world !')
		expect(swapCase('aBcDeFgHiJkLmNoPqRsTuVwXyZ')).toEqual('AbCdEfGhIjKlMnOpQrStUvWxYz')
	})
})


describe('toCamelCase', () => {
	it('should return a camel case string', () => {
		expect(toCamelCase('hello')).toEqual('hello')
		expect(toCamelCase('HELLO')).toEqual('hello')
		expect(toCamelCase('hello, world !')).toEqual('helloWorld')
		expect(toCamelCase('HELLO, WORLD !')).toEqual('helloWorld')
	})
	it('should return a camel case without removing the letters passed in the second argument', () => {
		expect(toCamelCase('hello ! world', '!')).toEqual('hello!World')
	})
})


describe('toSnakeCase', () => {
	it('should return a snake case string', () => {
		expect(toSnakeCase('hello')).toEqual('hello')
		expect(toSnakeCase('HELLO')).toEqual('hello')
		expect(toSnakeCase('hello, world !')).toEqual('hello_world')
		expect(toSnakeCase('HELLO, WORLD !')).toEqual('hello_world')
	})
	it('should return a snake case without removing the letters passed in the second argument', () => {
		expect(toSnakeCase('hello ! world', '!')).toEqual('hello_!_world')
	})
})


describe('toKebabCase', () => {
	it('should return a kebab case string', () => {
		expect(toKebabCase('hello')).toEqual('hello')
		expect(toKebabCase('HELLO')).toEqual('hello')
		expect(toKebabCase('hello, world !')).toEqual('hello-world')
		expect(toKebabCase('HELLO, WORLD !')).toEqual('hello-world')
	})
	it('should return a kebab case without removing the letters passed in the second argument', () => {
		expect(toKebabCase('hello ! world', '!')).toEqual('hello-!-world')
	})
})


describe('toPascalCase', () => {
	it('should return a pascal case string', () => {
		expect(toPascalCase('hello')).toEqual('Hello')
		expect(toPascalCase('HELLO')).toEqual('Hello')
		expect(toPascalCase('hello, world !')).toEqual('HelloWorld')
		expect(toPascalCase('HELLO, WORLD !')).toEqual('HelloWorld')
	})
	it('should return a pascal case without removing the letters passed in the second argument', () => {
		expect(toPascalCase('hello ! world', '!')).toEqual('Hello!World')
	})
})


describe('cut', () => {
	it('should return a string without the nth character', () => {
		expect(cut('hello', 0)).toEqual('ello')
		expect(cut('hello', 1)).toEqual('hllo')
		expect(cut('hello', 2)).toEqual('helo')
		expect(cut('hello', 4)).toEqual('hell')
	})
	it('should return a string without the slice from the start argument to the end argument', () => {
		expect(cut('hello', 0, 2)).toEqual('llo')
		expect(cut('hello', 2, 4)).toEqual('heo')
		expect(cut('hello', 0, 5)).toEqual('')
	})
})


describe('padCenter', () => {
	it('should return a string with the given length', () => {
		expect(padCenter('hello', 5)).toEqual('hello')
		expect(padCenter('hello', 6)).toEqual('hello ')
		expect(padCenter('hello', 7)).toEqual(' hello ')
		expect(padCenter('hello', 8)).toEqual(' hello  ')
		expect(padCenter('hello', 9)).toEqual('  hello  ')
	})
	it('should return a string with the given length and padding', () => {
		expect(padCenter('hello', 5, '-')).toEqual('hello')
		expect(padCenter('hello', 6, '-')).toEqual('hello-')
		expect(padCenter('hello', 7, '-')).toEqual('-hello-')
		expect(padCenter('hello', 8, '-')).toEqual('-hello--')
		expect(padCenter('hello', 9, '-')).toEqual('--hello--')
	})
	it('should return the same string if the given length is less than the string length', () => {
		expect(padCenter('hello', 3)).toEqual('hello')
		expect(padCenter('hello', 2)).toEqual('hello')
		expect(padCenter('hello', 1)).toEqual('hello')
	})
})


describe('normalize', () => {
	it('should trim a string and remove double spaces', () => {
		expect(normalize(' hello   world  ! ')).toEqual('hello world !')
	})
})


describe('trim', () => {
	it('should trim a string by removing trailing and leading spaces', () => {
		expect(trim('   hello world   ')).toEqual('hello world')
	})
	it('should trim a string by removing trailing and leading specified character', () => {
		expect(trim('   hello world   ', '.')).toEqual('   hello world   ')
		expect(trim('...hello world...', '.')).toEqual('hello world')
	})
	it('should trim a string bu removing trailing and leading multiple characters', () => {
		expect(trim('   hello world   ', '. ')).toEqual('hello world')
		expect(trim('...hello world...', '. ')).toEqual('hello world')
		expect(trim('. .hello world . .', '. ')).toEqual('hello world')
	})
})


describe('getAlphabetPosition', () => {
	it('should return the position of a lowercase in the alphabet', () => {
		expect(getAlphabetPosition('a')).toEqual(1)
		expect(getAlphabetPosition('b')).toEqual(2)
		expect(getAlphabetPosition('c')).toEqual(3)
		expect(getAlphabetPosition('d')).toEqual(4)
		expect(getAlphabetPosition('e')).toEqual(5)
		expect(getAlphabetPosition('f')).toEqual(6)
		expect(getAlphabetPosition('g')).toEqual(7)
		expect(getAlphabetPosition('h')).toEqual(8)
		expect(getAlphabetPosition('i')).toEqual(9)
		expect(getAlphabetPosition('j')).toEqual(10)
		expect(getAlphabetPosition('k')).toEqual(11)
		expect(getAlphabetPosition('l')).toEqual(12)
		expect(getAlphabetPosition('m')).toEqual(13)
		expect(getAlphabetPosition('n')).toEqual(14)
		expect(getAlphabetPosition('o')).toEqual(15)
		expect(getAlphabetPosition('p')).toEqual(16)
		expect(getAlphabetPosition('q')).toEqual(17)
		expect(getAlphabetPosition('r')).toEqual(18)
		expect(getAlphabetPosition('s')).toEqual(19)
		expect(getAlphabetPosition('t')).toEqual(20)
		expect(getAlphabetPosition('u')).toEqual(21)
		expect(getAlphabetPosition('v')).toEqual(22)
		expect(getAlphabetPosition('w')).toEqual(23)
		expect(getAlphabetPosition('x')).toEqual(24)
		expect(getAlphabetPosition('y')).toEqual(25)
		expect(getAlphabetPosition('z')).toEqual(26)
	})
	it('should return the position of a uppercase in the alphabet', () => {
		expect(getAlphabetPosition('A')).toEqual(1)
		expect(getAlphabetPosition('B')).toEqual(2)
		expect(getAlphabetPosition('C')).toEqual(3)
		expect(getAlphabetPosition('D')).toEqual(4)
		expect(getAlphabetPosition('E')).toEqual(5)
		expect(getAlphabetPosition('F')).toEqual(6)
		expect(getAlphabetPosition('G')).toEqual(7)
		expect(getAlphabetPosition('H')).toEqual(8)
		expect(getAlphabetPosition('I')).toEqual(9)
		expect(getAlphabetPosition('J')).toEqual(10)
		expect(getAlphabetPosition('K')).toEqual(11)
		expect(getAlphabetPosition('L')).toEqual(12)
		expect(getAlphabetPosition('M')).toEqual(13)
		expect(getAlphabetPosition('N')).toEqual(14)
		expect(getAlphabetPosition('O')).toEqual(15)
		expect(getAlphabetPosition('P')).toEqual(16)
		expect(getAlphabetPosition('Q')).toEqual(17)
		expect(getAlphabetPosition('R')).toEqual(18)
		expect(getAlphabetPosition('S')).toEqual(19)
		expect(getAlphabetPosition('T')).toEqual(20)
		expect(getAlphabetPosition('U')).toEqual(21)
		expect(getAlphabetPosition('V')).toEqual(22)
		expect(getAlphabetPosition('W')).toEqual(23)
		expect(getAlphabetPosition('X')).toEqual(24)
		expect(getAlphabetPosition('Y')).toEqual(25)
		expect(getAlphabetPosition('Z')).toEqual(26)
	})
	it('should return -1 if the given character is not in the alphabet', () => {
		expect(getAlphabetPosition(' ')).toEqual(-1)
		expect(getAlphabetPosition('.')).toEqual(-1)
		expect(getAlphabetPosition('1')).toEqual(-1)
		expect(getAlphabetPosition('!')).toEqual(-1)
	})
})
