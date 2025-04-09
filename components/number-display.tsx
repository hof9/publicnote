"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface NumberDisplayProps {
  value: number
  hundreds: number
  tens: number
  ones: number
}

export default function NumberDisplay({ value, hundreds, tens, ones }: NumberDisplayProps) {
  const [prevValue, setPrevValue] = useState(value)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (value !== prevValue) {
      setAnimate(true)
      const timer = setTimeout(() => {
        setAnimate(false)
        setPrevValue(value)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [value, prevValue])

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 w-full max-w-md mb-4 border border-gray-300">
      <h2 className="text-base sm:text-lg font-bold text-center mb-2 text-black">Current Number</h2>
      <motion.div
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-yellow-500"
        animate={animate ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.div>
      <div className="flex justify-center gap-1 mt-2 text-xs sm:text-sm text-gray-700">
        <span>{hundreds} hundreds</span>
        <span>+</span>
        <span>{tens} tens</span>
        <span>+</span>
        <span>{ones} ones</span>
      </div>
      <div className="flex justify-center gap-1 mt-1 text-xs sm:text-sm text-gray-600">
        <span>({hundreds} × 100)</span>
        <span>+</span>
        <span>({tens} × 10)</span>
        <span>+</span>
        <span>({ones} × 1)</span>
      </div>
    </div>
  )
}
