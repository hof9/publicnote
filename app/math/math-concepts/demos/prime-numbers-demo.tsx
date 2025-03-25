"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function PrimeNumbersDemo() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)

  const isPrime = (num: number): boolean => {
    if (num <= 1) return false
    if (num <= 3) return true
    if (num % 2 === 0 || num % 3 === 0) return false

    let i = 5
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) return false
      i += 6
    }
    return true
  }

  const getFactors = (num: number): number[] => {
    const factors: number[] = []
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i)
      }
    }
    return factors
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <p className="text-lg">Click on a number to see if it's prime!</p>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            variant={isPrime(num) ? "default" : "outline"}
            className={isPrime(num) ? "bg-green-500 hover:bg-green-600" : ""}
            onClick={() => setSelectedNumber(num)}
          >
            {num}
          </Button>
        ))}
      </div>

      {selectedNumber !== null && (
        <Card className="p-4 mt-6">
          <h3 className="text-xl font-bold mb-2">
            {selectedNumber} is {isPrime(selectedNumber) ? "a prime number!" : "not a prime number."}
          </h3>

          <div className="mt-4">
            <p className="mb-2">Factors of {selectedNumber}:</p>
            <div className="flex flex-wrap gap-2">
              {getFactors(selectedNumber).map((factor) => (
                <div
                  key={factor}
                  className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold"
                >
                  {factor}
                </div>
              ))}
            </div>

            {isPrime(selectedNumber) ? (
              <p className="mt-4">{selectedNumber} only has 2 factors: 1 and itself. That makes it a prime number!</p>
            ) : (
              <p className="mt-4">
                {selectedNumber} has {getFactors(selectedNumber).length} factors. Since it has more than 2 factors, it's
                not a prime number.
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

