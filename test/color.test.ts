import { colorShader, fade, hexToRgb, assertIsValidHex } from '../src/color'

const invalidHexs = [
	'#',
	'#0',
	'#00',
	'#000',
	'#0000',
	'#00000',
	'#0000000',
	'#00000000',
	'000000',
	'#z1e6t9'
]

describe('colorShader', () => {
	it('should shade a color by an amount', () => {
		expect(colorShader('#000000', -127)).toBe('rgb(0,0,0)')
		expect(colorShader('#000000', 0)).toBe('rgb(0,0,0)')
		expect(colorShader('#000000', 127)).toBe('rgb(127,127,127)')
		expect(colorShader('#000000', 255)).toBe('rgb(255,255,255)')
		expect(colorShader('#000000', 511)).toBe('rgb(255,255,255)')

		expect(colorShader('#ffffff', 127)).toBe('rgb(255,255,255)')
		expect(colorShader('#ffffff', 0)).toBe('rgb(255,255,255)')
		expect(colorShader('#ffffff', -127)).toBe('rgb(128,128,128)')
		expect(colorShader('#ffffff', -255)).toBe('rgb(0,0,0)')
		expect(colorShader('#ffffff', -511)).toBe('rgb(0,0,0)')

		invalidHexs.forEach(hex => {
			expect(() => colorShader(hex, 0)).toThrow('Invalid hex color')
		})
	})
})

describe('fade', () => {
	it('should fade a color by an amount', () => {
		expect(fade('#000000', -1)).toBe('rgba(0,0,0,0)')
		expect(fade('#000000', 0)).toBe('rgba(0,0,0,0)')
		expect(fade('#000000', 0.5)).toBe('rgba(0,0,0,0.5)')
		expect(fade('#000000', 1)).toBe('rgba(0,0,0,1)')
		expect(fade('#000000', 2)).toBe('rgba(0,0,0,1)')

		expect(fade('#ffffff', -1)).toBe('rgba(255,255,255,0)')
		expect(fade('#ffffff', 0)).toBe('rgba(255,255,255,0)')
		expect(fade('#ffffff', 0.5)).toBe('rgba(255,255,255,0.5)')
		expect(fade('#ffffff', 1)).toBe('rgba(255,255,255,1)')
		expect(fade('#ffffff', 2)).toBe('rgba(255,255,255,1)')

		invalidHexs.forEach(hex => {
			expect(() => fade(hex, 0)).toThrow('Invalid hex color')
		})
	})
})

describe('hexToRgb', () => {
	it('should convert a hex color to rgb array', () => {
		expect(hexToRgb('#000000')).toEqual([0, 0, 0])
		expect(hexToRgb('#ff0000')).toEqual([255, 0, 0])
		expect(hexToRgb('#00ff00')).toEqual([0, 255, 0])
		expect(hexToRgb('#0000ff')).toEqual([0, 0, 255])
		expect(hexToRgb('#ffff00')).toEqual([255, 255, 0])
		expect(hexToRgb('#ff00ff')).toEqual([255, 0, 255])
		expect(hexToRgb('#ffffff')).toEqual([255, 255, 255])

		invalidHexs.forEach(hex => {
			expect(() => hexToRgb(hex)).toThrow('Invalid hex color')
		})
	})
})

describe('assertIsValidHex', () => {
	it('should assert if a string is a valid hex color', () => {
		expect(() => assertIsValidHex('#000000')).not.toThrow()
		expect(() => assertIsValidHex('#ff0000')).not.toThrow()
		expect(() => assertIsValidHex('#00ff00')).not.toThrow()
		expect(() => assertIsValidHex('#0000ff')).not.toThrow()
		expect(() => assertIsValidHex('#ffff00')).not.toThrow()
		expect(() => assertIsValidHex('#ff00ff')).not.toThrow()
		expect(() => assertIsValidHex('#ffffff')).not.toThrow()

		invalidHexs.forEach(hex => {
			expect(() => assertIsValidHex(hex)).toThrow('Invalid hex color')
		})
	})
})
