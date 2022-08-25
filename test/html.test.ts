const { getPages, debounce, throttle } = require('../generated/src/html')


describe('getPages', () => {
  it('should return a list of pages with ellipsis on both sides', () => {
    expect(getPages(5, 10, 0)).toEqual([1, '...', 5, '...', 10])
    expect(getPages(5, 10, 1)).toEqual([1, '...', 4, 5, 6, '...', 10])
    expect(getPages(5, 10, 2)).toEqual([1, '...', 3, 4, 5, 6, 7, '...', 10])
  })
  it('should return a list of pages with ellipsis on the right only', () => {
    expect(getPages(2, 10, 0)).toEqual([1, 2, '...', 10])
    expect(getPages(2, 10, 1)).toEqual([1, 2, 3, '...', 10])
    expect(getPages(2, 10, 2)).toEqual([1, 2, 3, 4, '...', 10])
  })
  it('should return a list of pages with ellipsis on the left only', () => {
    expect(getPages(9, 10, 0)).toEqual([1, '...', 9, 10])
    expect(getPages(9, 10, 1)).toEqual([1, '...', 8, 9, 10])
    expect(getPages(9, 10, 2)).toEqual([1, '...', 7, 8, 9, 10])
  })
  it('should return a list of pages without ellipsis', () => {
    expect(getPages(5, 10, 4)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(getPages(5, 10, 5)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(getPages(5, 10, 6)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
  it('should return one page if the page count is 1', () => {
    expect(getPages(1, 1, 0)).toEqual([1])
    expect(getPages(1, 1, 1)).toEqual([1])
    expect(getPages(1, 1, 2)).toEqual([1])
  })
  it('should throw an error if one of the parameter is not a positive integer', () => {
    expect(() => getPages(1, 1, -1)).toThrow(TypeError)
    expect(() => getPages(1, 1, 1.5)).toThrow(TypeError)
    expect(() => getPages(1, -1, 1)).toThrow(TypeError)
    expect(() => getPages(1, 1.5, 1)).toThrow(TypeError)
    expect(() => getPages(-1, 1, 1)).toThrow(TypeError)
    expect(() => getPages(1.5, 1, 1)).toThrow(TypeError)
  })
})


describe('debounce', () => {
  jest.useFakeTimers()
  const DELAY = 1000

  it('should call the callback once after the debounced function being called many times', async () => {
    const callback = jest.fn()
    const debounced = debounce(callback, DELAY * 2)

    for (let i = 0; i < 100; i++) {
      debounced()
      jest.advanceTimersByTime(DELAY)
      expect(callback).not.toHaveBeenCalled()
    }
    jest.advanceTimersByTime(DELAY)
    expect(callback).toHaveBeenCalledTimes(1)
  })
  it('should call the callback once at the first time the debounced function being called', async () => {
    const callback = jest.fn()
    const debounced = debounce(callback, DELAY * 2, true)

    debounced()
    expect(callback).toHaveBeenCalled()
    for (let i = 0; i < 100; i++) {
      debounced()
      jest.advanceTimersByTime(DELAY)
      expect(callback).toHaveBeenCalledTimes(1)
    }
    jest.advanceTimersByTime(DELAY)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})


describe('throttle', () => {
  jest.useFakeTimers()
  const DELAY = 1000

  it('should call the callback every specified time', async () => {
    const callback = jest.fn()
    const throttled = throttle(callback, DELAY)

    for (let i = 0; i < 100; i++) {
      throttled()
      jest.advanceTimersByTime(DELAY / 10)
    }
    expect(callback).toHaveBeenCalledTimes(10)
    jest.advanceTimersByTime(DELAY)
    expect(callback).toHaveBeenCalledTimes(11) // the last call with timeout
  })
})
