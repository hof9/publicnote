"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { InfoIcon } from "lucide-react"

type NumberType = "even" | "odd" | "prime" | "square" | "triangular" | "fibonacci" | "multiple3" | "multiple5"

interface NumberTypeInfo {
  name: string
  color: string
  description: string
}

const numberTypeInfo: Record<NumberType, NumberTypeInfo> = {
  even: {
    name: "Even Numbers",
    color: "bg-blue-500",
    description: "Numbers divisible by 2 (e.g., 2, 4, 6, 8...)",
  },
  odd: {
    name: "Odd Numbers",
    color: "bg-red-500",
    description: "Numbers not divisible by 2 (e.g., 1, 3, 5, 7...)",
  },
  prime: {
    name: "Prime Numbers",
    color: "bg-green-500",
    description: "Numbers with exactly two factors: 1 and itself (e.g., 2, 3, 5, 7, 11...)",
  },
  square: {
    name: "Square Numbers",
    color: "bg-purple-500",
    description: "Numbers that are perfect squares (e.g., 1, 4, 9, 16...)",
  },
  triangular: {
    name: "Triangular Numbers",
    color: "bg-yellow-500",
    description: "Sum of the first n natural numbers (e.g., 1, 3, 6, 10...)",
  },
  fibonacci: {
    name: "Fibonacci Numbers",
    color: "bg-orange-500",
    description: "Numbers in the Fibonacci sequence (e.g., 1, 1, 2, 3, 5, 8...)",
  },
  multiple3: {
    name: "Multiples of 3",
    color: "bg-teal-500",
    description: "Numbers divisible by 3 (e.g., 3, 6, 9, 12...)",
  },
  multiple5: {
    name: "Multiples of 5",
    color: "bg-pink-500",
    description: "Numbers divisible by 5 (e.g., 5, 10, 15, 20...)",
  },
}

export default function NumberGrid() {
  const [gridSize, setGridSize] = useState(10)
  const [selectedTypes, setSelectedTypes] = useState<NumberType[]>(["prime"])
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null)

  // Check if a number is prime
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

  // Check if a number is a perfect square
  const isSquare = (num: number): boolean => {
    const sqrt = Math.sqrt(num)
    return sqrt === Math.floor(sqrt)
  }

  // Check if a number is triangular
  const isTriangular = (num: number): boolean => {
    // A number is triangular if 8*n+1 is a perfect square
    const n = 8 * num + 1
    const sqrt = Math.sqrt(n)
    return sqrt === Math.floor(sqrt)
  }

  // Check if a number is in the Fibonacci sequence
  const isFibonacci = (num: number): boolean => {
    // A number is Fibonacci if 5*n^2+4 or 5*n^2-4 is a perfect square
    const test1 = 5 * num * num + 4
    const test2 = 5 * num * num - 4
    const sqrt1 = Math.sqrt(test1)
    const sqrt2 = Math.sqrt(test2)
    return sqrt1 === Math.floor(sqrt1) || sqrt2 === Math.floor(sqrt2)
  }

  // Get the types of a number
  const getNumberTypes = (num: number): NumberType[] => {
    const types: NumberType[] = []

    if (num % 2 === 0) types.push("even")
    else types.push("odd")

    if (isPrime(num)) types.push("prime")
    if (isSquare(num)) types.push("square")
    if (isTriangular(num)) types.push("triangular")
    if (isFibonacci(num)) types.push("fibonacci")
    if (num % 3 === 0) types.push("multiple3")
    if (num % 5 === 0) types.push("multiple5")

    return types
  }

  // Toggle a number type selection
  const toggleNumberType = (type: NumberType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  // Get the background color for a cell based on its number types
  const getCellBackground = (num: number): string => {
    const types = getNumberTypes(num)
    const matchingTypes = types.filter((type) => selectedTypes.includes(type))

    if (matchingTypes.length === 0) return "bg-gray-100 dark:bg-gray-800"

    if (matchingTypes.length === 1) {
      return numberTypeInfo[matchingTypes[0]].color
    }

    // For multiple matching types, use a gradient or a special color
    return "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
  }

  // Generate the grid cells
  const renderGrid = () => {
    const cells = []
    for (let i = 1; i <= gridSize * gridSize; i++) {
      const cellTypes = getNumberTypes(i)
      const isHighlighted = cellTypes.some((type) => selectedTypes.includes(type))

      cells.push(
        <div
          key={i}
          className={`aspect-square flex items-center justify-center border border-gray-200 dark:border-gray-700 text-xs sm:text-sm transition-colors duration-200 ${
            isHighlighted ? getCellBackground(i) + " text-white" : "bg-gray-100 dark:bg-gray-800"
          }`}
          onMouseEnter={() => setHoveredNumber(i)}
          onMouseLeave={() => setHoveredNumber(null)}
        >
          {i}
        </div>,
      )
    }
    return cells
  }

  // Get information about the hovered number
  const getHoveredNumberInfo = () => {
    if (hoveredNumber === null) return null

    const types = getNumberTypes(hoveredNumber)
    return (
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <h3 className="font-bold mb-2">Number {hoveredNumber}</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Badge key={type} className={`${numberTypeInfo[type].color}`}>
              {numberTypeInfo[type].name}
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Grid Settings</CardTitle>
          <CardDescription>Adjust the size of the number grid</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>
                  Grid Size: {gridSize}×{gridSize}
                </span>
                <span>{gridSize * gridSize} numbers</span>
              </div>
              <Slider value={[gridSize]} min={5} max={20} step={1} onValueChange={(value) => setGridSize(value[0])} />
            </div>

            <div>
              <h3 className="font-medium mb-2">Number Types to Highlight:</h3>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(numberTypeInfo) as NumberType[]).map((type) => (
                  <TooltipProvider key={type}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={selectedTypes.includes(type) ? "default" : "outline"}
                          className={`${selectedTypes.includes(type) ? numberTypeInfo[type].color : ""}`}
                          onClick={() => toggleNumberType(type)}
                        >
                          {numberTypeInfo[type].name}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{numberTypeInfo[type].description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Number Grid Visualization
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Hover over numbers to see their properties. Numbers are highlighted based on your selected types.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="grid border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {renderGrid()}
          </div>

          {hoveredNumber !== null && getHoveredNumberInfo()}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            <p>
              Patterns emerge when numbers are arranged in a grid. For example, prime numbers tend to avoid certain
              columns.
            </p>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Number Type Explanations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {(Object.keys(numberTypeInfo) as NumberType[]).map((type) => (
              <div key={type} className="flex items-start gap-2">
                <div className={`w-4 h-4 mt-1 rounded-full ${numberTypeInfo[type].color}`}></div>
                <div>
                  <h3 className="font-medium">{numberTypeInfo[type].name}</h3>
                  <p className="text-sm text-muted-foreground">{numberTypeInfo[type].description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

