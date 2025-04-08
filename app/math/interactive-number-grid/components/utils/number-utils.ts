// Helper function to check if a number is triangular
function isTriangular(n: number): boolean {
  // A number n is triangular if 8n + 1 is a perfect square
  const discriminant = 8 * n + 1
  const sqrt = Math.sqrt(discriminant)
  return Number.isInteger(sqrt)
}

// Helper function to check if a number is Fibonacci
function isFibonacci(n: number): boolean {
  // A number n is Fibonacci if one or both of (5n² + 4) or (5n² - 4) is a perfect square
  const check1 = 5 * n * n + 4
  const check2 = 5 * n * n - 4
  return Number.isInteger(Math.sqrt(check1)) || Number.isInteger(Math.sqrt(check2))
}

// Helper function to check if a number is a power of 2
function isPowerOfTwo(n: number): boolean {
  // A number is a power of 2 if it has exactly one bit set in its binary representation
  return n > 0 && (n & (n - 1)) === 0
}

export function analyzeNumber(n: number): string[] {
  const properties: string[] = []
  
  if (n === 0) {
    properties.push("Zero")
    properties.push("Fibonacci")
    return properties
  }

  if (n === 1) {
    properties.push("One")
    properties.push("Perfect Square")
    properties.push("Fibonacci")
    properties.push("Power of 2")
    return properties
  }

  if (n % 2 === 0) properties.push("Even")
  else properties.push("Odd")

  // Check if number is a perfect square
  const sqrt = Math.sqrt(n)
  if (Number.isInteger(sqrt)) {
    properties.push("Perfect Square")
  }

  // Check if number is triangular
  if (isTriangular(n)) {
    properties.push("Triangular Number")
  }

  // Check if number is Fibonacci
  if (isFibonacci(n)) {
    properties.push("Fibonacci Number")
  }

  // Check if number is a power of 2
  if (isPowerOfTwo(n)) {
    properties.push("Power of 2")
  }

  if (n > 1) {
    let isPrime = true
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime) properties.push("Prime")
  }

  return properties
} 