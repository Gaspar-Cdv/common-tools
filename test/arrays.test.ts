const {
  chunk,
  clone,
  count,
  countItems,
  createMulti,
  divide,
  groupBy,
  inArray,
  partition,
  rotate,
  sort,
  turnLeft,
  turnRight,
  unique,
  zip
} = require('../generated/src/arrays')


describe('sort', () => {
  const SHUFFLED_NUMBER_ARRAY = [5, 10, -2, 7, -12, 0]
  const SORTED_NUMBER_ARRAY = [-12, -2, 0, 5, 7, 10]
  const SHUFFLED_STRING_ARRAY = ['J', 'k', 'c', 'T', '!', 'z', '6', 'W']
  const SORTED_STRING_ARRAY = ['!', '6', 'c', 'J', 'k', 'T', 'W', 'z']
  const SHUFFLED_MIX_ARRAY = [5, 'J', 10, 'k', -2, 'c', 7, 'T', -12, '!', 'z', 0, 'W']
  const SORTED_MIX_ARRAY = [-12, -2, 0, 5, 7, 10, '!', 'c', 'J', 'k', 'T', 'W', 'z']

  it('should sort an array of numbers', () => {
    expect(sort(SHUFFLED_NUMBER_ARRAY)).toEqual(SORTED_NUMBER_ARRAY)
  })
  it('should sort in reverse an array of numbers', () => {
    expect(sort(SHUFFLED_NUMBER_ARRAY, true)).toEqual(SORTED_NUMBER_ARRAY.reverse())
  })
  it('should sort an array of strings', () => {
    expect(sort(SHUFFLED_STRING_ARRAY)).toEqual(SORTED_STRING_ARRAY)
  })
  it('should sort in reverse an array of strings', () => {
    expect(sort(SHUFFLED_STRING_ARRAY, true)).toEqual(SORTED_STRING_ARRAY.reverse())
  })
  it('should sort an array of mixed values', () => {
    expect(sort(SHUFFLED_MIX_ARRAY)).toEqual(SORTED_MIX_ARRAY)
  })
  it('should sort in reverse an array of mixed values', () => {
    expect(sort(SHUFFLED_MIX_ARRAY, true)).toEqual(SORTED_MIX_ARRAY.reverse())
  })
  it('should return an empty array if the array is empty', () => {
    expect(sort([])).toEqual([])
  })
})


describe('inArray', () => {
  const NESTED_ARRAY = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

  it('should return true if the value is in the array', () => {
    expect(inArray(1, NESTED_ARRAY)).toBeTruthy()
  })
  it('should return false if the value is not in the array', () => {
    expect(inArray(10, NESTED_ARRAY)).toBeFalsy()
  })
  it('should return true is the value is an array', () => {
    expect(inArray([1, 2, 3], NESTED_ARRAY)).toBeTruthy()
  })
})


describe('unique', () => {
  const ARRAY_WITHOUT_DUPLICATES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const ARRAY_WITH_DUPLICATES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  it('should return an array without duplicates', () => {
    expect(unique(ARRAY_WITH_DUPLICATES)).toEqual(ARRAY_WITHOUT_DUPLICATES)
  })
  it('should return the same array if the array has no duplicates', () => {
    expect(unique(ARRAY_WITHOUT_DUPLICATES)).toEqual(ARRAY_WITHOUT_DUPLICATES)
  })
  it('should return an empty array if the array is empty', () => {
    expect(unique([])).toEqual([])
  })
})


describe('count', () => {
  const ARRAY = [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1]
  const STRING = '01110100001'

  it('should return the number of occurrences of a value in an array', () => {
    expect(count(1, ARRAY)).toBe(5)
  })
  it('should return 0 if the value is not in the array', () => {
    expect(count(2, ARRAY)).toBe(0)
  })
  it('should return the number of occurrences of a value in a string', () => {
    expect(count('1', STRING)).toBe(5)
  })
  it('should return 0 if the value is not in the string', () => {
    expect(count('2', STRING)).toBe(0)
  })
})


