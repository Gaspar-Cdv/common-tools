import { getType, memoize } from '../src/misc'


describe('getType', () => {
  it('should return the type of the specified value', () => {
    expect(getType(1)).toBe('number')
    expect(getType(Infinity)).toBe('number')
    expect(getType(NaN)).toBe('number')
    expect(getType('a')).toBe('string')
    expect(getType(true)).toBe('boolean')
    expect(getType(null)).toBe('null')
    expect(getType(undefined)).toBe('undefined')
    expect(getType([])).toBe('array')
    expect(getType({})).toBe('object')
    expect(getType(() => { })).toBe('function')
    expect(getType(/a/)).toBe('regexp')
    expect(getType(Symbol(123))).toBe('symbol')
    expect(getType(new Set())).toBe('set')
    expect(getType(new Map())).toBe('map')
    expect(getType(new Date())).toBe('date')
    expect(getType(new Error())).toBe('error')
    expect(getType(new Promise(() => { }))).toBe('promise')
    expect(getType(new WeakMap())).toBe('weakmap')
    expect(getType(new WeakSet())).toBe('weakset')
    expect(getType(new Int8Array())).toBe('int8array')
    expect(getType(new Uint8Array())).toBe('uint8array')
    expect(getType(new Uint8ClampedArray())).toBe('uint8clampedarray')
    expect(getType(new Int16Array())).toBe('int16array')
    expect(getType(new Uint16Array())).toBe('uint16array')
    expect(getType(new Int32Array())).toBe('int32array')
    expect(getType(new Uint32Array())).toBe('uint32array')
    expect(getType(new Float32Array())).toBe('float32array')
    expect(getType(new Float64Array())).toBe('float64array')
    expect(getType(new BigInt64Array())).toBe('bigint64array')
    expect(getType(new BigUint64Array())).toBe('biguint64array')
    expect(getType(new ArrayBuffer(0))).toBe('arraybuffer')
    expect(getType(new SharedArrayBuffer(0))).toBe('sharedarraybuffer')
    expect(getType(new DataView(new ArrayBuffer(0)))).toBe('dataview')
    expect(getType(new URL('http://example.com'))).toBe('url')
  })
})


describe('memoize', () => {
  it('should memoize a function', () => {
    const callback = jest.fn((a, b) => a + b)
    const memoized = memoize(callback)
    memoized(1, 2)
    memoized(1, 2)
    expect(callback).toHaveBeenCalledTimes(1)
    memoized(3, 4)
    memoized(3, 4)
    expect(callback).toHaveBeenCalledTimes(2)
  })
})