import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  SplitSquareHorizontal,
  SplitSquareVertical,
  Plus,
  Circle,
  Star,
  Square,
  Triangle,
  Infinity,
  Binary,
} from "lucide-react"

interface PropertyDefinition {
  name: string
  definition: string
  examples: string
  icon: React.ReactNode
}

export default function NumberPropertiesGuide() {
  const properties: PropertyDefinition[] = [
    {
      name: "Even",
      definition: "A number that is divisible by 2 with no remainder.",
      examples: "0, 2, 4, 6, 8, 10, ...",
      icon: <SplitSquareHorizontal className="h-6 w-6 text-blue-500" />,
    },
    {
      name: "Odd",
      definition: "A number that is not divisible by 2 (leaves a remainder of 1 when divided by 2).",
      examples: "1, 3, 5, 7, 9, 11, ...",
      icon: <SplitSquareVertical className="h-6 w-6 text-purple-500" />,
    },
    {
      name: "Positive",
      definition: "A number greater than zero.",
      examples: "1, 2, 3, 4, ...",
      icon: <Plus className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Zero",
      definition: "The number 0, which is neither positive nor negative.",
      examples: "0",
      icon: <Circle className="h-6 w-6 text-gray-500" />,
    },
    {
      name: "Prime",
      definition: "A number greater than 1 that is only divisible by 1 and itself.",
      examples: "2, 3, 5, 7, 11, 13, 17, 19, ...",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
    },
    {
      name: "Perfect Square",
      definition: "A number that is the product of an integer multiplied by itself.",
      examples: "1 (1²), 4 (2²), 9 (3²), 16 (4²), 25 (5²), ...",
      icon: <Square className="h-6 w-6 text-red-500" />,
    },
    {
      name: "Triangular Number",
      definition:
        "A number that can be represented as a triangular arrangement of points where each row contains one more point than the previous row.",
      examples: "1, 3 (1+2), 6 (1+2+3), 10 (1+2+3+4), 15 (1+2+3+4+5), ...",
      icon: <Triangle className="h-6 w-6 text-orange-500" />,
    },
    {
      name: "Fibonacci Number",
      definition:
        "A number in the Fibonacci sequence, where each number is the sum of the two preceding ones, starting from 0 and 1.",
      examples: "0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...",
      icon: <Infinity className="h-6 w-6 text-teal-500" />,
    },
    {
      name: "Power of 2",
      definition: "A number that can be expressed as 2 raised to an integer exponent.",
      examples: "1 (2⁰), 2 (2¹), 4 (2²), 8 (2³), 16 (2⁴), 32 (2⁵), ...",
      icon: <Binary className="h-6 w-6 text-indigo-500" />,
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Number Properties Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((prop) => (
            <div key={prop.name} className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {prop.icon}
                <h3 className="text-lg font-bold">{prop.name}</h3>
              </div>
              <p className="text-sm mb-3">{prop.definition}</p>
              <div>
                <span className="text-xs font-semibold text-gray-500">Examples:</span>
                <p className="text-sm font-mono">{prop.examples}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