describe('countItems', () => {
  const ARRAY = [1, 1, 2, 3, 3, 3, 1, 2, 2, 4, 3, 2, 4]
  const STRING = '1123331224324'
  const EXPECTED = { 1: 3, 2: 4, 3: 4, 4: 2 }

  it('should return the number of occurrences of each value in an array', () => {
    expect(countItems(ARRAY)).toEqual(EXPECTED)
  })
  it('should return the number of occurrences of each value in a string', () => {
    expect(countItems(STRING)).toEqual(EXPECTED)
  })
  it('should return an empty object if the array is empty', () => {
    expect(countItems([])).toEqual({})
  })
  it('should return an empty object if the string is empty', () => {
    expect(countItems('')).toEqual({})
  })
})


describe('zip', () => {
  const SAME_SIZE_ARRAYS_1 = [['a', 'b', 'c'], [1, 2, 3]]
  const SAME_SIZE_ARRAYS_2 = [['a', 1], ['b', 2], ['c', 3]]
  const DIFFERENT_SIZE_ARRAYS_1 = [['a', 'b', 'c'], [1, 2]]
  const DIFFERENT_SIZE_ARRAYS_2 = [['a', 1], ['b', 2], ['c', undefined]]
  const DIFFERENT_SIZE_ARRAYS_3 = [['a', 1], ['b', 2], ['c', 3, 'extra']]
  const DIFFERENT_SIZE_ARRAYS_4 = [['a', 'b', 'c'], [1, 2, 3], [undefined, undefined, 'extra']]

  it('should zip arrays of same size', () => {
    expect(zip(...SAME_SIZE_ARRAYS_1)).toEqual(SAME_SIZE_ARRAYS_2)
    expect(zip(...SAME_SIZE_ARRAYS_2)).toEqual(SAME_SIZE_ARRAYS_1)
  })
  it('should zip arrays of different size', () => {
    expect(zip(...DIFFERENT_SIZE_ARRAYS_1)).toEqual(DIFFERENT_SIZE_ARRAYS_2)
    expect(zip(...DIFFERENT_SIZE_ARRAYS_3)).toEqual(DIFFERENT_SIZE_ARRAYS_4)
  })
  it('should zip a single array', () => {
    expect(zip([1, 2, 3])).toEqual([[1], [2], [3]])
  })
  it('should zip empty arrays', () => {
    expect(zip([], [1, 2, 3])).toEqual([[undefined, 1], [undefined, 2], [undefined, 3]])
    expect(zip([], [], [])).toEqual([])
    expect(zip([])).toEqual([])
  })
})


describe('clone', () => {
  const ARRAY = [1, 2, 3]
  const OBJECT = { a: 1, b: 2, c: 3 }
  const SET = new Set([1, 2, 3])
  const MAP = new Map([['a', 1], ['b', 2], ['c', 3]])
  const SYMBOL = Symbol(123)

  it('should return a clone of an array', () => {
    const cloned = clone(ARRAY)
    expect(cloned).toEqual(ARRAY)
    expect(cloned).not.toBe(ARRAY)
  })
  it('should return a clone of an object', () => {
    const cloned = clone(OBJECT)
    expect(cloned).toEqual(OBJECT)
    expect(cloned).not.toBe(OBJECT)
  })
  it('should return a clone of a set', () => {
    const cloned = clone(SET)
    expect(cloned).toEqual(SET)
    expect(cloned).not.toBe(SET)
  })
  it('should return a clone of a map', () => {
    const cloned = clone(MAP)
    expect(cloned).toEqual(MAP)
    expect(cloned).not.toBe(MAP)
  })
  it('should return a clone of a symbol', () => {
    const cloned = clone(SYMBOL)
    expect(cloned.description).toBe(SYMBOL.description) // expect(cloned).toEqual(SYMBOL) is broken
    expect(cloned).not.toBe(SYMBOL)
  })
  it('should return the same values for all other types', () => {
    expect(clone('abc')).toBe('abc')
    expect(clone(123)).toBe(123)
    expect(clone(true)).toBeTruthy
    expect(clone(false)).toBeFalsy
    expect(clone(undefined)).toBeUndefined
    expect(clone(null)).toBeNull
  })
})


