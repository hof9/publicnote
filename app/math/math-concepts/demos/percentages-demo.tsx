"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

export function PercentagesDemo() {
  const [percent, setPercent] = useState(25)

  const handlePercentChange = (values: number[]) => {
    setPercent(values[0])
  }

  // Calculate fraction representation
  const getFraction = (percent: number) => {
    if (percent === 0) return "0/100"
    if (percent === 100) return "100/100"

    // Find GCD for simplification
    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b)
    }

    const divisor = gcd(percent, 100)
    const numerator = percent / divisor
    const denominator = 100 / divisor

    return `${numerator}/${denominator}`
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-5xl font-bold">{percent}%</span>
      </div>

      <Slider
        value={[percent]}
        min={0}
        max={100}
        step={5}
        onValueChange={handlePercentChange}
        className="max-w-md mx-auto"
      />

      <div className="max-w-md mx-auto space-y-4">
        <Progress value={percent} className="h-8" />

        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`h-8 rounded ${i < percent / 10 ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg">
          {percent}% means {percent} out of 100 parts.
        </p>
        <p className="text-lg">As a fraction: {getFraction(percent)}</p>
        <p className="text-lg">As a decimal: {(percent / 100).toFixed(2)}</p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-10 gap-0.5 w-80 h-80 p-1 bg-gray-200 rounded-lg">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className={`aspect-square rounded-sm ${i < percent ? "bg-green-500" : "bg-white"}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

