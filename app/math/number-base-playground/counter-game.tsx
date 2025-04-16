"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CounterGame() {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const values = [128, 64, 32, 16, 8, 4, 2, 1]
  const textColors = [
    "text-gray-700",
    "text-gray-700",
    "text-gray-700",
    "text-gray-600",
    "text-gray-500",
    "text-gray-400",
    "text-gray-300",
    "text-gray-200",
  ]

  const handleIncrement = (index: number) => {
    const newCounts = [...counts]
    newCounts[index] += 1
    setCounts(newCounts)
  }

  const handleClear = () => {
    setCounts([0, 0, 0, 0, 0, 0, 0, 0])
  }

  const total = counts.reduce((sum, count, index) => sum + count * values[index], 0)

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between mb-6">
        <div className="relative">
          <div className="flex items-center border rounded-md px-4 py-2 relative cursor-pointer group">
            <span className="text-xl font-medium mr-2">Base-2</span>
            <ChevronDown className="h-5 w-5 ml-4" />

            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block w-48 z-10">
              <div className="py-1">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left font-medium">
                  Binary (Base-2)
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left font-medium">
                  Decimal (Base-10)
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left font-medium">
                  Sexagesimal (Base-60)
                </button>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" className="px-6 py-2 rounded-md font-medium text-base" onClick={handleClear}>
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-8 gap-4">
        {counts.map((count, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-gray-50 w-full py-3 mb-2 rounded-md text-center">
              <span className="text-2xl font-bold">{count}</span>
            </div>
            <div className="border-gray-800 border-2 rounded-md w-full h-96 flex items-center justify-center mb-2 bg-white">
              <span className="text-gray-200 text-4xl font-bold">{values[index]}</span>
            </div>
            <div className="flex items-center bg-gray-50 w-full rounded-md">
              <div className={`${textColors[index]} text-2xl font-bold py-3 flex-grow text-center`}>{count}</div>
              <button
                className={`${textColors[index]} text-2xl font-bold px-4 py-3`}
                onClick={() => handleIncrement(index)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 w-full py-4 mt-4 rounded-md text-center">
        <span className="text-2xl font-bold">Total: {total}</span>
      </div>
    </div>
  )
}
