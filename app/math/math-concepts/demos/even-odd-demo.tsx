"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function EvenOddDemo() {
  const [number, setNumber] = useState(4)
  const [showResult, setShowResult] = useState(false)

  const isEven = number % 2 === 0

  const handleCheck = () => {
    setShowResult(true)
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value)) {
      setNumber(value)
      setShowResult(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Input
          type="number"
          value={number}
          onChange={handleNumberChange}
          className="w-24 text-center text-xl"
          min={1}
          max={100}
        />
        <Button onClick={handleCheck} size="lg">
          Check this number
        </Button>
      </div>

      {showResult && (
        <div className="mt-6 rounded-lg border p-6">
          <h3 className="text-xl font-bold mb-4">
            {number} is an {isEven ? "even" : "odd"} number!
          </h3>

          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-2 mb-4 w-full max-w-md">
              {Array.from({ length: number }).map((_, i) => (
                <div
                  key={i}
                  className={`h-12 rounded-md flex items-center justify-center text-white font-bold
                    ${i % 2 === 0 ? "bg-blue-500" : "bg-pink-500"}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              {isEven ? (
                <p className="text-lg">
                  When we put {number} items into 2 equal groups, each group gets {number / 2} items.
                  <br />
                  There's nothing left over, so {number} is an even number!
                </p>
              ) : (
                <p className="text-lg">
                  When we try to put {number} items into 2 equal groups, we get {Math.floor(number / 2)} in each group
                  with 1 left over.
                  <br />
                  Since there's 1 left over, {number} is an odd number!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Separator />

      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <Button
            key={num}
            variant={num % 2 === 0 ? "default" : "outline"}
            className={num % 2 === 0 ? "bg-blue-500 hover:bg-blue-600" : "border-pink-500 text-pink-500"}
            onClick={() => {
              setNumber(num)
              setShowResult(true)
            }}
          >
            {num}
          </Button>
        ))}
      </div>
    </div>
  )
}

