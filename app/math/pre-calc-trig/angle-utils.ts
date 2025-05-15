// Utility functions for angle calculations and conversions

// Convert degrees to radians
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

// Convert radians to degrees
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI
}

// Parse angle input that could be in degrees or in radian expressions like "pi/6"
export function parseAngleInput(input: string): { value: number; unit: "degrees" | "radians" } {
  input = input.trim().toLowerCase()

  // Check if input contains "pi"
  if (input.includes("pi")) {
    // Handle pi expressions
    let value: number

    if (input === "pi") {
      value = Math.PI
    } else if (input.includes("/")) {
      // Handle fractions of pi (e.g., "pi/6", "7pi/4")
      const parts = input.split("/")
      const numerator = parts[0].replace("pi", "").trim()
      const denominator = parts[1].trim()

      const numeratorValue = numerator === "" ? 1 : numerator === "-" ? -1 : Number.parseFloat(numerator) || 0
      const denominatorValue = Number.parseFloat(denominator) || 1

      value = (numeratorValue * Math.PI) / denominatorValue
    } else {
      // Handle multiples of pi (e.g., "2pi", "-3pi")
      const multiplier = Number.parseFloat(input.replace("pi", "")) || 1
      value = multiplier * Math.PI
    }

    return { value, unit: "radians" }
  } else {
    // Assume degrees if no "pi" is present
    return { value: Number.parseFloat(input) || 0, unit: "degrees" }
  }
}

// Format radians as a pi expression
export function formatRadians(radians: number): string {
  const piRatio = radians / Math.PI

  // Special cases
  if (piRatio === 0) return "0"
  if (piRatio === 1) return "π"
  if (piRatio === -1) return "-π"

  // Check if it's a "nice" fraction
  const denominators = [2, 3, 4, 6, 12]
  for (const denominator of denominators) {
    const numerator = piRatio * denominator
    if (Math.abs(Math.round(numerator) - numerator) < 0.0001) {
      const roundedNumerator = Math.round(numerator)
      if (roundedNumerator === 1) return `π/${denominator}`
      if (roundedNumerator === -1) return `-π/${denominator}`
      return `${roundedNumerator}π/${denominator}`
    }
  }

  // If not a nice fraction, round to 2 decimal places
  return `${Math.round(piRatio * 100) / 100}π`
}

// Normalize angle to [0, 360) degrees
export function normalizeAngle(angle: number, unit: "degrees" | "radians"): number {
  if (unit === "degrees") {
    return ((angle % 360) + 360) % 360
  } else {
    return ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
  }
}

// Find coterminal angles
export function findCoterminalAngles(
  angle: number,
  unit: "degrees" | "radians",
): { positive: number; negative: number } {
  const fullRotation = unit === "degrees" ? 360 : 2 * Math.PI
  const normalizedAngle = normalizeAngle(angle, unit)

  return {
    positive: normalizedAngle === 0 ? fullRotation : normalizedAngle + fullRotation,
    negative: normalizedAngle === 0 ? -fullRotation : normalizedAngle - fullRotation,
  }
}

// Find complement angle (90° - θ)
export function findComplementAngle(angle: number, unit: "degrees" | "radians"): number {
  const rightAngle = unit === "degrees" ? 90 : Math.PI / 2
  return rightAngle - angle
}

// Find supplement angle (180° - θ)
export function findSupplementAngle(angle: number, unit: "degrees" | "radians"): number {
  const straightAngle = unit === "degrees" ? 180 : Math.PI
  return straightAngle - angle
}

// Find reference angle (smallest positive angle to x-axis)
export function findReferenceAngle(angle: number, unit: "degrees" | "radians"): number {
  const fullRotation = unit === "degrees" ? 360 : 2 * Math.PI
  const halfRotation = unit === "degrees" ? 180 : Math.PI

  // Normalize to [0, 360) or [0, 2π)
  const normalizedAngle = normalizeAngle(angle, unit)

  // Calculate reference angle based on quadrant
  if (normalizedAngle <= halfRotation) {
    return normalizedAngle
  } else {
    return fullRotation - normalizedAngle
  }
}

// Get quadrant (1, 2, 3, or 4) for an angle
export function getQuadrant(angle: number, unit: "degrees" | "radians"): number {
  const normalizedAngle = normalizeAngle(angle, unit)
  const rightAngle = unit === "degrees" ? 90 : Math.PI / 2
  const straightAngle = unit === "degrees" ? 180 : Math.PI
  const threeQuarterAngle = unit === "degrees" ? 270 : (3 * Math.PI) / 2

  if (normalizedAngle === 0 || normalizedAngle === (unit === "degrees" ? 360 : 2 * Math.PI)) {
    return 1 // On positive x-axis
  } else if (normalizedAngle === rightAngle) {
    return 1 // On positive y-axis
  } else if (normalizedAngle === straightAngle) {
    return 2 // On negative x-axis
  } else if (normalizedAngle === threeQuarterAngle) {
    return 4 // On negative y-axis
  } else if (normalizedAngle < rightAngle) {
    return 1
  } else if (normalizedAngle < straightAngle) {
    return 2
  } else if (normalizedAngle < threeQuarterAngle) {
    return 3
  } else {
    return 4
  }
}
