"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function RationalNumberVisualizer() {
  const [numerator, setNumerator] = useState(1)
  const [denominator, setDenominator] = useState(4)
  const [simplified, setSimplified] = useState({ numerator: 0, denominator: 0 })
  const maxDenominator = 12

  // Calculate GCD for simplification
  const calculateGCD = (a: number, b: number): number => {
    return b === 0 ? a : calculateGCD(b, a % b)
  }

  // Simplify fraction
  useEffect(() => {
    const gcd = calculateGCD(numerator, denominator)
    setSimplified({
      numerator: numerator / gcd,
      denominator: denominator / gcd,
    })
  }, [numerator, denominator])

  // Handle numerator change
  const handleNumeratorChange = (value: number) => {
    if (value > 0 && value <= denominator) {
      setNumerator(value)
    }
  }

  // Handle denominator change
  const handleDenominatorChange = (value: number) => {
    if (value > 0 && value <= maxDenominator) {
      setDenominator(value)
      if (numerator > value) {
        setNumerator(value)
      }
    }
  }

  // Render fraction grid
  const renderFractionGrid = (num: number, denom: number) => {
    const cells = []
    const rows = Math.min(denom, maxDenominator)

    for (let i = 0; i < rows; i++) {
      const isHighlighted = i >= rows - num
      cells.push(
        <div
          key={i}
          className={`border border-gray-300 h-10 transition-colors ${
            isHighlighted ? "bg-yellow-500 hover:bg-yellow-600" : "bg-white hover:bg-gray-100"
          }`}
          title={`${isHighlighted ? rows - i + "/" + rows : ""}`}
        ></div>,
      )
    }

    return <div className="grid grid-cols-1 gap-0 w-20 border border-gray-400 rounded overflow-hidden">{cells}</div>
  }

  return (
    <Card className="w-full p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center">
        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
          <div className="text-center mb-2 sm:mb-4">
            <div className="text-3xl sm:text-4xl font-bold">{numerator}</div>
            <div className="border-t-2 border-black w-10 sm:w-12 mx-auto my-1"></div>
            <div className="text-3xl sm:text-4xl font-bold">{denominator}</div>
          </div>

          <div className="w-full sm:w-auto flex justify-center">
            {renderFractionGrid(numerator, denominator)}
          </div>

          <div className="text-sm text-center mt-2">
            {numerator}/{denominator} = {(numerator / denominator).toFixed(3)}
          </div>
        </div>

        <div className="w-full sm:max-w-xs space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label>Numerator: {numerator}</Label>
            <Slider
              value={[numerator]}
              min={1}
              max={denominator}
              step={1}
              onValueChange={(values) => handleNumeratorChange(values[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Denominator: {denominator}</Label>
            <Slider
              value={[denominator]}
              min={1}
              max={maxDenominator}
              step={1}
              onValueChange={(values) => handleDenominatorChange(values[0])}
            />
          </div>

          {simplified.numerator !== numerator || simplified.denominator !== denominator ? (
            <div className="p-2 sm:p-3 bg-blue-50 rounded-md">
              <p className="text-sm">
                This fraction can be simplified to:
                <span className="font-bold ml-1">
                  {simplified.numerator}/{simplified.denominator}
                </span>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
