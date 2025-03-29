"use client"

import { useState, useEffect } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Circle, Square, Triangle, Star, Heart, Diamond, Trash2, Award, ThumbsUp } from "lucide-react"

// Define the types of items
type Shape = "circle" | "square" | "triangle" | "star" | "heart" | "diamond"
type Color = "red" | "blue" | "green" | "yellow" | "purple" | "orange"
type Size = "small" | "medium" | "large"

interface Item {
  id: string
  shape: Shape
  color: Color
  size: Size
}

interface SortingCriteria {
  type: "color" | "shape" | "size"
  value: Color | Shape | Size
}

// Custom hook to detect mobile devices
const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}

// SortingItem Component
interface SortingItemProps {
  id: string
  shape: string
  color: string
  size: string
}

const SortingItem = ({ id, shape, color, size }: SortingItemProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "SORTING_ITEM",
    item: { id, shape, color, size },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  // Map size to actual dimensions
  const sizeMap = {
    small: "h-12 w-12",
    medium: "h-16 w-16",
    large: "h-20 w-20",
  }

  // Map color names to Tailwind classes
  const colorMap: Record<string, string> = {
    red: "text-red-500",
    blue: "text-blue-500",
    green: "text-green-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
  }

  // Render the appropriate shape with the right color and size
  const renderShape = () => {
    const sizeClass = sizeMap[size as keyof typeof sizeMap]
    const colorClass = colorMap[color]
    const classes = `${sizeClass} ${colorClass}`

    switch (shape) {
      case "circle":
        return <Circle className={classes} />
      case "square":
        return <Square className={classes} />
      case "triangle":
        return <Triangle className={classes} />
      case "star":
        return <Star className={classes} />
      case "heart":
        return <Heart className={classes} />
      case "diamond":
        return <Diamond className={classes} />
      default:
        return <Circle className={classes} />
    }
  }

  return (
    <div
      ref={drag as any}
      className={`flex items-center justify-center p-2 bg-white rounded-lg shadow-md cursor-move transition-transform ${
        isDragging ? "opacity-50" : "opacity-100"
      } hover:scale-105`}
    >
      {renderShape()}
    </div>
  )
}

// SortingBin Component
interface SortingBinProps {
  onDrop: (itemId: string, isCorrectBin: boolean) => void
  criteria: {
    type: "color" | "shape" | "size"
    value: string
  } | null
}

