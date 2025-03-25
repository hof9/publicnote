"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

export function SquareNumbersDemo() {
  const [value, setValue] = useState(3)
  const squareNumber = value * value

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <span className="text-4xl font-bold">{value}</span>
          <span className="text-2xl">²</span>
          <span className="text-4xl font-bold"> = {squareNumber}</span>
        </div>

        <Slider
          value={[value]}
          min={1}
          max={10}
          step={1}
          onValueChange={(vals) => setValue(vals[0])}
          className="w-full max-w-md"
        />

        <p className="text-center text-muted-foreground">Move the slider to change the number</p>
      </div>

      <div className="flex justify-center">
        <div
          className="grid gap-1 bg-blue-100 p-2 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${value}, 1fr)`,
            gridTemplateRows: `repeat(${value}, 1fr)`,
          }}
        >
          {Array.from({ length: squareNumber }).map((_, i) => (
            <div
              key={i}
              className="bg-blue-500 rounded-md w-8 h-8 flex items-center justify-center text-white font-bold"
            />
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg">
          {value}² means {value} rows of {value} blocks.
        </p>
        <p className="text-lg">
          That's {value} × {value} = {squareNumber} blocks total!
        </p>
      </div>
    </div>
  )
}

