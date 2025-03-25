"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function FractionsDemo() {
  const [numerator, setNumerator] = useState(3)
  const [denominator, setDenominator] = useState(4)

  const handleNumeratorChange = (values: number[]) => {
    setNumerator(values[0])
  }

  const handleDenominatorChange = (values: number[]) => {
    setDenominator(values[0])
  }

  const presetFractions = [
    { num: 1, den: 2, name: "1/2" },
    { num: 1, den: 4, name: "1/4" },
    { num: 3, den: 4, name: "3/4" },
    { num: 1, den: 3, name: "1/3" },
    { num: 2, den: 3, name: "2/3" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-4">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{numerator}</span>
            <div className="h-1 bg-black w-16 my-2"></div>
            <span className="text-4xl font-bold">{denominator}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div>
          <p className="mb-2">Numerator (top number): {numerator}</p>
          <Slider value={[numerator]} min={1} max={denominator} step={1} onValueChange={handleNumeratorChange} />
        </div>

        <div>
          <p className="mb-2">Denominator (bottom number): {denominator}</p>
          <Slider value={[denominator]} min={2} max={12} step={1} onValueChange={handleDenominatorChange} />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-64 h-64 border-4 border-gray-300 rounded-lg overflow-hidden grid p-2 bg-white">
          {Array.from({ length: denominator }).map((_, i) => (
            <div
              key={i}
              className={`border border-gray-300 ${i < numerator ? "bg-orange-400" : "bg-gray-100"}`}
              style={{
                height: `calc(100% / ${Math.ceil(Math.sqrt(denominator))})`,
                width: `calc(100% / ${Math.ceil(Math.sqrt(denominator))})`,
                float: "left",
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-lg">
          {numerator} out of {denominator} parts are colored.
        </p>
        <p className="text-lg">
          That's {numerator}/{denominator} of the whole shape!
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {presetFractions.map((fraction) => (
          <Button
            key={`${fraction.num}-${fraction.den}`}
            variant="outline"
            onClick={() => {
              setNumerator(fraction.num)
              setDenominator(fraction.den)
            }}
          >
            {fraction.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

