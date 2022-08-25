/**
 * Join two arrays or two sets together (A ∪ B).
 * @returns an array or a set with both arguments joined.
 */
export function union<T extends U[] | Set<U>, U> (a: T, b: T): T {
  const result = new Set([...a, ...b])
  if (Array.isArray(a) && Array.isArray(b)) {
    return [...result] as T
  }
  return result as T
}


/**
 * Get the intersection of two arrays or two sets (A ∩ B).
 * @returns an array or a set with elements in common.
 */
export function intersection<T extends U[] | Set<U>, U> (a: T, b: T): T {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.filter(item => b.includes(item)) as T
  }
  const c = new Set(a)
  return new Set([...b].filter(x => c.has(x))) as T
}


/**
 * Delete all specified values from an element (array, string or set). Non destructive.
 * @returns the element without the values.
 */
export function without<T extends string | U[] | Set<U>, U> (element: T, ...values: any[]): T {
  const arrayWithoutValues = withoutInternal([...element], ...values)
  if (Array.isArray(element)) {
    return arrayWithoutValues as T
  } else if (typeof element === 'string') {
    return arrayWithoutValues.join('') as T
  } else {
    return new Set(arrayWithoutValues) as T
  }
}

function withoutInternal (element: any[], ...values: any[]): any[] {
  return element.filter(item => !values.includes(item))
}


/**
 * Get the symmetric difference between two elements (array or set). It's like XOR.
 * @returns an array or a set with symmetric difference
 */
export function symDiff<T extends U[] | Set<U>, U> (a: T, b: T): T {
  const firstArray = [...a]
  const secondArray = [...b]
  const result = []

  for (let i = 0, l = firstArray.length; i < l; i++) {
    if (!secondArray.includes(firstArray[i])) {
      result.push(firstArray[i])
    }
  }
  for (let i = 0, l = secondArray.length; i < l; i++) {
    if (!firstArray.includes(secondArray[i])) {
      result.push(secondArray[i])
    }
  }

  return (Array.isArray(a) && Array.isArray(b) ? result : new Set(result)) as T
}
