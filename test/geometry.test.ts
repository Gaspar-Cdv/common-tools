const { distance, middle, slope, yIntercept } = require('../src/geometry')


describe('distance', () => {
  it('should calculate the euclidean distance between two points', () => {
    expect(distance(1, 1, 0, 0)).toBe(Math.sqrt(2))
    expect(distance(1, 1, 0, 1)).toBe(1)
    expect(distance(1, 1, 0, 2)).toBe(Math.sqrt(2))
    expect(distance(1, 1, 1, 0)).toBe(1)
    expect(distance(1, 1, 1, 1)).toBe(0)
    expect(distance(1, 1, 1, 2)).toBe(1)
    expect(distance(1, 1, 2, 0)).toBe(Math.sqrt(2))
    expect(distance(1, 1, 2, 1)).toBe(1)
    expect(distance(1, 1, 2, 2)).toBe(Math.sqrt(2))
  })
  it('should calculate the manhattan distance between two points', () => {
    expect(distance(1, 1, 0, 0, true)).toBe(2)
    expect(distance(1, 1, 0, 1, true)).toBe(1)
    expect(distance(1, 1, 0, 2, true)).toBe(2)
    expect(distance(1, 1, 1, 0, true)).toBe(1)
    expect(distance(1, 1, 1, 1, true)).toBe(0)
    expect(distance(1, 1, 1, 2, true)).toBe(1)
    expect(distance(1, 1, 2, 0, true)).toBe(2)
    expect(distance(1, 1, 2, 1, true)).toBe(1)
    expect(distance(1, 1, 2, 2, true)).toBe(2)
  })
})


describe('middle', () => {
  it('should calculate the middle point between two points', () => {
    expect(middle(1, 1, 0, 0)).toEqual([0.5, 0.5])
    expect(middle(1, 1, 0, 1)).toEqual([0.5, 1])
    expect(middle(1, 1, 0, 2)).toEqual([0.5, 1.5])
    expect(middle(1, 1, 1, 0)).toEqual([1, 0.5])
    expect(middle(1, 1, 1, 1)).toEqual([1, 1])
    expect(middle(1, 1, 1, 2)).toEqual([1, 1.5])
    expect(middle(1, 1, 2, 0)).toEqual([1.5, 0.5])
    expect(middle(1, 1, 2, 1)).toEqual([1.5, 1])
    expect(middle(1, 1, 2, 2)).toEqual([1.5, 1.5])
  })
})


describe('slope', () => {
  it('should calculate the slope between two points', () => {
    expect(slope(1, 1, 0, 0)).toBe(1)
    expect(slope(1, 1, 0, 1)).toBe(0)
    expect(slope(1, 1, 0, 2)).toBe(-1)
    expect(slope(1, 1, 2, 0)).toBe(-1)
    expect(slope(1, 1, 2, 1)).toBe(0)
    expect(slope(1, 1, 2, 2)).toBe(1)
  })
  it('should return Infinity for vertical lines and lines of length 0', () => {
    expect(slope(1, 1, 1, 0)).toBe(Infinity)
    expect(slope(1, 1, 1, 1)).toBe(Infinity)
    expect(slope(1, 1, 1, 2)).toBe(Infinity)
  })
})


describe('yIntercept', () => {
  it('should calculate the y-intercept of a line', () => {
    expect(yIntercept(1, 1, 0, 0)).toBe(0)
    expect(yIntercept(1, 1, 0, 1)).toBe(1)
    expect(yIntercept(1, 1, 0, 2)).toBe(2)
    expect(yIntercept(1, 1, 2, 0)).toBe(2)
    expect(yIntercept(1, 1, 2, 1)).toBe(1)
    expect(yIntercept(1, 1, 2, 2)).toBe(0)
  })
  it('should return Infinity for vertical lines and lines of length 0', () => {
    expect(yIntercept(1, 1, 1, 0)).toBe(Infinity)
    expect(yIntercept(1, 1, 1, 1)).toBe(Infinity)
    expect(yIntercept(1, 1, 1, 2)).toBe(Infinity)
  })
})