describe('rotate', () => {
  const ARRAY = [1, 2, 3]
  const STRING = '123'

  it('should rotate array to the right', () => {
    expect(rotate(ARRAY, 1)).toEqual([3, 1, 2])
  })
  it('should rotate array to the left', () => {
    expect(rotate(ARRAY, -1)).toEqual([2, 3, 1])
  })
  it('should rotate array many times if the number is greater than the array size', () => {
    expect(rotate(ARRAY, 10)).toEqual([3, 1, 2])
    expect(rotate(ARRAY, -10)).toEqual([2, 3, 1])
  })
  it('should not rotate array if the number of rotations is 0', () => {
    expect(rotate(ARRAY, 0)).toEqual(ARRAY)
  })
  it('should rotate string to the right', () => {
    expect(rotate(STRING, 1)).toEqual('312')
  })
  it('should rotate string to the left', () => {
    expect(rotate(STRING, -1)).toEqual('231')
  })
  it('should rotate string many times if the number is greater than the string size', () => {
    expect(rotate(STRING, 10)).toEqual('312')
    expect(rotate(STRING, -10)).toEqual('231')
  })
  it('should not rotate string if the number of rotations is 0', () => {
    expect(rotate(STRING, 0)).toEqual(STRING)
  })
})


describe('groupBy', () => {
  it('should group every consecutive value in an array', () => {
    expect(groupBy([1, 1, 1, 2, 2, 2, 2, 3, 4, 4, 4, 2, 2, 2])).toEqual([[1, 1, 1], [2, 2, 2, 2], [3], [4, 4, 4], [2, 2, 2]])
    expect(groupBy([1, 2, 3, 4, 1])).toEqual([[1], [2], [3], [4], [1]])
  })
  it('should return an empty array if the array is empty', () => {
    expect(groupBy([])).toEqual([])
  })
  it('should group every consecutive value in a string', () => {
    expect(groupBy('aaabbcbbbb')).toEqual(['aaa', 'bb', 'c', 'bbbb'])
    expect(groupBy('abcb')).toEqual(['a', 'b', 'c', 'b'])
  })
  it('should return an empty array if the string is empty', () => {
    expect(groupBy('')).toEqual([])
  })
})


