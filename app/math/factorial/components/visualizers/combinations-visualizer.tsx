"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface CombinationsVisualizerProps {
  n: number
}

export default function CombinationsVisualizer({ n }: CombinationsVisualizerProps) {
  const [k, setK] = useState(Math.min(2, n))
  const [combinations, setCombinations] = useState<number[][]>([])

  // Calculate factorial
  const factorial = (num: number): number => {
    if (num <= 1) return 1
    return num * factorial(num - 1)
  }

  // Calculate binomial coefficient (n choose k)
  const binomialCoefficient = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0
    if (k === 0 || k === n) return 1

    return factorial(n) / (factorial(k) * factorial(n - k))
  }

  // Generate combinations
  useEffect(() => {
    const validK = Math.min(k, n)
    setK(validK)

    // Helper function to generate combinations
    const generateCombinations = (n: number, k: number): number[][] => {
      const result: number[][] = []

      // Recursive helper
      const backtrack = (start: number, current: number[]) => {
        if (current.length === k) {
          result.push([...current])
          return
        }

        for (let i = start; i <= n; i++) {
          current.push(i)
          backtrack(i + 1, current)
          current.pop()
        }
      }

      backtrack(1, [])
      return result
    }

    // Generate combinations (limit to a reasonable number for display)
    const maxCombsToShow = 100
    const allCombs = generateCombinations(n, validK)
    setCombinations(allCombs.slice(0, maxCombsToShow))
  }, [n, k])

  const totalCombinations = binomialCoefficient(n, k)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Combinations</CardTitle>
        <CardDescription>
          Used in binomial coefficients (n choose k) for counting selections. Selecting {k} items from {n} items: {n}!/
          {k}!({n}-{k})! = {totalCombinations.toLocaleString()} ways.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm">k:</span>
              <Slider
                value={[k]}
                min={1}
                max={n}
                step={1}
                onValueChange={(value) => setK(value[0])}
                className="w-full"
              />
              <span className="text-sm font-mono w-8">{k}</span>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="text-xl font-bold">
                C({n},{k}) =
              </div>
              <div className="text-xl font-bold">{totalCombinations.toLocaleString()}</div>
            </div>

            <div className="flex items-center justify-center mt-2">
              <div className="text-center">
                <div className="border-b border-slate-300 dark:border-slate-600 pb-1 text-center">{n}!</div>
                <div className="pt-1 text-center">
                  {k}!({n - k})!
                </div>
              </div>
              <div className="mx-2">=</div>
              <div className="text-center">
                <div className="border-b border-slate-300 dark:border-slate-600 pb-1 text-center">
                  {factorial(n).toLocaleString()}
                </div>
                <div className="pt-1 text-center">
                  {factorial(k).toLocaleString()} × {factorial(n - k).toLocaleString()}
                </div>
              </div>
              <div className="mx-2">=</div>
              <div className="font-bold">{totalCombinations.toLocaleString()}</div>
            </div>
          </div>

          {/* Visual representation of combinations */}
          <div className="mt-4 w-full">
            <h3 className="text-lg font-medium mb-2">Possible Combinations:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-64 overflow-y-auto">
              {combinations.map((combo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-1 p-2 rounded-md border border-gray-200 dark:border-gray-700"
                >
                  {combo.map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 font-medium text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {totalCombinations > combinations.length && (
              <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-2">
                Showing {combinations.length} of {totalCombinations.toLocaleString()} combinations
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
