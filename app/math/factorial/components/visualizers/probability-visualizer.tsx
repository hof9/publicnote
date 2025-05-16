"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"

interface ProbabilityVisualizerProps {
  n: number
}

export default function ProbabilityVisualizer({ n }: ProbabilityVisualizerProps) {
  const [cardDeck, setCardDeck] = useState<string[]>([])
  const [drawnCards, setDrawnCards] = useState<string[]>([])
  const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([])
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])

  // Calculate factorial
  const factorial = (num: number): number => {
    if (num <= 1) return 1
    return num * factorial(num - 1)
  }

  // Initialize card deck
  const initializeCardDeck = () => {
    const suits = ["♥", "♦", "♣", "♠"]
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    const deck = suits.flatMap((suit) => values.map((value) => `${value}${suit}`))

    // Shuffle the deck
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5)
    setCardDeck(shuffledDeck)
    setDrawnCards([])
  }

  // Draw a card
  const drawCard = () => {
    if (cardDeck.length === 0) return

    const card = cardDeck[0]
    setCardDeck(cardDeck.slice(1))
    setDrawnCards([...drawnCards, card])
  }

  // Reset card deck
  const resetCardDeck = () => {
    initializeCardDeck()
  }

  // Initialize lottery
  const initializeLottery = () => {
    // Generate 6 random numbers between 1 and 49
    const numbers = Array.from({ length: 49 }, (_, i) => i + 1)
    const shuffled = [...numbers].sort(() => Math.random() - 0.5)
    setLotteryNumbers(shuffled.slice(0, 6).sort((a, b) => a - b))
    setSelectedNumbers([])
  }

  // Select a lottery number
  const selectLotteryNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num))
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b))
    }
  }

  // Calculate lottery odds
  const calculateLotteryOdds = () => {
    // 6 numbers from 49: C(49,6) = 49!/(6!*43!)
    return factorial(49) / (factorial(6) * factorial(43))
  }

  // Calculate poker hand odds
  const calculatePokerHandOdds = (hand: string) => {
    const totalHands = factorial(52) / (factorial(5) * factorial(47)) // C(52,5)

    switch (hand) {
      case "royal-flush":
        return 4 / totalHands // 4 possible royal flushes
      case "straight-flush":
        return (36 - 4) / totalHands // 36 straight flushes - 4 royal flushes
      case "four-kind":
        return (((13 * factorial(4)) / factorial(4)) * 48) / totalHands
      case "full-house":
        return (((13 * factorial(4)) / factorial(3)) * 12 * factorial(4)) / factorial(2) / totalHands
      case "flush":
        return (4 * (factorial(13) / (factorial(5) * factorial(8)) - 10)) / totalHands
      case "straight":
        return (10 * 4 ** 5 - 40) / totalHands
      case "three-kind":
        return (
          (((((13 * factorial(4)) / factorial(3)) * factorial(12)) / (factorial(2) * factorial(10))) * 4 ** 2) /
          totalHands
        )
      case "two-pair":
        return ((factorial(13) / (factorial(2) * factorial(11))) * (factorial(4) / factorial(2)) ** 2 * 44) / totalHands
      case "one-pair":
        return (
          (((((13 * factorial(4)) / factorial(2)) * factorial(12)) / (factorial(3) * factorial(9))) * 4 ** 3) /
          totalHands
        )
      default:
        return 0
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Probability</CardTitle>
        <CardDescription>
          Factorials determine probabilities in scenarios like lottery odds or card game outcomes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cards">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="cards">Card Games</TabsTrigger>
            <TabsTrigger value="lottery">Lottery</TabsTrigger>
          </TabsList>

          <TabsContent value="cards">
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <Button onClick={resetCardDeck} className="flex items-center gap-2">
                  <Shuffle className="w-4 h-4" />
                  Shuffle Deck
                </Button>
                <Button onClick={drawCard} disabled={cardDeck.length === 0}>
                  Draw Card
                </Button>
              </div>

              {/* Card visualization */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {drawnCards.map((card, index) => {
                  const value = card.slice(0, -1)
                  const suit = card.slice(-1)
                  const isRed = suit === "♥" || suit === "♦"

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center w-12 h-16 rounded-md bg-white border border-gray-300 shadow-sm"
                    >
                      <div className={`text-sm font-bold ${isRed ? "text-red-600" : "text-black"}`}>{value}</div>
                      <div className={`text-xl ${isRed ? "text-red-600" : "text-black"}`}>{suit}</div>
                    </div>
                  )
                })}

                {drawnCards.length === 0 && (
                  <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                    Shuffle and draw cards to see them here
                  </div>
                )}
              </div>

              {/* Poker hand probabilities */}
              <div className="w-full max-w-md mt-4">
                <h3 className="text-lg font-medium mb-2">Poker Hand Probabilities:</h3>
                <div className="space-y-2">
                  {[
                    { name: "Royal Flush", key: "royal-flush" },
                    { name: "Straight Flush", key: "straight-flush" },
                    { name: "Four of a Kind", key: "four-kind" },
                    { name: "Full House", key: "full-house" },
                    { name: "Flush", key: "flush" },
                    { name: "Straight", key: "straight" },
                    { name: "Three of a Kind", key: "three-kind" },
                    { name: "Two Pair", key: "two-pair" },
                    { name: "One Pair", key: "one-pair" },
                  ].map((hand) => {
                    const probability = calculatePokerHandOdds(hand.key)
                    const odds = Math.round(1 / probability)

                    return (
                      <div key={hand.key} className="flex justify-between items-center">
                        <span>{hand.name}</span>
                        <span className="font-mono">1 in {odds.toLocaleString()}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lottery">
            <div className="flex flex-col items-center">
              <Button onClick={initializeLottery} className="flex items-center gap-2 mb-4">
                <Shuffle className="w-4 h-4" />
                Generate Lottery Numbers
              </Button>

              {/* Lottery visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-center">Winning Numbers:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {lotteryNumbers.map((num) => (
                    <div
                      key={num}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white font-bold"
                    >
                      {num}
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-medium my-4 text-center">Your Selection:</h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {selectedNumbers.map((num) => (
                    <div
                      key={num}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold cursor-pointer"
                      onClick={() => selectLotteryNumber(num)}
                    >
                      {num}
                    </div>
                  ))}

                  {Array.from({ length: 6 - selectedNumbers.length }, (_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed border-gray-300 text-gray-400"
                    >
                      ?
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2 max-w-xs mx-auto">
                  {Array.from({ length: 49 }, (_, i) => i + 1).map((num) => {
                    const isSelected = selectedNumbers.includes(num)
                    const isWinning = lotteryNumbers.includes(num)

                    return (
                      <div
                        key={num}
                        className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer text-sm
                          ${isSelected ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"}
                          ${isWinning && isSelected ? "ring-2 ring-yellow-400" : ""}
                        `}
                        onClick={() => selectLotteryNumber(num)}
                      >
                        {num}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Lottery odds */}
              <div className="w-full max-w-md mt-4">
                <h3 className="text-lg font-medium mb-2">Lottery Odds:</h3>
                <div className="p-4 rounded-md bg-gray-100 dark:bg-gray-800">
                  <div className="text-center mb-2">Odds of matching all 6 numbers:</div>
                  <div className="text-center text-2xl font-bold">1 in {calculateLotteryOdds().toLocaleString()}</div>
                  <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-2">
                    This is calculated using the combination formula: 49!/(6!×43!)
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
