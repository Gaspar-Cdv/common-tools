import { clamp } from './maths'

/**
 * Shades a color by an amount.
 * The amount should be between -255 and 255 (otherwise it is clamped).
 * If the amount is negative, the color will be darkened.
 * If the amount is positive, the color will be lightened.
 * The color must be a valid hex color (e.g. `#000000`).
 * @param hex The color to shade.
 * @param amount The amount to shade the color by.
 * @returns The shaded color (in the form of `rgb(r,g,b)`).
 * @throws Error if the color is not a valid hex color.
 */
export const colorShader = (hex: string, amount: number): string => {
	assertIsValidHex(hex)
	return `rgb(${hexToRgb(hex).map(c => clamp(c + amount, 0, 255)).join(',')})`
}

/**
 * Change opacity of an hexadecimal color by an amount.
 * The amount should be between 0 and 1 (otherwise it is clamped).
 * If the amount is 0, the color will be fully transparent.
 * If the amount is 1, the color will be fully opaque.
 * The color must be a valid hex color (e.g. `#000000`).
 * @param hex The color to fade.
 * @param opacity The opacity to fade the color to.
 * @returns The faded color (in the form of `rgba(r,g,b,a)`).
 * @throws Error if the color is not a valid hex color.
 */
export const fade = (hex: string, opacity: number): string => {
	assertIsValidHex(hex)
	return `rgba(${hexToRgb(hex).join(',')},${clamp(opacity, 0, 1)})`
}

/**
 * Convert an hexadecimal color to an array of RGB values.
 * The color must be a valid hex color (e.g. `#000000`).
 * @param hex The color to convert.
 * @returns The array of RGB values (in the form of `[r,g,b]`).
 * @throws Error if the color is not a valid hex color.
 */
export const hexToRgb = (hex: string): number[] => {
	assertIsValidHex(hex)
	return hex.slice(1).match(/../g)!.map(color => parseInt(color, 16))
}

/**
 * Check if a string is a valid hex color.
 * A valid hex color is a string that starts with `#` and contains 6 characters, from 0 to F.
 * @param hex The string to check.
 * @returns `true` if the string is a valid hex color, `false` otherwise.
 */
export const isValidHex = (hex: string): boolean => {
	return /^#[0-9A-F]{6}$/i.test(hex)
}

/**
 * Assert that a string is a valid hex color, throwing an error otherwise.
 * @param hex The string to check.
 * @throws Error if the string is not a valid hex color.
 */
export const assertIsValidHex = (hex: string): void => {
	if (!isValidHex(hex)) {
		throw new Error('Invalid hex color')
	}
}