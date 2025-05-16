"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"

interface PermutationsVisualizerProps {
  n: number
  factorial: number
}

export default function PermutationsVisualizer({ n, factorial }: PermutationsVisualizerProps) {
  const [items, setItems] = useState<string[]>([])
  const [permutations, setPermutations] = useState<string[][]>([])
  const [currentPermIndex, setCurrentPermIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  // Generate items based on n (using letters A, B, C, etc.)
  useEffect(() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    setItems(Array.from({ length: Math.min(n, 26) }, (_, i) => alphabet[i]))
    setCurrentPermIndex(0)
    setShowAll(false)
  }, [n])

  // Generate a subset of permutations (for display purposes)
  useEffect(() => {
    // For large n, we'll just show a sample of permutations
    const maxPermsToShow = 120 // Show at most 120 permutations

    if (n <= 0) {
      setPermutations([])
      return
    }

    // Helper function to generate permutations
    const generatePermutations = (arr: string[]): string[][] => {
      if (arr.length <= 1) return [arr]

      const result: string[][] = []

      for (let i = 0; i < arr.length; i++) {
        const current = arr[i]
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)]
        const permsOfRemaining = generatePermutations(remaining)

        for (const perm of permsOfRemaining) {
          result.push([current, ...perm])
        }
      }

      return result
    }

    let allPerms: string[][] = []

    if (factorial <= maxPermsToShow) {
      // Generate all permutations if n is small enough
      allPerms = generatePermutations(items)
    } else {
      // For large n, generate a random sample
      const shuffleArray = (array: string[]) => {
        const result = [...array]
        for (let i = result.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[result[i], result[j]] = [result[j], result[i]]
        }
        return result
      }

      // Generate some random permutations
      const seen = new Set<string>()
      for (let i = 0; i < maxPermsToShow; i++) {
        const perm = shuffleArray(items)
        const permStr = perm.join("")
        if (!seen.has(permStr)) {
          seen.add(permStr)
          allPerms.push(perm)
        }
      }
    }

    setPermutations(allPerms)
  }, [items, n, factorial])

  const handleShuffle = () => {
    const nextIndex = (currentPermIndex + 1) % permutations.length
    setCurrentPermIndex(nextIndex)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permutations</CardTitle>
        <CardDescription>
          Factorials calculate the number of ways to arrange n distinct objects. For {n} objects, there are{" "}
          {factorial.toLocaleString()} possible arrangements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <Button onClick={handleShuffle} className="flex items-center gap-2">
              <Shuffle className="w-4 h-4" />
              Shuffle
            </Button>
            <Button variant="outline" onClick={() => setShowAll(!showAll)} disabled={factorial > 120}>
              {showAll ? "Hide All" : "Show All"}
            </Button>
          </div>

          {/* Current permutation visualization */}
          {permutations.length > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6">
              {permutations[currentPermIndex].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-600 text-white font-bold text-xl transition-all duration-300"
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          {/* All permutations (limited display) */}
          {showAll && permutations.length <= 120 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4 max-h-96 overflow-y-auto w-full">
              {permutations.map((perm, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center gap-1 p-2 rounded-md border ${
                    index === currentPermIndex
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {perm.map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center justify-center w-6 h-6 rounded-md bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 font-medium text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}

          {factorial > 120 && !showAll && (
            <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
              There are too many permutations ({factorial.toLocaleString()}) to display all at once. Use the shuffle
              button to see different arrangements.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
