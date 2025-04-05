"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"

// Color schemes based on the rainbow
const colorSchemes = {
  red: ["#ffebee", "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#f44336", "#e53935", "#d32f2f", "#c62828", "#b71c1c"],
  orange: [
    "#fff3e0",
    "#ffe0b2",
    "#ffcc80",
    "#ffb74d",
    "#ffa726",
    "#ff9800",
    "#fb8c00",
    "#f57c00",
    "#ef6c00",
    "#e65100",
  ],
  yellow: [
    "#fffde7",
    "#fff9c4",
    "#fff59d",
    "#fff176",
    "#ffee58",
    "#ffeb3b",
    "#fdd835",
    "#fbc02d",
    "#f9a825",
    "#f57f17",
  ],
  green: ["#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"],
  blue: ["#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#2196f3", "#1e88e5", "#1976d2", "#1565c0", "#0d47a1"],
  indigo: [
    "#e8eaf6",
    "#c5cae9",
    "#9fa8da",
    "#7986cb",
    "#5c6bc0",
    "#3f51b5",
    "#3949ab",
    "#303f9f",
    "#283593",
    "#1a237e",
  ],
  violet: [
    "#f3e5f5",
    "#e1bee7",
    "#ce93d8",
    "#ba68c8",
    "#ab47bc",
    "#9c27b0",
    "#8e24aa",
    "#7b1fa2",
    "#6a1b9a",
    "#4a148c",
  ],
}

export default function MathSquares() {
  const [n, setN] = useState(3)
  const [colorScheme, setColorScheme] = useState<keyof typeof colorSchemes>("blue")
  const [squares, setSquares] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  // Reset and animate squares when n changes
  useEffect(() => {
    setIsAnimating(true)
    setSquares([])

    const totalSquares = n * n
    const delay = 1500 / totalSquares // Distribute animations over 1.5 seconds

    // Animate squares appearing one by one
    Array.from({ length: totalSquares }).forEach((_, index) => {
      setTimeout(() => {
        setSquares((prev) => [...prev, index + 1])
      }, delay * index)
    })

    // Reset animation state after all squares appear
    setTimeout(() => {
      setIsAnimating(false)
    }, 1500 + 200) // Add a small buffer
  }, [n, colorScheme])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-3xl p-6 space-y-8 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-center">Interactive Math Squares</h1>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <label htmlFor="n-value" className="block text-sm font-medium">
              Number of rows/columns (n): {n}
            </label>
            <Slider
              id="n-value"
              min={1}
              max={10}
              step={1}
              value={[n]}
              onValueChange={(value) => setN(value[0])}
              className="w-full max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="color-scheme" className="block text-sm font-medium">
              Color Scheme
            </label>
            <Select value={colorScheme} onValueChange={(value: keyof typeof colorSchemes) => setColorScheme(value)}>
              <SelectTrigger id="color-scheme" className="w-full max-w-xs">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="indigo">Indigo</SelectItem>
                <SelectItem value="violet">Violet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid container */}
        <div className="flex flex-col items-center space-y-6">
          <div
            className="grid gap-0.5 p-2 bg-gray-100 rounded-lg"
            style={{
              gridTemplateColumns: `repeat(${n}, 1fr)`,
              width: `min(100%, ${n * 60}px)`,
              aspectRatio: "1/1", // Ensure the container itself is square
            }}
          >
            {Array.from({ length: n * n }).map((_, index) => {
              const isVisible = squares.includes(index + 1)
              const colorIndex = Math.min(9, Math.floor((index / (n * n)) * 10))

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center rounded-md cursor-pointer select-none aspect-square" // Add aspect-square to ensure 1:1 ratio
                  style={{
                    backgroundColor: colorSchemes[colorScheme][colorIndex],
                    color: ["yellow", "orange"].includes(colorScheme) ? "#333" : "#fff",
                  }}
                >
                  {isVisible && index + 1}
                </motion.div>
              )
            })}
          </div>

          {/* Math labels */}
          <div className="text-center space-y-1">
            <p className="text-lg font-medium">
              Total squares: n² = {n}² = {n * n}
            </p>
            <p className="text-md">
              √{n * n} = {n}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

