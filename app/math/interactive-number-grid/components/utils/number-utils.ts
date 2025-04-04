export function analyzeNumber(n: number): string[] {
  const properties: string[] = []
  
  if (n === 0) {
    properties.push("Zero")
    return properties
  }

  if (n === 1) {
    properties.push("One")
    return properties
  }

  if (n % 2 === 0) properties.push("Even")
  else properties.push("Odd")

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