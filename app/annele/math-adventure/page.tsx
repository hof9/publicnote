"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Award, ChevronRight, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

export default function MathAdventure() {
  const [gameState, setGameState] = useState<"start" | "playing" | "result">("start")
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [stars, setStars] = useState(0)
  const [question, setQuestion] = useState({ num1: 0, num2: 0, operator: "+", answer: 0 })
  const [options, setOptions] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)

  // Generate a new math question based on the current level
  const generateQuestion = () => {
    let num1, num2, answer, operator

    // Adjust difficulty based on level
    if (level === 1) {
      // Level 1: Simple addition with numbers 1-10
      num1 = Math.floor(Math.random() * 10) + 1
      num2 = Math.floor(Math.random() * 10) + 1
      operator = "+"
      answer = num1 + num2
    } else if (level === 2) {
      // Level 2: Addition and subtraction with numbers 1-15
      num1 = Math.floor(Math.random() * 15) + 1
      num2 = Math.floor(Math.random() * 15) + 1
      operator = Math.random() > 0.5 ? "+" : "-"

      // Make sure subtraction doesn't result in negative numbers
      if (operator === "-" && num2 > num1) {
        ;[num1, num2] = [num2, num1]
      }

      answer = operator === "+" ? num1 + num2 : num1 - num2
    } else {
      // Level 3: Addition, subtraction, and simple multiplication
      num1 = Math.floor(Math.random() * 20) + 1

      const randomOp = Math.random()
      if (randomOp < 0.4) {
        operator = "+"
        num2 = Math.floor(Math.random() * 20) + 1
        answer = num1 + num2
      } else if (randomOp < 0.8) {
        operator = "-"
        num2 = Math.floor(Math.random() * num1) + 1 // Ensure positive result
        answer = num1 - num2
      } else {
        operator = "×"
        num2 = Math.floor(Math.random() * 5) + 1 // Simple multiplication with small numbers
        answer = num1 * num2
      }
    }

    setQuestion({ num1, num2, operator, answer })

    // Generate answer options (including the correct one)
    const answerOptions = [answer]

    // Generate 3 wrong answers that are close to the correct one
    while (answerOptions.length < 4) {
      let wrongAnswer
      const deviation = Math.floor(Math.random() * 5) + 1

      // 50% chance to add, 50% chance to subtract from correct answer
      if (Math.random() > 0.5) {
        wrongAnswer = answer + deviation
      } else {
        wrongAnswer = Math.max(0, answer - deviation) // Ensure non-negative
      }

      // Make sure we don't add duplicates
      if (!answerOptions.includes(wrongAnswer)) {
        answerOptions.push(wrongAnswer)
      }
    }

    // Shuffle the options
    setOptions(answerOptions.sort(() => Math.random() - 0.5))

    // Reset selected answer and correctness state
    setSelectedAnswer(null)
    setIsCorrect(null)

    // Reset timer
    setTimeLeft(15)
  }

  // Start the game
  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setStars(0)
    setStreak(0)
    setLevel(1)
    setQuestionsAnswered(0)
    generateQuestion()
  }

  // Check the selected answer
  const checkAnswer = (selected: number) => {
    if (selectedAnswer !== null) return // Prevent multiple selections

    setSelectedAnswer(selected)
    const correct = selected === question.answer
    setIsCorrect(correct)

    if (correct) {
      // Play success animation
      triggerConfetti()

      // Update score and streak
      const timeBonus = Math.floor(timeLeft / 3)
      const levelBonus = level
      const newScore = score + 10 + timeBonus + levelBonus
      setScore(newScore)

      const newStreak = streak + 1
      setStreak(newStreak)

      // Award stars based on streak
      if (newStreak % 3 === 0) {
        setStars(stars + 1)
      }
    } else {
      // Reset streak on wrong answer
      setStreak(0)
    }

    // Move to next question after a short delay
    setTimeout(() => {
      setQuestionsAnswered(questionsAnswered + 1)

      // Level up after every 5 correct answers
      if (questionsAnswered > 0 && questionsAnswered % 5 === 0 && level < 3) {
        setLevel(level + 1)
      }

      // End game after 10 questions
      if (questionsAnswered >= 9) {
        setGameState("result")
      } else {
        generateQuestion()
      }
    }, 1500)
  }

  // Trigger confetti animation for correct answers
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (gameState === "playing" && selectedAnswer === null) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time's up, mark as incorrect
            checkAnswer(-1)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [gameState, selectedAnswer])

  // Game Character Component (inline)
  const GameCharacter = ({ emotion }: { emotion: "happy" | "sad" | "excited" | "thinking" }) => {
    // Different expressions based on emotion
    const expressions = {
      happy: {
        eyes: "😊",
        color: "bg-blue-500",
        animation: {
          y: [0, -10, 0],
          transition: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" },
        },
      },
      sad: {
        eyes: "😢",
        color: "bg-blue-400",
        animation: {
          rotate: [-2, 2, -2],
          transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" },
        },
      },
      excited: {
        eyes: "🤩",
        color: "bg-purple-500",
        animation: {
          scale: [1, 1.1, 1],
          y: [0, -15, 0],
          transition: { repeat: Number.POSITIVE_INFINITY, duration: 0.7, ease: "easeInOut" },
        },
      },
      thinking: {
        eyes: "🤔",
        color: "bg-indigo-500",
        animation: {
          rotate: [0, 5, 0, -5, 0],
          transition: { repeat: Number.POSITIVE_INFINITY, duration: 2.5, ease: "easeInOut" },
        },
      },
    }

    const currentExpression = expressions[emotion]

    return (
      <div className="flex justify-center">
        <motion.div animate={currentExpression.animation} className="relative">
          <div
            className={`w-32 h-32 rounded-full ${currentExpression.color} flex items-center justify-center relative overflow-hidden`}
          >
            {/* Character face */}
            <div className="text-4xl">{currentExpression.eyes}</div>

            {/* Character accessories */}
            <div className="absolute top-0 w-full h-8 bg-yellow-300 rounded-t-full"></div>
            <div className="absolute -left-4 -top-2 w-8 h-12 bg-yellow-300 rounded-full transform rotate-45"></div>
            <div className="absolute -right-4 -top-2 w-8 h-12 bg-yellow-300 rounded-full transform -rotate-45"></div>

            {/* Stars floating around character */}
            {emotion === "excited" && (
              <>
                <motion.div
                  className="absolute -top-4 -right-2 text-lg"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [1, 0.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-4 text-lg"
                  animate={{
                    y: [0, 10, 0],
                    opacity: [1, 0.5, 1],
                    rotate: [0, -180, -360],
                  }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5, ease: "easeInOut" }}
                >
                  ✨
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  // Custom Button Component (inline)
  const Button = ({
    children,
    onClick,
    disabled = false,
    variant = "default",
    className = "",
    size = "default",
  }: {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: "default" | "outline" | "destructive"
    className?: string
    size?: "default" | "sm" | "lg"
  }) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

    const variantStyles = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 bg-purple-600 text-white hover:bg-purple-700",
      outline: "border border-input hover:bg-accent hover:text-accent-foreground border-gray-300 hover:bg-gray-100",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 bg-red-600 text-white hover:bg-red-700",
    }

    const sizeStyles = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md text-lg",
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      >
        {children}
      </button>
    )
  }

  // Custom Card Component (inline)
  const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
  }

  // Custom Progress Component (inline)
  const Progress = ({ value = 0, className = "" }: { value?: number; className?: string }) => {
    return (
      <div className={`relative w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
        <div
          className="h-full w-full flex-1 bg-purple-600 transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    )
  }

  // Render different game screens based on state
  if (gameState === "start") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-100 to-blue-100">
        <Card className="w-full max-w-md p-6 text-center bg-white shadow-xl rounded-2xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-purple-600 mb-4">Math Adventure</h1>
            <div className="my-6">
              <GameCharacter emotion="happy" />
            </div>
            <p className="text-lg mb-6">
              Help Cosmo collect stars by solving math problems! Are you ready for an adventure?
            </p>
            <Button
              onClick={startGame}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg"
            >
              Start Adventure <ChevronRight className="ml-2" />
            </Button>
          </motion.div>
        </Card>
      </main>
    )
  }

  if (gameState === "playing") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-100 to-blue-100">
        <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Star className="text-yellow-400 w-6 h-6" />
              <span className="ml-1 font-bold text-lg">{stars}</span>
            </div>
            <div className="px-3 py-1 bg-purple-100 rounded-full text-purple-800 font-medium">Level {level}</div>
            <div className="flex items-center">
              <Award className="text-blue-500 w-6 h-6" />
              <span className="ml-1 font-bold text-lg">{score}</span>
            </div>
          </div>

          <Progress value={(timeLeft / 15) * 100} className="h-2 mb-4" />

          <div className="mb-6">
            <GameCharacter emotion={isCorrect === true ? "excited" : isCorrect === false ? "sad" : "thinking"} />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4">
              {question.num1} {question.operator} {question.num2} = ?
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  disabled={selectedAnswer !== null}
                  variant={
                    selectedAnswer === null
                      ? "outline"
                      : option === question.answer
                        ? "default"
                        : selectedAnswer === option
                          ? "destructive"
                          : "outline"
                  }
                  className={`text-xl py-6 ${
                    selectedAnswer === null
                      ? "hover:bg-purple-100"
                      : option === question.answer
                        ? "bg-green-500 hover:bg-green-500"
                        : selectedAnswer === option
                          ? "bg-red-500 hover:bg-red-500"
                          : ""
                  }`}
                >
                  {option}
                  {selectedAnswer !== null && option === question.answer && <Sparkles className="ml-2 w-4 h-4" />}
                </Button>
              ))}
            </div>
          </div>

          {isCorrect !== null && (
            <div
              className={`text-center p-2 rounded-lg mb-4 ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {isCorrect ? "Great job! That's correct!" : `Oops! The correct answer is ${question.answer}`}
            </div>
          )}

          <div className="text-center text-sm text-gray-500">Question {questionsAnswered + 1} of 10</div>
        </Card>
      </main>
    )
  }

  if (gameState === "result") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-100 to-blue-100">
        <Card className="w-full max-w-md p-6 text-center bg-white shadow-xl rounded-2xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-purple-600 mb-4">Adventure Complete!</h1>

            <div className="my-6">
              <GameCharacter emotion={score > 70 ? "excited" : score > 40 ? "happy" : "thinking"} />
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Your Score: {score}</h2>
              <div className="flex justify-center items-center">
                <Star className="text-yellow-400 w-6 h-6" />
                <span className="ml-1 font-bold text-lg">Stars collected: {stars}</span>
              </div>
            </div>

            <div className="mb-6 p-4 bg-purple-100 rounded-lg">
              <p className="text-purple-800">
                {score > 80
                  ? "Amazing job! You're a math superstar!"
                  : score > 50
                    ? "Great work! You're getting really good at math!"
                    : "Good effort! Keep practicing to become a math master!"}
              </p>
            </div>

            <Button
              onClick={startGame}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg"
            >
              Play Again <ChevronRight className="ml-2" />
            </Button>
          </motion.div>
        </Card>
      </main>
    )
  }

  return null
}

