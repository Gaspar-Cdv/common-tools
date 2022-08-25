const { union, intersection, without, symDiff } = require('../src/sets')


describe('union', () => {
  it('should return the union of two arrays with no common elements', () => {
    expect(union([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6])
  })
  it('should return the union of two arrays with common elements', () => {
    expect(union([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4])
  })
  it('should return the union of two arrays with same elements', () => {
    expect(union([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3])
  })
  it('should return the union of two sets with no common elements', () => {
    expect(union(new Set([1, 2, 3]), new Set([4, 5, 6]))).toEqual(new Set([1, 2, 3, 4, 5, 6]))
  })
  it('should return the union of two sets with common elements', () => {
    expect(union(new Set([1, 2, 3]), new Set([2, 3, 4]))).toEqual(new Set([1, 2, 3, 4]))
  })
  it('should return the union of two sets with same elements', () => {
    expect(union(new Set([1, 2, 3]), new Set([1, 2, 3]))).toEqual(new Set([1, 2, 3]))
  })
  it('should return a set if one of the arguments is a set', () => {
    expect(union(new Set([1, 2, 3]), [2, 3, 4])).toEqual(new Set([1, 2, 3, 4]))
    expect(union([1, 2, 3], new Set([4, 5, 6]))).toEqual(new Set([1, 2, 3, 4, 5, 6]))
  })
})


describe('intersection', () => {
  it('should return the intersection of two arrays with no common elements', () => {
    expect(intersection([1, 2, 3], [4, 5, 6])).toEqual([])
  })
  it('should return the intersection of two arrays with common elements', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
  })
  it('should return the intersection of two arrays with same elements', () => {
    expect(intersection([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3])
  })
  it('should return the intersection of two sets with no common elements', () => {
    expect(intersection(new Set([1, 2, 3]), new Set([4, 5, 6]))).toEqual(new Set())
  })
  it('should return the intersection of two sets with common elements', () => {
    expect(intersection(new Set([1, 2, 3]), new Set([2, 3, 4]))).toEqual(new Set([2, 3]))
  })
  it('should return the intersection of two sets with same elements', () => {
    expect(intersection(new Set([1, 2, 3]), new Set([1, 2, 3]))).toEqual(new Set([1, 2, 3]))
  })
  it('should return a set if one of the arguments is a set', () => {
    expect(intersection(new Set([1, 2, 3]), [2, 3, 4])).toEqual(new Set([2, 3]))
    expect(intersection([1, 2, 3], new Set([4, 5, 6]))).toEqual(new Set())
  })
})


describe('without', () => {
  it('should return an array without the elements of the second array', () => {
    expect(without([1, 2, 3], 2, 3, 4)).toEqual([1])
    expect(without([1, 2, 3], 4, 5, 6)).toEqual([1, 2, 3])
    expect(without([1, 2, 3], 1, 2, 3)).toEqual([])
  })
  it('should return a set without the elements of the second set', () => {
    expect(without(new Set([1, 2, 3]), 2, 3, 4)).toEqual(new Set([1]))
    expect(without(new Set([1, 2, 3]), 4, 5, 6)).toEqual(new Set([1, 2, 3]))
    expect(without(new Set([1, 2, 3]), 1, 2, 3)).toEqual(new Set())
  })
  it('should return a string without the elements of the second string', () => {
    expect(without('abc', 'b', 'c')).toEqual('a')
    expect(without('abc', 'c', 'd')).toEqual('ab')
    expect(without('abc', 'a', 'b', 'c')).toEqual('')
  })
})


describe('symDiff', () => {
  it('should return the symmetric difference of two arrays with no common elements', () => {
    expect(symDiff([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6])
  })
  it('should return the symmetric difference of two arrays with common elements', () => {
    expect(symDiff([1, 2, 3], [2, 3, 4])).toEqual([1, 4])
  })
  it('should return the symmetric difference of two arrays with same elements', () => {
    expect(symDiff([1, 2, 3], [1, 2, 3])).toEqual([])
  })
  it('should return the symmetric difference of two sets with no common elements', () => {
    expect(symDiff(new Set([1, 2, 3]), new Set([4, 5, 6]))).toEqual(new Set([1, 2, 3, 4, 5, 6]))
  })
  it('should return the symmetric difference of two sets with common elements', () => {
    expect(symDiff(new Set([1, 2, 3]), new Set([2, 3, 4]))).toEqual(new Set([1, 4]))
  })
  it('should return the symmetric difference of two sets with same elements', () => {
    expect(symDiff(new Set([1, 2, 3]), new Set([1, 2, 3]))).toEqual(new Set())
  })
  it('should return a set if one of the arguments is a set', () => {
    expect(symDiff(new Set([1, 2, 3]), [2, 3, 4])).toEqual(new Set([1, 4]))
    expect(symDiff([1, 2, 3], new Set([4, 5, 6]))).toEqual(new Set([1, 2, 3, 4, 5, 6]))
  })
})
