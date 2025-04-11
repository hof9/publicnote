"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { playPlasticButtonSound } from "../../utils/sounds"

export default function NumbersPage() {
  const [filledSquares, setFilledSquares] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isAnimating && filledSquares.length < 5) {
      const timer = setTimeout(() => {
        setFilledSquares(prev => [...prev, filledSquares.length])
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [filledSquares, isAnimating])

  const startAnimation = () => {
    playPlasticButtonSound()
    setFilledSquares([])
    setIsAnimating(true)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Numbers</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg">
          Welcome to the numbers section. Here you can learn about different types of numbers and their properties.
        </p>
     <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Natural Numbers</CardTitle>
          <CardDescription>
            Counting numbers (1, 2, 3, 4, 5, ...)
          </CardDescription>
        </div>
        <button 
          onClick={startAnimation}
          className="w-12 h-12 rounded-full border-2 border-black dark:border-white bg-yellow-500 text-black font-bold flex items-center justify-center hover:bg-yellow-600 transition-colors active:scale-95"
        >
          Go
        </button>
      </CardHeader>
      <CardContent>
      <div className="flex items-left justify-left space-x-2">
        {[1, 2, 3, 4, 5].map((num, index) => (
          <motion.div 
            key={num}
            className="rounded-lg"
            animate={{
              backgroundColor: filledSquares.includes(index) ? "#eab308" : "transparent",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 border-2 border-black dark:border-white rounded-lg flex items-center justify-center text-2xl font-bold">
              {num}
            </div>
          </motion.div>
        ))}
      </div>
      </CardContent>
    </Card>

      </div>
    </div>
  )
}
