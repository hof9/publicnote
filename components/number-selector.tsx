"use client"

import { cn } from "./lib/utils"

interface NumberSelectorProps {
  range: number
  selectedNumbers: number[]
  toggleNumber: (num: number) => void
  maxSelections: number
}

export default function NumberSelector({ range, selectedNumbers, toggleNumber, maxSelections }: NumberSelectorProps) {
  // Create an array of numbers from 1 to range
  const numbers = Array.from({ length: range }, (_, i) => i + 1)

  return (
    <div className="grid grid-cols-7 sm:grid-cols-10 gap-2">
      {numbers.map((num) => {
        const isSelected = selectedNumbers.includes(num)
        const isDisabled = !isSelected && selectedNumbers.length >= maxSelections

        return (
          <button
            key={num}
            onClick={() => toggleNumber(num)}
            disabled={isDisabled}
            className={cn(
              "w-full aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              isSelected
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900",
              isDisabled && "opacity-50 cursor-not-allowed hover:bg-gray-100",
            )}
          >
            {num}
          </button>
        )
      })}
    </div>
  )
}