const SortingBin = ({ onDrop, criteria }: SortingBinProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "SORTING_ITEM",
    drop: (item: any) => {
      const isCorrect = checkIfCorrect(item)
      onDrop(item.id, isCorrect)
      return { name: "SortingBin" }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  const checkIfCorrect = (item: any) => {
    if (!criteria) return false

    if (criteria.type === "color") {
      return item.color === criteria.value
    } else if (criteria.type === "shape") {
      return item.shape === criteria.value
    } else if (criteria.type === "size") {
      return item.size === criteria.value
    }

    return false
  }

  const isActive = isOver && canDrop

  return (
    <div
      ref={drop as any}
      className={`w-48 h-48 border-4 rounded-lg flex flex-col items-center justify-center transition-colors ${
        isActive ? "border-primary bg-primary/20" : "border-dashed border-gray-400 bg-gray-100"
      }`}
    >
      <Trash2 className="h-12 w-12 text-gray-500 mb-2" />
      <p className="text-center font-medium">
        {criteria ? (
          <>
            Drop{" "}
            {criteria.type === "color"
              ? criteria.value
              : criteria.type === "shape"
                ? criteria.value + "s"
                : criteria.value + " items"}{" "}
            here
          </>
        ) : (
          "Sorting Bin"
        )}
      </p>
    </div>
  )
}

// Main Page Component
export default function Home() {
  const isMobile = useMobile()
  const [items, setItems] = useState<Item[]>([])
  const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria | null>(null)
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState("Let's start sorting!")
  const [gameState, setGameState] = useState<"intro" | "playing" | "success">("intro")

  // Generate random items for the current level
  useEffect(() => {
    if (gameState === "playing") {
      generateItems()
    }
  }, [level, gameState])

  const generateItems = () => {
    const shapes: Shape[] = ["circle", "square", "triangle", "star", "heart", "diamond"]
    const colors: Color[] = ["red", "blue", "green", "yellow", "purple", "orange"]
    const sizes: Size[] = ["small", "medium", "large"]

    // Determine number of items based on level
    const numItems = Math.min(6 + level, 12)

    // Generate random items
    const newItems: Item[] = []
    for (let i = 0; i < numItems; i++) {
      newItems.push({
        id: `item-${i}`,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: sizes[Math.floor(Math.random() * sizes.length)],
      })
    }

    setItems(newItems)

    // Set sorting criteria based on level
    const criteriaType = level <= 3 ? "color" : level <= 6 ? "shape" : "size"

    // For color sorting
    if (criteriaType === "color") {
      // Find colors that exist in our items
      const availableColors = Array.from(new Set(newItems.map((item) => item.color)))
      setSortingCriteria({
        type: "color",
        value: availableColors[Math.floor(Math.random() * availableColors.length)],
      })
    }
    // For shape sorting
    else if (criteriaType === "shape") {
      const availableShapes = Array.from(new Set(newItems.map((item) => item.shape)))
      setSortingCriteria({
        type: "shape",
        value: availableShapes[Math.floor(Math.random() * availableShapes.length)],
      })
    }
    // For size sorting
    else {
      const availableSizes = Array.from(new Set(newItems.map((item) => item.size)))
      setSortingCriteria({
        type: "size",
        value: availableSizes[Math.floor(Math.random() * availableSizes.length)],
      })
    }
  }

  const handleDrop = (itemId: string, isCorrectBin: boolean) => {
    if (isCorrectBin) {
      setScore(score + 10)
      setMessage("Great job! That's correct! 🎉")

      // Remove the item from the list
      setItems(items.filter((item) => item.id !== itemId))

      // Check if all matching items are sorted
      const remainingMatchingItems = items.filter((item) => {
        if (sortingCriteria?.type === "color") {
          return item.id !== itemId && item.color === sortingCriteria.value
        } else if (sortingCriteria?.type === "shape") {
          return item.id !== itemId && item.shape === sortingCriteria.value
        } else if (sortingCriteria?.type === "size") {
          return item.id !== itemId && item.size === sortingCriteria.value
        }
        return false
      })

      if (remainingMatchingItems.length === 0) {
        // All matching items sorted
        setGameState("success")
        setMessage(`Amazing! You've sorted all the ${sortingCriteria?.value} items!`)
      }
    } else {
      setMessage("Oops! Try again. That doesn't match our sorting rule.")
    }
  }

  const startGame = () => {
    setGameState("playing")
    setMessage(`Sort all the ${sortingCriteria?.value} items into the bin!`)
  }

  const nextLevel = () => {
    setLevel(level + 1)
    setGameState("playing")
  }

  const getCriteriaInstructions = () => {
    if (!sortingCriteria) return ""

    if (level <= 3) {
      return `Find all the ${sortingCriteria.value} items`
    } else if (level <= 6) {
      return `Find all the ${sortingCriteria.value}s`
    } else {
      return `Find all the ${sortingCriteria.value} items`
    }
  }

  // Use a simpler approach for DnD backend
  const backend = isMobile ? TouchBackend : HTML5Backend

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Sorting Adventure</h1>
          <p className="text-lg text-muted-foreground">Learn to sort by color, size, and shape!</p>
        </header>

        <DndProvider backend={backend}>
          <div className="flex flex-col items-center">
            {gameState === "intro" && (
              <Card className="p-6 max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Welcome to Sorting Adventure!</h2>
                <p className="mb-6">
                  Learn to sort items by their color, shape, and size. Drag the matching items to the sorting bin!
                </p>
                <Button
                  size="lg"
                  onClick={() => {
                    setSortingCriteria({
                      type: "color",
                      value: "red",
                    })
                    startGame()
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Start Sorting!
                </Button>
              </Card>
            )}

            {gameState === "playing" && (
              <>
                <div className="flex justify-between w-full mb-4">
                  <div className="bg-white rounded-lg p-2 shadow">
                    <span className="font-bold">Level: {level}</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow">
                    <span className="font-bold">Score: {score}</span>
                  </div>
                </div>

                <Card className="p-4 mb-6 w-full text-center bg-white/90">
                  <h2 className="text-xl font-semibold mb-2">{getCriteriaInstructions()}</h2>
                  <p className="text-muted-foreground">{message}</p>
                </Card>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full">
                  {items.map((item) => (
                    <SortingItem key={item.id} id={item.id} shape={item.shape} color={item.color} size={item.size} />
                  ))}
                </div>

                <SortingBin onDrop={handleDrop} criteria={sortingCriteria} />
              </>
            )}

            {gameState === "success" && (
              <Card className="p-6 max-w-md text-center">
                <div className="flex justify-center mb-4">
                  {level % 3 === 0 ? (
                    <Award className="h-16 w-16 text-yellow-500" />
                  ) : (
                    <Star className="h-16 w-16 text-yellow-500" />
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-2">Level {level} Complete!</h2>
                <p className="mb-6">{message}</p>
                <p className="font-semibold mb-4">Your score: {score}</p>
                <Button size="lg" onClick={nextLevel} className="bg-primary hover:bg-primary/90">
                  Next Level <ThumbsUp className="ml-2 h-5 w-5" />
                </Button>
              </Card>
            )}
          </div>
        </DndProvider>
      </div>
    </main>
  )
}

