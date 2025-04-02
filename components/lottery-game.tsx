"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, RefreshCw, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import LotteryBall from "@/components/lottery-ball"
import NumberSelector from "@/components/number-selector"
import WinningAnimation from "@/components/winning-animation"

// Lottery configuration
const MAX_NUMBERS = 6
const NUMBER_RANGE = 49
const DRAW_DELAY = 1000 // ms between each number draw

export default function LotteryGame() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [gameState, setGameState] = useState<"select" | "drawing" | "results">("select")
  const [matchCount, setMatchCount] = useState(0)
  const [showWinAnimation, setShowWinAnimation] = useState(false)

  // Handle number selection
  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num))
    } else if (selectedNumbers.length < MAX_NUMBERS) {
      setSelectedNumbers([...selectedNumbers, num])
    }
  }

  // Generate random quick pick numbers
  const quickPick = () => {
    const numbers: number[] = []
    while (numbers.length < MAX_NUMBERS) {
      const randomNum = Math.floor(Math.random() * NUMBER_RANGE) + 1
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum)
      }
    }
    setSelectedNumbers(numbers.sort((a, b) => a - b))
  }

  // Reset the game
  const resetGame = () => {
    setSelectedNumbers([])
    setDrawnNumbers([])
    setGameState("select")
    setMatchCount(0)
    setShowWinAnimation(false)
  }

  // Start the lottery draw
  const startDraw = () => {
    if (selectedNumbers.length !== MAX_NUMBERS) return

    setGameState("drawing")
    setIsDrawing(true)
    setDrawnNumbers([])

    // Generate winning numbers
    const winningNumbers: number[] = []
    while (winningNumbers.length < MAX_NUMBERS) {
      const randomNum = Math.floor(Math.random() * NUMBER_RANGE) + 1
      if (!winningNumbers.includes(randomNum)) {
        winningNumbers.push(randomNum)
      }
    }

    // Animate drawing the numbers one by one
    winningNumbers.forEach((num, index) => {
      setTimeout(
        () => {
          setDrawnNumbers((prev) => [...prev, num])

          // When all numbers are drawn, calculate results
          if (index === MAX_NUMBERS - 1) {
            setTimeout(() => {
              const matches = selectedNumbers.filter((num) => winningNumbers.includes(num)).length

              setMatchCount(matches)
              setIsDrawing(false)
              setGameState("results")

              if (matches >= 3) {
                setShowWinAnimation(true)
              }
            }, 500)
          }
        },
        DRAW_DELAY * (index + 1),
      )
    })
  }

  // Calculate prize based on match count
  const getPrize = () => {
    switch (matchCount) {
      case 3:
        return "$10"
      case 4:
        return "$100"
      case 5:
        return "$5,000"
      case 6:
        return "$1,000,000"
      default:
        return "$0"
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Lottery Game</span>
          {gameState !== "select" && (
            <Button variant="outline" size="sm" onClick={resetGame}>
              <RefreshCw className="mr-2 h-4 w-4" /> New Game
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {gameState === "select" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Select {MAX_NUMBERS} numbers:</h3>
              <Button variant="outline" size="sm" onClick={quickPick}>
                <Zap className="mr-2 h-4 w-4" /> Quick Pick
              </Button>
            </div>

            <NumberSelector
              range={NUMBER_RANGE}
              selectedNumbers={selectedNumbers}
              toggleNumber={toggleNumber}
              maxSelections={MAX_NUMBERS}
            />

            {selectedNumbers.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Your numbers:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNumbers
                    .sort((a, b) => a - b)
                    .map((num) => (
                      <LotteryBall key={num} number={num} highlighted />
                    ))}
                </div>
              </div>
            )}

            {selectedNumbers.length !== MAX_NUMBERS && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Select your numbers</AlertTitle>
                <AlertDescription>Please select exactly {MAX_NUMBERS} numbers to play.</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {gameState === "drawing" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-center mb-4">Drawing the winning numbers...</h3>

            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-6 gap-4">
                {Array.from({ length: MAX_NUMBERS }).map((_, i) => (
                  <div key={i} className="flex justify-center">
                    {i < drawnNumbers.length ? (
                      <LotteryBall number={drawnNumbers[i]} highlighted animated />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
                        ?
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Your numbers:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedNumbers
                  .sort((a, b) => a - b)
                  .map((num) => (
                    <LotteryBall key={num} number={num} highlighted={false} />
                  ))}
              </div>
            </div>
          </div>
        )}

        {gameState === "results" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-center mb-4">
              {matchCount >= 3 ? "Congratulations!" : "Better luck next time!"}
            </h3>

            {showWinAnimation && <WinningAnimation />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Winning numbers:</h4>
                <div className="flex flex-wrap gap-2">
                  {drawnNumbers.map((num) => (
                    <LotteryBall key={num} number={num} highlighted />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Your numbers:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNumbers
                    .sort((a, b) => a - b)
                    .map((num) => (
                      <LotteryBall key={num} number={num} highlighted={drawnNumbers.includes(num)} />
                    ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <div className="text-center">
                <h4 className="font-medium">Match Summary</h4>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <Badge variant={matchCount > 0 ? "default" : "outline"}>
                    {matchCount} {matchCount === 1 ? "match" : "matches"}
                  </Badge>
                  <span className="text-xl font-bold">{getPrize()}</span>
                </div>

                {matchCount >= 3 && <p className="text-green-600 mt-2 font-medium">You won! Claim your prize!</p>}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {gameState === "select" && (
          <Button className="w-full" disabled={selectedNumbers.length !== MAX_NUMBERS || isDrawing} onClick={startDraw}>
            Play Now
          </Button>
        )}

        {gameState === "results" && (
          <Button className="w-full" onClick={resetGame}>
            Play Again
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

