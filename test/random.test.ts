const { randomInt, chance, choice, sample, shuffled, shuffle } = require('../src/random')


describe('randomInt', () => {
  it('should return a random integer between min and max', () => {
    const MIN = -100
    const MAX = 100
    for (let i = 0; i < 1000; i++) {
      const random = randomInt(MIN, MAX)
      expect(Number.isInteger(random)).toBeTruthy()
      expect(random).toBeGreaterThanOrEqual(MIN)
      expect(random).toBeLessThan(MAX)
    }
  })
})


describe('chance', () => {
  it('should return approximately as many true as false', () => {
    let trueCount = 0
    let falseCount = 0
    for (let i = 0; i < 1000; i++) {
      chance() ? trueCount++ : falseCount++
    }
    expect(trueCount).toBeCloseTo(falseCount, -2)
  })
  it('should always return true if chance is 100', () => {
    for (let i = 0; i < 1000; i++) {
      expect(chance(100)).toBeTruthy()
    }
  })
  it('should always return false if chance is 0', () => {
    for (let i = 0; i < 1000; i++) {
      expect(chance(0)).toBeFalsy()
    }
  })
})


describe('choice', () => {
  it('should return a random element from the array, and each element should be picked at least once', () => {
    const array = [0, 1, 2, 3, 4, 5]
    const pickedAtLeastOnce = array.map(() => false)
    for (let i = 0; i < 1000; i++) {
      const picked = choice(array)
      expect(array).toContain(picked)
      pickedAtLeastOnce[picked!] = true
    }
    expect(pickedAtLeastOnce.every(picked => picked)).toBeTruthy()
  })
  it('should remove the element from the array', () => {
    const array = [0, 1, 2, 3, 4, 5]
    for (let i = 0; i < 6; i++) {
      const picked = choice(array, true)
      expect(array).not.toContain(picked)
      expect(array.length).toBe(5 - i)
    }
  })
  it('should return undefined if the array is empty', () => {
    expect(choice([])).toBeUndefined()
  })
})


describe('sample', () => {
  it('should return a random sample without replacement of the array', () => {
    const array = [0, 1, 2, 3, 4, 5]
    const sampleSize = 3
    for (let i = 0; i < 1000; i++) {
      const sampleArray = sample(array, sampleSize)
      expect(sampleArray.length).toBe(sampleSize)
      expect(sampleArray.every((element: number) => array.includes(element))).toBeTruthy()
      expect(sampleArray.every((element: number) => sampleArray.indexOf(element) === sampleArray.lastIndexOf(element))).toBeTruthy() // because without replacement
    }
  })
  it('should return a random sample with replacement of the array', () => {
    const array = [0, 1, 2, 3, 4, 5]
    const sampleSize = 3
    let hasSameValue = false // the sample contains at least twice a same value
    for (let i = 0; i < 1000; i++) {
      const sampleArray = sample(array, sampleSize, true)
      expect(sampleArray.length).toBe(sampleSize)
      expect(sampleArray.every((element: number) => array.includes(element))).toBeTruthy()
      if (sampleArray.some((element: number) => sampleArray.indexOf(element) !== sampleArray.lastIndexOf(element))) {
        hasSameValue = true
      }
    }
    expect(hasSameValue).toBeTruthy()
  })
  it('returns an empty array if the array is empty', () => {
    const array: number[] = []
    const sampleSize = 3
    const sampleArray = sample(array, sampleSize)
    console.log(sampleArray)
    expect(sampleArray.length).toBe(0)
  })
  it('returns the full array (maybe shuffled) if the sample size is greater than the array length', () => {
    const array = [0, 1, 2, 3, 4, 5]
    const sampleSize = array.length + 1
    const sampleArray = sample(array, sampleSize)
    expect(sampleArray.length).toBe(array.length)
    expect(sampleArray.every((element: number) => array.includes(element))).toBeTruthy()
  })
  it('should throw an error if the sample size is negative or not an integer', () => {
    const array = [0, 1, 2, 3, 4, 5]
    expect(() => sample(array, -1)).toThrow(TypeError)
    expect(() => sample(array, 1.5)).toThrow(TypeError)
  })
})


describe('shuffled', () => {
  it('should return a shuffled array', () => {
    const array = [0, 1, 2, 3, 4, 5]
    const shuffledArray = shuffled(array)
    expect(shuffledArray.length).toBe(array.length)
    expect(shuffledArray.every((element: number) => array.includes(element))).toBeTruthy()
    expect(shuffledArray).not.toEqual(array)
  })
  it('should return the same array if the array is empty', () => {
    const array: number[] = []
    const shuffledArray = shuffled(array)
    expect(shuffledArray).toEqual(array)
    expect(shuffledArray).not.toBe(array)
  })
  it('should return the same array if the array has one element', () => {
    const array = [0]
    const shuffledArray = shuffled(array)
    expect(shuffledArray).toEqual(array)
    expect(shuffledArray).not.toBe(array)
  })
	it('should return a shuffled string', () => {
		const string = 'abcdef'
		const shuffledString = shuffled(string)
		expect(shuffledString.length).toBe(string.length)
    expect([...shuffledString].every((element: string) => string.includes(element))).toBeTruthy()
    expect(shuffledString).not.toEqual(string)
	})
	it('should return the same string if the string is empty', () => {
		const string = ''
		const shuffledString = shuffled(string)
		expect(shuffledString).toEqual(string)
	})
	it('should return the same string if the string has one character', () => {
		const string = ''
		const shuffledString = shuffled(string)
    expect(shuffledString).toEqual(string)
	})
})


describe('shuffle', () => {
  it('should shuffle an array', () => {
    const array = [0, 1, 2, 3, 4, 5]
    const shuffledArray = shuffle(array)
    expect(shuffledArray).toBe(array)
    expect(shuffledArray).not.toEqual([0, 1, 2, 3, 4, 5])
    expect(shuffledArray.every((element: number) => array.includes(element))).toBeTruthy()
  })
  it('should return the same array if the array is empty', () => {
    const array: number[] = []
    const shuffledArray = shuffle(array)
    expect(shuffledArray).toBe(array)
    expect(shuffledArray).toEqual([])
  })
  it('should return the same array if the array has one element', () => {
    const array = [0]
    const shuffledArray = shuffle(array)
    expect(shuffledArray).toBe(array)
    expect(shuffledArray).toEqual([0])
  })
})
