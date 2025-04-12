"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, X, Star, Keyboard, MousePointer } from "lucide-react"
import confetti from "canvas-confetti"

type Operation = "addition" | "subtraction" | "multiplication" | "division"
type Level = 1 | 2 | 3 | 4 | 5
type InputMode = "type" | "click"

interface Problem {
  num1: number
  num2: number
  operation: Operation
  answer: number
}

const operationSymbols = {
  addition: "+",
  subtraction: "−",
  multiplication: "×",
  division: "÷",
}

const operationNames = {
  addition: "Addition",
  subtraction: "Subtraction",
  multiplication: "Multiplication",
  division: "Division",
}

export default function MathFlashcards() {
  const [operation, setOperation] = useState<Operation>("addition")
  const [level, setLevel] = useState<Level>(1)
  const [problem, setProblem] = useState<Problem | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [totalProblems, setTotalProblems] = useState(0)
  const [streak, setStreak] = useState(0)
  const [inputMode, setInputMode] = useState<InputMode>("type")
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<number>(0)
  const [placeholderValues, setPlaceholderValues] = useState<string[]>(["", "", ""])
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // Detect mobile/tablet devices
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent)
      setIsMobileDevice(isMobile)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Generate a new problem based on the current operation and level
  const generateProblem = () => {
    let num1: number, num2: number, answer: number

    switch (operation) {
      case "addition":
        num1 = Math.floor(Math.random() * (level * 10)) + 1
        num2 = Math.floor(Math.random() * (level * 10)) + 1
        answer = num1 + num2
        break
      case "subtraction":
        num2 = Math.floor(Math.random() * (level * 5)) + 1
        num1 = num2 + Math.floor(Math.random() * (level * 5)) + 1 // Ensure positive result
        answer = num1 - num2
        break
      case "multiplication":
        num1 = Math.floor(Math.random() * (level * 3)) + 1
        num2 = Math.floor(Math.random() * (level * 2)) + 1
        answer = num1 * num2
        break
      case "division":
        num2 = Math.floor(Math.random() * (level * 2)) + 1
        answer = Math.floor(Math.random() * (level * 2)) + 1
        num1 = num2 * answer // Ensure clean division
        break
    }

    setProblem({ num1, num2, operation, answer })
    setUserAnswer("")
    setIsCorrect(null)
    setPlaceholderValues(["", "", ""])
    setSelectedPlaceholder(0)
    if (inputRef.current && inputMode === "type") {
      inputRef.current.focus()
    }
  }

  // Initialize the first problem
  useEffect(() => {
    generateProblem()
  }, [operation, level])

  // Auto-focus the input field in type mode
  useEffect(() => {
    if (inputRef.current && inputMode === "type") {
      inputRef.current.focus()
    }
  }, [problem, inputMode])

  // Update user answer when placeholder values change
  useEffect(() => {
    if (inputMode === "click") {
      // Construct the answer from the placeholders
      const combinedAnswer = placeholderValues.filter((val) => val !== "").join("")
      setUserAnswer(combinedAnswer)
    }
  }, [placeholderValues, inputMode])

  // Check the user's answer
  const checkAnswer = () => {
    if (!problem) return

    const parsedAnswer = Number.parseInt(userAnswer)
    const correct = !isNaN(parsedAnswer) && parsedAnswer === problem.answer

    setIsCorrect(correct)
    setTotalProblems(totalProblems + 1)

    if (correct) {
      setScore(score + 1)
      setStreak(streak + 1)

      // Trigger confetti for correct answers
      if (streak >= 2) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#000000", "#F7DC6F", "#FFFFFF", "#808080", "#D3D3D3"],
        })
      }

      // Move to next problem after a short delay
      setTimeout(() => {
        generateProblem()
      }, 1000)
    } else {
      setStreak(0)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    checkAnswer()
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAnswer()
    }
  }

  // Change operation
  const handleOperationChange = (newOperation: Operation) => {
    setOperation(newOperation)
    setLevel(1)
    setStreak(0)
  }

  // Handle input mode change
  const handleInputModeChange = (newMode: InputMode) => {
    setInputMode(newMode)
    setPlaceholderValues(["", "", ""])
    setUserAnswer("")
    setSelectedPlaceholder(0)
  }

  // Handle digit click in click mode
  const handleDigitClick = (digit: string) => {
    if (inputMode !== "click" || isCorrect !== null) return

    const newPlaceholderValues = [...placeholderValues]
    newPlaceholderValues[selectedPlaceholder] = digit
    setPlaceholderValues(newPlaceholderValues)

    // Auto-advance to next placeholder if this one is filled
    if (selectedPlaceholder < 2) {
      setSelectedPlaceholder(selectedPlaceholder + 1)
    }
  }

  // Handle placeholder click to select it
  const handlePlaceholderClick = (index: number) => {
    if (inputMode !== "click" || isCorrect !== null) return
    setSelectedPlaceholder(index)
  }

  // Add a digit to the answer
  const addDigitToAnswer = (digit: string) => {
    const newPlaceholderValues = [...placeholderValues]
    // Add the digit to the end of the current answer
    const emptyIndex = newPlaceholderValues.findIndex((val) => val === "")
    if (emptyIndex !== -1) {
      newPlaceholderValues[emptyIndex] = digit
    } else {
      // If all placeholders are filled, replace the last one
      newPlaceholderValues[newPlaceholderValues.length - 1] = digit
    }
    setPlaceholderValues(newPlaceholderValues)
  }

  // Clear a placeholder
  const clearPlaceholder = (index: number) => {
    if (inputMode !== "click" || isCorrect !== null) return
    const newPlaceholderValues = [...placeholderValues]
    newPlaceholderValues[index] = ""
    setPlaceholderValues(newPlaceholderValues)
  }

  // Clear all placeholders
  const clearAllPlaceholders = () => {
    if (inputMode !== "click" || isCorrect !== null) return
    setPlaceholderValues(["", "", ""])
    setSelectedPlaceholder(0)
  }

  // Calculate accuracy percentage
  const accuracy = totalProblems > 0 ? Math.round((score / totalProblems) * 100) : 0

  // Determine how many placeholders to show based on the maximum possible answer
  const getMaxDigits = () => {
    if (!problem) return 3

    let maxPossibleAnswer = 0
    switch (operation) {
      case "addition":
        maxPossibleAnswer = level * 10 * 2
        break
      case "multiplication":
        maxPossibleAnswer = level * 3 * (level * 2)
        break
      default:
        maxPossibleAnswer = level * 10 * 2
    }

    return Math.max(String(problem.answer).length, String(maxPossibleAnswer).length)
  }

  // Get the current answer from placeholders
  const getCurrentClickAnswer = () => {
    // Filter out empty placeholders and join
    return placeholderValues.filter((val) => val !== "").join("")
  }

  // Determine which placeholders to show
  const visiblePlaceholders = getMaxDigits()

  // Get operation display text based on device
  const getOperationText = (op: Operation) => {
    if (isMobileDevice) {
      return operationSymbols[op]
    }
    return operationNames[op]
  }

  // Get level display text based on device
  const getLevelText = (lvl: Level) => {
    if (isMobileDevice) {
      return `L${lvl}`
    }
    return `Level ${lvl}`
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-center text-black">Basic Operations Flashcards</h1>

      {/* Input mode selection */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          onClick={() => handleInputModeChange("type")}
          variant={inputMode === "type" ? "default" : "outline"}
          className={`${inputMode === "type" ? "bg-yellow-400 hover:bg-yellow-500 text-black" : ""}`}
        >
          <Keyboard className="h-4 w-4 mr-2" />
          Type Answer
        </Button>
        <Button
          onClick={() => handleInputModeChange("click")}
          variant={inputMode === "click" ? "default" : "outline"}
          className={`${inputMode === "click" ? "bg-yellow-400 hover:bg-yellow-500 text-black" : ""}`}
        >
          <MousePointer className="h-4 w-4 mr-2" />
          Click Numbers
        </Button>
      </div>

      {/* Operation selection */}
      <div className="flex flex-wrap justify-center gap-2">
        {(["addition", "subtraction", "multiplication", "division"] as Operation[]).map((op) => (
          <Button
            key={op}
            onClick={() => handleOperationChange(op)}
            variant={operation === op ? "default" : "outline"}
            className={`${operation === op ? "bg-yellow-500 hover:bg-yellow-600 text-black" : ""}`}
          >
            {getOperationText(op)}
          </Button>
        ))}
      </div>

      {/* Level selection */}
      <div className="flex flex-wrap justify-center gap-2">
        {([1, 2, 3, 4, 5] as Level[]).map((lvl) => (
          <Button
            key={lvl}
            onClick={() => setLevel(lvl)}
            variant={level === lvl ? "default" : "outline"}
            className={`${level === lvl ? "bg-yellow-400 hover:bg-yellow-500 text-black" : ""}`}
          >
            {getLevelText(lvl)}
          </Button>
        ))}
      </div>

      {/* Stats display */}
      <div className="w-full grid grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-lg p-3 shadow">
          <p className="text-gray-500">Score</p>
          <p className="text-2xl font-bold">{score}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow">
          <p className="text-gray-500">Accuracy</p>
          <p className="text-2xl font-bold">{accuracy}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow">
          <p className="text-gray-500">Streak</p>
          <div className="flex items-center justify-center">
            <p className="text-2xl font-bold">{streak}</p>
            {streak >= 3 && <Star className="h-5 w-5 ml-1 text-yellow-400 fill-yellow-400" />}
          </div>
        </div>
      </div>

      {/* Flashcard */}
      {problem && (
        <Card className="w-full p-8 flex flex-col items-center justify-center shadow-lg bg-white">
          <div className="text-5xl font-bold mb-8 flex items-center justify-center">
            <span>{problem.num1}</span>
            <span className="mx-4">{operationSymbols[problem.operation]}</span>
            <span>{problem.num2}</span>
            <span className="mx-4">=</span>

            {/* Type input mode */}
            {inputMode === "type" && (
              <form onSubmit={handleSubmit} className="inline-flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-24 h-16 text-center text-5xl font-bold border-2 rounded-lg outline-none ${
                    isCorrect === null
                      ? "border-gray-300"
                      : isCorrect
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                  }`}
                  autoFocus
                />
              </form>
            )}

            {/* Click input mode */}
            {inputMode === "click" && (
              <div className="inline-flex items-center">
                <div className="flex">
                  <div
                    className={`min-w-24 h-16 px-4 flex items-center justify-center text-5xl font-bold border-2 rounded-lg ${
                      isCorrect === null
                        ? "border-gray-300"
                        : isCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                    }`}
                  >
                    {getCurrentClickAnswer() || "\u00A0"}
                  </div>
                </div>
              </div>
            )}

            {isCorrect !== null && (
              <span className="ml-4">
                {isCorrect ? <Check className="h-10 w-10 text-green-500" /> : <X className="h-10 w-10 text-red-500" />}
              </span>
            )}
          </div>

          {/* Number pad for click mode */}
          {inputMode === "click" && (
            <div className="mb-6">
              <div className="grid grid-cols-5 gap-2 mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                  <div
                    key={digit}
                    className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-lg cursor-pointer hover:bg-yellow-200 text-2xl font-bold"
                    onClick={() => handleDigitClick(digit.toString())}
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Remove the last digit
                    const newValues = [...placeholderValues]
                    const lastFilledIndex = newValues.map((v) => v !== "").lastIndexOf(true)
                    if (lastFilledIndex !== -1) {
                      newValues[lastFilledIndex] = ""
                      setPlaceholderValues(newValues)
                      setSelectedPlaceholder(lastFilledIndex)
                    }
                  }}
                >
                  Backspace
                </Button>
                <Button variant="outline" size="sm" onClick={clearAllPlaceholders}>
                  Clear All
                </Button>
              </div>
            </div>
          )}

          <Button
            onClick={checkAnswer}
            size="lg"
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black"
            disabled={inputMode === "click" ? !getCurrentClickAnswer() : false}
          >
            Check Answer
          </Button>

          {isCorrect === false && (
            <Button variant="outline" onClick={generateProblem} className="mt-4">
              Next Problem
            </Button>
          )}
        </Card>
      )}

      {/* Progress indicator */}
      <div className="w-full">
        <p className="text-sm text-gray-500 mb-1">Level Progress</p>
        <Progress value={streak * 10} className="h-2" />
      </div>
    </div>
  )
}