describe('chunk', () => {
  const ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const STRING = '123456789'

  it('should split an array into chunks of equal size', () => {
    expect(chunk(ARRAY, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
  })
  it('should split an array into chunks of different size', () => {
    expect(chunk(ARRAY, 2)).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
  })
  it('should return the same array if the chunk size is greater than the array size', () => {
    expect(chunk(ARRAY, 10)).toEqual([ARRAY])
  })
  it('should return an empty array if the array is empty', () => {
    expect(chunk([], 3)).toEqual([])
  })
  it('should split a string into chunks of equal size', () => {
    expect(chunk(STRING, 3)).toEqual(['123', '456', '789'])
  })
  it('should split a string into chunks of different size', () => {
    expect(chunk(STRING, 2)).toEqual(['12', '34', '56', '78', '9'])
  })
  it('should return the same string if the chunk size is greater than the string size', () => {
    expect(chunk(STRING, 10)).toEqual([STRING])
  })
  it('should return an empty array if the string is empty', () => {
    expect(chunk('', 3)).toEqual([])
  })

  it('should throw an error if n is negative or not an integer', () => {
    expect(() => chunk(ARRAY, -1)).toThrow(TypeError)
    expect(() => chunk(ARRAY, 1.5)).toThrow(TypeError)
  })
})


describe('divide', () => {
  const ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const STRING = '123456789'

  it('should divide an array into chunks of equal size', () => {
    expect(divide(ARRAY, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
  })
  it('should divide an array into chunks of different size', () => {
    expect(divide(ARRAY, 2)).toEqual([[1, 2, 3, 4, 5], [6, 7, 8, 9]])
    expect(divide(ARRAY, 2, false)).toEqual([[1, 2, 3, 4], [5, 6, 7, 8, 9]])
  })
  it('should return arrays containing a single element if the chunk size is greater than the array size', () => {
    expect(divide([1, 2, 3], 4)).toEqual([[1], [2], [3]])
  })
  it('should return an empty array if the array is empty', () => {
    expect(divide([], 3)).toEqual([])
  })
  it('should divide a string into chunks of equal size', () => {
    expect(divide(STRING, 3)).toEqual(['123', '456', '789'])
  })
  it('should divide a string into chunks of different size', () => {
    expect(divide(STRING, 2)).toEqual(['12345', '6789'])
    expect(divide(STRING, 2, false)).toEqual(['1234', '56789'])
  })
  it('should return arrays containing a single element if the chunk size is greater than the string size', () => {
    expect(divide('123', 4)).toEqual(['1', '2', '3'])
  })
  it('should return an empty array if the string is empty', () => {
    expect(divide('', 3)).toEqual([])
  })
  it('should throw an error if n is negative or not an integer', () => {
    expect(() => divide(ARRAY, -1)).toThrow(TypeError)
    expect(() => divide(ARRAY, 1.5)).toThrow(TypeError)
  })
})

describe('partition', () => {
  const CONDITION = (x: number) => x % 2 === 0
  const TRUE_VALUES = [2, 4, 6, 8]
  const FALSE_VALUES = [1, 3, 5, 7, 9]
  const MIXED_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  it('should return an array of true values and an array of false values', () => {
    expect(partition(MIXED_VALUES, CONDITION)).toEqual([TRUE_VALUES, FALSE_VALUES])
  })
  it('should return only true values or only false values', () => {
    expect(partition(TRUE_VALUES, CONDITION)).toEqual([TRUE_VALUES, []])
    expect(partition(FALSE_VALUES, CONDITION)).toEqual([[], FALSE_VALUES])
  })
  it('should return an empty array if the array is empty', () => {
    expect(partition([], CONDITION)).toEqual([[], []])
  })
})

describe('createMulti', () => {
  const MULTIDIMENSIONAL_ARRAY_DEFAULT = [[undefined, undefined, undefined], [undefined, undefined, undefined]]
  const MULTIDIMENSIONAL_ARRAY_CUSTOM = [[0, 0], [0, 0], [0, 0], [0, 0]]

  it('should create a multi-dimensional array with default values', () => {
    expect(createMulti(2, 3)).toEqual(MULTIDIMENSIONAL_ARRAY_DEFAULT)
  })
  it('should create a multi-dimensional array with specified value', () => {
    expect(createMulti(4, 2, 0)).toEqual(MULTIDIMENSIONAL_ARRAY_CUSTOM)
  })
  it('should throw an error if height or weight are negatives or not an integers', () => {
    expect(() => createMulti(-1, 1)).toThrow(TypeError)
    expect(() => createMulti(1, -1)).toThrow(TypeError)
    expect(() => createMulti(1, 1.5)).toThrow(TypeError)
    expect(() => createMulti(1.5, 1)).toThrow(TypeError)
  })
})

describe('turnRight and turnLeft', () => {
  const SQUARE = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
  const SQUARE_TURNED = [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
  ]
  const RECTANGLE = [
    [1, 2, 3, 4],
    [5, 6, 7, 8]
  ]
  const RECTANGLE_TURNED = [
    [5, 1],
    [6, 2],
    [7, 3],
    [8, 4]
  ]

  it('should turn a square matrix 90 degrees to the right', () => {
    expect(turnRight(SQUARE)).toEqual(SQUARE_TURNED)
  })
  it('should turn a square matrix 90 degrees to the left', () => {
    expect(turnLeft(SQUARE_TURNED)).toEqual(SQUARE)
  })
  it('should turn a rectangle matrix 90 degrees to the right', () => {
    expect(turnRight(RECTANGLE)).toEqual(RECTANGLE_TURNED)
  })
  it('should turn a rectangle matrix 90 degrees to the left', () => {
    expect(turnLeft(RECTANGLE_TURNED)).toEqual(RECTANGLE)
  })
  it('should return the same matrix if height and width are 1', () => {
    expect(turnRight([[1]])).toEqual([[1]])
    expect(turnLeft([[1]])).toEqual([[1]])
  })
})
