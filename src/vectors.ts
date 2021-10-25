export interface Vector {
    x: number;
    y: number;
}

/**
 * Find the middle point between two vectors
 */
export function getMiddle(a: Vector, b: Vector): Vector {
  return {
    x: a.x + (b.x - a.x) * 0.50,
    y: a.y + (b.y - a.y) * 0.50,
  };
}

/**
 * Find the distance between two vectors
 * @param a
 * @param b
 */
export function getDistance(a: Vector, b: Vector): number {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
}

/**
 * Get the angle in degrees between two vectors
 * @param a
 * @param b
 */
export function getAngle(a: Vector, b: Vector) {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}
