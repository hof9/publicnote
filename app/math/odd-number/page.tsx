"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Plus, Minus, X, Square, Infinity, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OddNumbersApp() {
  const [activeTab, setActiveTab] = useState("definition")
  const [number1, setNumber1] = useState(3)
  const [number2, setNumber2] = useState(5)
  const [sequenceLength, setSequenceLength] = useState(10)
  const [customNumber, setCustomNumber] = useState(7)

  // Generate a sequence of odd numbers
  const generateOddSequence = (length: number) => {
    return Array.from({ length }, (_, i) => 2 * i + 1)
  }

  // Check if a number is odd
  const isOdd = (num: number) => Math.abs(num) % 2 === 1

  // Check if a number is prime
  const isPrime = (num: number) => {
    if (num <= 1) return false
    if (num <= 3) return true
    if (num % 2 === 0 || num % 3 === 0) return false

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false
    }
    return true
  }

  // Generate consecutive odd numbers starting from a given number
  const generateConsecutiveOdds = (start: number, count: number) => {
    const result = []
    let current = start
    if (!isOdd(current)) current += 1

    for (let i = 0; i < count; i++) {
      result.push(current)
      current += 2
    }

    return result
  }

  // Calculate GCD for coprime demonstration
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  // Helper function for number input with controls
  interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label?: string;
    className?: string;
  }

  const NumberInput = ({ value, onChange, min = 0, max = 100, label = "", className = "" }: NumberInputProps) => {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {label && <label className="mb-1 text-sm font-medium">{label}</label>}
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-r-none"
            onClick={() => onChange(Math.max(min, value - 1))}
            aria-label="Decrease"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(Number.parseInt(e.target.value) || min)}
            min={min}
            max={max}
            className="h-10 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-l-none"
            onClick={() => onChange(Math.min(max, value + 1))}
            aria-label="Increase"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Exploring Odd Numbers</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="definition">Definition</TabsTrigger>
          <TabsTrigger value="sequence">Sequence</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>

        {/* Definition and Basic Property */}
        <TabsContent value="definition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Definition of Odd Numbers</CardTitle>
              <CardDescription>
                An odd number is an integer that is not divisible by 2, meaning it leaves a remainder of 1 when divided
                by 2.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <NumberInput
                    value={customNumber}
                    onChange={setCustomNumber}
                    min={0}
                    max={999}
                    label="Enter a number"
                  />

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="text-lg">{customNumber}</span>
                    <span className="text-lg">÷</span>
                    <span className="text-lg">2</span>
                    <span className="text-lg">=</span>
                    <span className="text-lg">{Math.floor(customNumber / 2)}</span>
                    <span className="text-lg">with remainder</span>
                    <span className="text-lg font-bold">{customNumber % 2}</span>
                  </div>

                  <div className="mt-4 text-xl font-semibold">
                    {isOdd(customNumber) ? (
                      <span className="text-green-600">This is an odd number!</span>
                    ) : (
                      <span className="text-blue-600">This is an even number!</span>
                    )}
                  </div>

                  <div className="mt-6 grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <div
                        key={num}
                        className={`w-10 h-10 flex items-center justify-center rounded-full 
                          ${isOdd(num) ? "bg-green-100 border-2 border-green-500" : "bg-blue-100"}`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pattern in Sequence */}
        <TabsContent value="sequence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pattern in Sequence</CardTitle>
              <CardDescription>
                Odd numbers follow a simple arithmetic sequence where each term increases by 2 from the previous one.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="mb-4 w-full max-w-xs">
                    <label className="block text-sm font-medium mb-2">Sequence length:</label>
                    <div className="flex items-center gap-2">
                      <NumberInput value={sequenceLength} onChange={setSequenceLength} min={5} max={20} />
                      <Slider
                        value={[sequenceLength]}
                        min={5}
                        max={20}
                        step={1}
                        onValueChange={(value) => setSequenceLength(value[0])}
                        className="w-full max-w-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-8 mt-4">
                    {generateOddSequence(sequenceLength).map((num, index) => (
                      <div key={index} className="relative">
                        <div className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-primary/10 border-2 border-primary p-2">
                          {num}
                        </div>
                        {index < sequenceLength - 1 && (
                          <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 text-sm font-medium px-1.5 py-0.5">
                            +2
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-muted rounded-lg">
                    <p className="text-center">
                      Formula for the nth odd number: <strong>2n - 1</strong> or <strong>2(n-1) + 1</strong>
                    </p>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="text-center p-2 bg-background rounded shadow-sm">
                          <div>n = {n}</div>
                          <div>
                            2({n}) - 1 = {2 * n - 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operations with Odd Numbers */}
        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operations with Odd Numbers</CardTitle>
              <CardDescription>Explore how odd numbers behave under different mathematical operations.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-medium mb-4">Choose two odd numbers:</h3>
                  <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <NumberInput value={number1} onChange={setNumber1} min={-99} max={99} label="First number" />
                    <NumberInput value={number2} onChange={setNumber2} min={-99} max={99} label="Second number" />
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>{isOdd(number1) ? "Odd ✓" : "Not odd ✗"}</div>
                    <div>{isOdd(number2) ? "Odd ✓" : "Not odd ✗"}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <span>{number1}</span>
                      <Plus className="mx-2 h-4 w-4" />
                      <span>{number2}</span>
                      <span className="mx-2">=</span>
                      <span className="font-bold">{number1 + number2}</span>
                    </div>
                    <div>
                      {isOdd(number1 + number2) ? "Odd" : "Even"}
                      <span className="ml-2 text-sm">
                        {isOdd(number1) && isOdd(number2) ? "(Odd + Odd = Even)" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <span>{number1}</span>
                      <Minus className="mx-2 h-4 w-4" />
                      <span>{number2}</span>
                      <span className="mx-2">=</span>
                      <span className="font-bold">{number1 - number2}</span>
                    </div>
                    <div>
                      {isOdd(number1 - number2) ? "Odd" : "Even"}
                      <span className="ml-2 text-sm">
                        {isOdd(number1) && isOdd(number2) ? "(Odd - Odd = Even)" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <span>{number1}</span>
                      <X className="mx-2 h-4 w-4" />
                      <span>{number2}</span>
                      <span className="mx-2">=</span>
                      <span className="font-bold">{number1 * number2}</span>
                    </div>
                    <div>
                      {isOdd(number1 * number2) ? "Odd" : "Even"}
                      <span className="ml-2 text-sm">
                        {isOdd(number1) && isOdd(number2) ? "(Odd × Odd = Odd)" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patterns and Squares */}
        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patterns and Squares</CardTitle>
              <CardDescription>Explore squares of odd numbers and the 2n+1 representation.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Squares of Odd Numbers</h3>
                  <div className="space-y-3">
                    {[1, 3, 5, 7, 9].map((num) => (
                      <div key={num} className="flex items-center p-2 bg-muted rounded-lg">
                        <div className="w-10 text-center">{num}</div>
                        <Square className="mx-2 h-4 w-4" />
                        <div className="w-12 text-center">{num * num}</div>
                        <div className="ml-auto text-sm">{isOdd(num * num) ? "Odd" : "Even"}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm">
                      The square of an odd number is always odd. This follows from the multiplication rule, as an odd
                      number times itself remains odd.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">2n+1 Representation</h3>
                  <div className="space-y-3">
                    {[0, 1, 2, 3, 4].map((n) => (
                      <div key={n} className="flex items-center p-2 bg-muted rounded-lg">
                        <div className="flex items-center">
                          <span>2 × {n} + 1 =</span>
                          <span className="ml-2 font-bold">{2 * n + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm">
                      Every odd number can be expressed in the form 2n + 1, where n is an integer. This algebraic form
                      is useful in proofs and number theory.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional Properties */}
        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Properties</CardTitle>
              <CardDescription>Explore consecutive odd numbers, primes, and more.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Consecutive Odd Numbers</h3>
                  <div className="mb-4">
                    <NumberInput
                      value={customNumber}
                      onChange={setCustomNumber}
                      min={1}
                      max={99}
                      label="Starting number"
                    />
                  </div>

                  <div className="space-y-3">
                    {generateConsecutiveOdds(customNumber, 4).map((num, index, arr) => (
                      <div key={index} className="p-2 bg-muted rounded-lg">
                        {index < arr.length - 1 && (
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{num}</span> and{" "}
                              <span className="font-medium">{arr[index + 1]}</span>
                            </div>
                            <div className="text-sm">Difference: {arr[index + 1] - num}</div>
                            <div className="text-sm">
                              GCD: {gcd(num, arr[index + 1])}
                              {gcd(num, arr[index + 1]) === 1 ? " (coprime)" : ""}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm">
                      Any two consecutive odd numbers differ by 2 and are coprime, meaning they share no common factors
                      other than 1.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Odd Numbers and Primes</h3>
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                      const isOddPrime = isOdd(num) && isPrime(num)
                      return (
                        <div key={num} className="flex items-center justify-center">
                          {isOddPrime ? (
                            <div className="p-1 border-4 border-red-600 rounded-md">
                              <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full
                                  ${isOdd(num) ? "bg-green-100" : "bg-blue-100"}`}
                              >
                                {num}
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`w-10 h-10 flex items-center justify-center rounded-full
                                ${isOdd(num) ? "bg-green-100" : "bg-blue-100"}`}
                            >
                              {num}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex mb-4">
                    <div className="mr-4 flex items-center">
                      <div className="w-4 h-4 bg-green-100 rounded-full mr-1"></div>
                      <span className="text-sm">Odd</span>
                    </div>
                    <div className="flex items-center">
                      <div className="p-1 border-4 border-red-600 rounded-md mr-1">
                        <div className="w-4 h-4 bg-green-100 rounded-full"></div>
                      </div>
                      <span className="text-sm">Odd Prime</span>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm">
                      All prime numbers except 2 are odd. This is because evenness introduces divisibility by 2, which
                      disqualifies numbers from being prime unless they are exactly 2.
                    </p>
                  </div>

                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-center">
                      <Infinity className="inline-block h-4 w-4 mr-1" />
                      There are infinitely many odd numbers, just as there are infinitely many integers.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

