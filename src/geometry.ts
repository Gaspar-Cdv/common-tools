/**
 * Calculate the distance between two points.
 * If manhattan is true, the distance is calculated as the sum of the absolute differences of the x and y coordinates.
 * Otherwise, euclidean distance is used.
 */
function distance (x1: number, y1: number, x2: number, y2: number, manhattan = false): number {
  if (manhattan) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
  }
  else {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }
}


/**
 * Calculate the coordinates of the middle of two points.
 */
function middle (x1: number, y1: number, x2: number, y2: number): [number, number] {
  return [(x1 + x2) / 2, (y1 + y2) / 2]
}


/**
 * Calculate the slope of the line going through two points.
 */
function slope (x1: number, y1: number, x2: number, y2: number): number {
  return (y2 - y1) / (x2 - x1)
}


/**
 * Calculate the y-intercept of the line going through two points.
 */
function yIntercept (x1: number, y1: number, x2: number, y2: number): number {
  return (x2 * y1 + x1 * y2) / (x2 - x1) // or y1 - slope(x1, y1, x2, y2) * x1
}


/**
 * Calculate the equation of the line going through two points.
 */
function equation (x1: number, y1: number, x2: number, y2: number): [number, number] {
  let a = (y2 - y1) / (x2 - x1)
  let b = y1 - (x1 * a)
  return [a, b]
}


/**
 * Convert a slope and y-intercept to an string equation (like ax + b).
 */
function linearToString (a: number, b: number): string {
  const A = a == 0 ? '' : a == 1 ? 'x' : a == -1 ? '-x' : a + 'x'
  const B = b == 0 ? '' : A == '' ? b : (b > 0 ? ' + ' : ' - ') + Math.abs(b)
  return A + B
}


/**
 * Calculate the equation of the line of ax + b going through a point.
 */
function perpendicular (a: number, b: number, x: number, y: number): [number, number] {
  a = -1 / a
  b = y - (x * a)
  return [a, b]
}


/**
 * Calculate the coordinates of the points intersecting a circule of center (x, y) and radius r, with a line of equation (a, b).
 */
function circleIntersection (a: number, b: number, x: number, y: number, r: number): [number, number][] {
  // explanations :
  // Y = aX + b
  // (X-x)^2 + (Y-y)^2 == r^2
  // with polynomial expansion : A*X^2 + B*X + C = 0
  let A = (a ** 2 + 1)
  let B = 2 * (a * (b - y) - x)
  let C = x ** 2 + y ** 2 + b ** 2 - 2 * y * b - r ** 2
  let delta = B ** 2 - 4 * A * C
  let X = delta < 0 ? [] : delta == 0 ? [-B / 2 * A] : [(-B + delta ** 0.5) / (2 * A), (-B - delta ** 0.5) / (2 * A)]

  return X.map(x => [x, a * x + b])
}


/**
 * Calculate the squarest rectangle of the specified area.
 */
function squarest (area: number): [number, number] {
  for (let w = Math.ceil(area ** 0.5); w > 0; w--) {
    let min = Math.floor(area / w)
    let max = Math.ceil(area / w)
    if (min * w == area) return [w, min]
    if (max * w == area) return [w, max]
  }
  return [0, 0]
}
