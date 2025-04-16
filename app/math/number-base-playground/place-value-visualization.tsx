"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

type NumberSystem = {
  name: string
  base: number
  label: string
  placeholders: number
}

export default function PlaceValueVisualization() {
  // Number systems with specific placeholder counts
  const numberSystems: NumberSystem[] = [
    { name: "Binary", base: 2, label: "Base-2", placeholders: 8 },
    { name: "Octal", base: 8, label: "Base-8", placeholders: 4 },
    { name: "Decimal", base: 10, label: "Base-10", placeholders: 5 },
    { name: "Base-15", base: 15, label: "Base-15", placeholders: 3 },
    { name: "Hexadecimal", base: 16, label: "Base-16", placeholders: 3 },
    { name: "Sexagesimal", base: 60, label: "Base-60", placeholders: 2 },
  ]

  // State
  const [selectedSystem, setSelectedSystem] = useState<NumberSystem>(numberSystems[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dots, setDots] = useState<{ [key: number]: { id: number; x: number; y: number }[] }>({})
  const [placeValues, setPlaceValues] = useState<number[]>([])
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])

  // Initialize place values based on selected system
  useEffect(() => {
    const values = []
    // Use the placeholders property from the selected system
    const maxPlaces = selectedSystem.placeholders

    for (let i = maxPlaces - 1; i >= 0; i--) {
      values.push(Math.pow(selectedSystem.base, i))
    }
    setPlaceValues(values)

    // Reset dots when changing number systems
    setDots({})

    // Initialize container refs
    containerRefs.current = containerRefs.current.slice(0, values.length)
  }, [selectedSystem])

  // Handle dot placement
  const handlePlaceDot = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRefs.current[index]
    if (!container) return

    // Check if we've already reached the maximum number of dots for this place value
    const currentDots = dots[index]?.length || 0
    if (currentDots >= selectedSystem.base - 1) {
      return // Don't add more dots if we've reached the limit
    }

    const rect = container.getBoundingClientRect()

    // Get click position relative to container
    let x = ((event.clientX - rect.left) / rect.width) * 100
    let y = ((event.clientY - rect.top) / rect.height) * 100

    // Add small random offset for more natural placement
    x += (Math.random() - 0.5) * 5
    y += (Math.random() - 0.5) * 5

    // Constrain to container boundaries with padding
    const padding = 10
    x = Math.max(padding, Math.min(100 - padding, x))
    y = Math.max(padding, Math.min(100 - padding, y))

    // Check if click is within the container bounds
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
      // Check if click is in the center "safe zone" (avoid covering the number)
      const centerX = 50
      const centerY = 50
      const safeZoneRadius = 15 // Smaller safe zone for more freedom

      const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
      if (distanceFromCenter < safeZoneRadius) {
        // If in safe zone, adjust position to be outside of it
        const angle = Math.atan2(y - centerY, x - centerX)
        x = centerX + Math.cos(angle) * (safeZoneRadius + 5)
        y = centerY + Math.sin(angle) * (safeZoneRadius + 5)
      }

      // Add dot with position
      setDots((prevDots) => {
        const newDots = { ...prevDots }
        if (!newDots[index]) {
          newDots[index] = []
        }
        newDots[index].push({
          id: Date.now(),
          x,
          y,
        })
        return newDots
      })
    }
  }

  // Handle dot removal
  const handleRemoveDot = (index: number, dotId: number, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent container click from adding a new dot

    setDots((prevDots) => {
      const newDots = { ...prevDots }
      if (newDots[index]) {
        newDots[index] = newDots[index].filter((dot) => dot.id !== dotId)
        if (newDots[index].length === 0) {
          delete newDots[index]
        }
      }
      return newDots
    })
  }

  // Calculate total value
  const calculateTotal = () => {
    let total = 0
    Object.entries(dots).forEach(([indexStr, dotArray]) => {
      const index = Number.parseInt(indexStr)
      total += dotArray.length * placeValues[index]
    })
    return total
  }

  // Check if place value is at maximum
  const isPlaceValueAtMax = (index: number) => {
    const dotCount = dots[index]?.length || 0
    return dotCount >= selectedSystem.base - 1
  }

  // Calculate value for a specific place
  const calculatePlaceValue = (index: number) => {
    const dotCount = dots[index]?.length || 0
    return dotCount * placeValues[index]
  }

  // Clear all dots
  const handleClear = () => {
    setDots({})
  }

  // Change number system
  const selectNumberSystem = (system: NumberSystem) => {
    setSelectedSystem(system)
    setIsDropdownOpen(false)
  }

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  // Determine grid columns based on number of placeholders
  const getGridColumns = () => {
    const placeholders = selectedSystem.placeholders

    if (placeholders <= 2) return "grid-cols-2"
    if (placeholders <= 3) return "grid-cols-3"
    if (placeholders <= 4) return "grid-cols-4"
    if (placeholders <= 6) return "grid-cols-6"
    return "grid-cols-8"
  }

  // Dot variants for animation
  const dotVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotate: -180,
    },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Number Placeholder Playground</h1>

      <div className="flex justify-between mb-6">
        <div className="relative">
          <div
            className="flex items-center border rounded-md px-4 py-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-xl font-medium mr-2">{selectedSystem.label}</span>
            <ChevronDown className="h-5 w-5 ml-4" />

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-10">
                <div className="py-1">
                  {numberSystems.map((system) => (
                    <button
                      key={system.name}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left font-medium"
                      onClick={() => selectNumberSystem(system)}
                    >
                      {system.name} ({system.label})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Button variant="outline" className="px-6 py-2 rounded-md font-medium text-base" onClick={handleClear}>
          Clear
        </Button>
      </div>

      <div className={`grid ${getGridColumns()} gap-4`}>
        {placeValues.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-gray-50 w-full py-3 mb-2 rounded-md text-center">
              <span className={`text-2xl font-bold ${isPlaceValueAtMax(index) ? "text-orange-500" : ""}`}>
                {dots[index]?.length || 0}
              </span>
            </div>
            <div
              ref={(el) => {
                containerRefs.current[index] = el
              }}
              className={`border-gray-800 border-2 rounded-md w-full h-96 mb-2 bg-white relative overflow-hidden ${
                isPlaceValueAtMax(index) ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={(e) => handlePlaceDot(index, e)}
            >
              <span className="text-gray-200 text-2xl font-bold absolute inset-0 flex items-center justify-center pointer-events-none">
                {formatNumber(value)}
              </span>

              {/* Render dots with Framer Motion */}
              <AnimatePresence>
                {dots[index]?.map((dot) => (
                  <motion.div
                    key={dot.id}
                    className="absolute w-6 h-6 rounded-full border-2 border-black bg-yellow-500 cursor-pointer"
                    style={{
                      left: `${dot.x}%`,
                      top: `${dot.y}%`,
                    }}
                    initial="initial"
                    animate="animate"
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover="hover"
                    whileTap="tap"
                    variants={dotVariants}
                    onClick={(e) => handleRemoveDot(index, dot.id, e)}
                    title="Click to remove"
                  />
                ))}
              </AnimatePresence>
            </div>
            <div className="flex items-center bg-gray-50 w-full rounded-md">
              <div className="text-gray-700 text-2xl font-bold py-3 flex-grow text-center">
                {formatNumber(calculatePlaceValue(index))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 w-full py-4 mt-4 rounded-md text-center">
        <span className="text-2xl font-bold">Total: {formatNumber(calculateTotal())}</span>
      </div>
    </div>
  )
}
