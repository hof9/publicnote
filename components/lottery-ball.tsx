"use client"

import { motion } from "framer-motion"
import { cn } from "./lib/utils"

interface LotteryBallProps {
  number: number
  highlighted?: boolean
  animated?: boolean
}

export default function LotteryBall({ number, highlighted = false, animated = false }: LotteryBallProps) {
  // Generate a consistent color based on the number
  const getColor = () => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"]
    return colors[number % colors.length]
  }

  const ballContent = (
    <div
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md",
        highlighted ? getColor() : "bg-gray-400",
        highlighted && "ring-2 ring-offset-2 ring-opacity-50",
      )}
    >
      {number}
    </div>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {ballContent}
      </motion.div>
    )
  }

  return ballContent
}

