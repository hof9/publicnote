"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause, RefreshCw } from "lucide-react"

export default function CountingApp() {
  // State to control which view is shown (home or counting)
  const [view, setView] = useState<"home" | "counting">("home")

  // State for the counting functionality
  const [step, setStep] = useState<1 | 2 | 5 | 10>(1)
  const [currentCount, setCurrentCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000) // milliseconds between counts

  const maxCount = 100

  // Mapping for step names and colors
  const stepName = {
    1: "ones",
    2: "twos",
    5: "fives",
    10: "tens",
  }[step]

  const bgColors = {
    1: "bg-blue-500 dark:bg-blue-600",
    2: "bg-green-500 dark:bg-green-600",
    5: "bg-yellow-500 dark:bg-yellow-600",
    10: "bg-red-500 dark:bg-red-600",
  }[step]

  const lightBgColors = {
    1: "bg-blue-100 dark:bg-blue-950",
    2: "bg-green-100 dark:bg-green-950",
    5: "bg-yellow-100 dark:bg-yellow-950",
    10: "bg-red-100 dark:bg-red-950",
  }[step]

  // Auto-counting effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying && currentCount < maxCount) {
      interval = setInterval(() => {
        setCurrentCount((prev) => {
          const next = prev + step
          return next <= maxCount ? next : maxCount
        })
      }, speed)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentCount, step, speed])

  // Counting control functions
  const handleNext = () => {
    if (currentCount + step <= maxCount) {
      setCurrentCount(currentCount + step)
    }
  }

  const handlePrev = () => {
    if (currentCount - step >= 0) {
      setCurrentCount(currentCount - step)
    }
  }

  const handleReset = () => {
    setCurrentCount(0)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const changeSpeed = () => {
    // Cycle through speeds: 1000ms -> 750ms -> 500ms -> 1000ms
    setSpeed((prev) => (prev === 1000 ? 750 : prev === 750 ? 500 : 1000))
  }

  // Function to start counting with a specific step
  const startCounting = (selectedStep: 1 | 2 | 5 | 10) => {
    setStep(selectedStep)
    setCurrentCount(0)
    setIsPlaying(false)
    setView("counting")
  }

  // Function to go back to home
  const goHome = () => {
    setView("home")
    setIsPlaying(false)
  }

  // Generate numbers for the grid
  const gridNumbers = []
  for (let i = 1; i <= 100; i++) {
    gridNumbers.push(i)
  }

  // HOME VIEW
  if (view === "home") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-primary md:text-5xl dark:text-primary">Count to 100!</h1>
            <p className="mt-2 text-lg text-muted-foreground dark:text-muted-foreground">Learn to count by 1s, 2s, 5s, and 10s</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <button onClick={() => startCounting(1)} className="block text-left">
              <Card className="h-full transition-all hover:shadow-lg dark:bg-card">
                <CardHeader className="bg-blue-100 dark:bg-blue-950 rounded-t-lg">
                  <CardTitle className="text-2xl text-center">Count by 1s</CardTitle>
                  <CardDescription className="text-center">1, 2, 3, 4, 5...</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div
                        key={num}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600 text-xl font-bold text-white"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </button>

            <button onClick={() => startCounting(2)} className="block text-left">
              <Card className="h-full transition-all hover:shadow-lg dark:bg-card">
                <CardHeader className="bg-green-100 dark:bg-green-950 rounded-t-lg">
                  <CardTitle className="text-2xl text-center">Count by 2s</CardTitle>
                  <CardDescription className="text-center">2, 4, 6, 8, 10...</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="grid grid-cols-5 gap-2">
                    {[2, 4, 6, 8, 10].map((num) => (
                      <div
                        key={num}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 dark:bg-green-600 text-xl font-bold text-white"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </button>

            <button onClick={() => startCounting(5)} className="block text-left">
              <Card className="h-full transition-all hover:shadow-lg dark:bg-card">
                <CardHeader className="bg-yellow-100 dark:bg-yellow-950 rounded-t-lg">
                  <CardTitle className="text-2xl text-center">Count by 5s</CardTitle>
                  <CardDescription className="text-center">5, 10, 15, 20, 25...</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="grid grid-cols-5 gap-2">
                    {[5, 10, 15, 20, 25].map((num) => (
                      <div
                        key={num}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 dark:bg-yellow-600 text-xl font-bold text-white"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </button>

            <button onClick={() => startCounting(10)} className="block text-left">
              <Card className="h-full transition-all hover:shadow-lg dark:bg-card">
                <CardHeader className="bg-red-100 dark:bg-red-950 rounded-t-lg">
                  <CardTitle className="text-2xl text-center">Count by 10s</CardTitle>
                  <CardDescription className="text-center">10, 20, 30, 40, 50...</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="grid grid-cols-5 gap-2">
                    {[10, 20, 30, 40, 50].map((num) => (
                      <div
                        key={num}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 dark:bg-red-600 text-xl font-bold text-white"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="mb-4 text-lg">Ready to start counting?</p>
            <Button size="lg" className="text-lg" onClick={() => startCounting(1)}>
              Let&apos;s Begin!
            </Button>
          </div>
        </div>
      </main>
    )
  }

  // COUNTING VIEW
  return (
    <main className={`min-h-screen ${lightBgColors} p-4 md:p-8`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={goHome}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="sr-only">Home</span>
          </Button>
          <h1 className="text-2xl font-bold md:text-3xl">Counting by {stepName}</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        <Card className="mb-6 p-6 text-center dark:bg-card">
          <div className="mb-4">
            <span className="text-6xl font-bold md:text-8xl">{currentCount}</span>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <Button onClick={handlePrev} disabled={currentCount === 0} variant="outline" size="icon">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>

            <Button onClick={togglePlay} variant="outline" size="icon">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            </Button>

            <Button onClick={handleNext} disabled={currentCount === maxCount} variant="outline" size="icon">
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>

            <Button onClick={handleReset} variant="outline" size="icon">
              <RefreshCw className="h-5 w-5" />
              <span className="sr-only">Reset</span>
            </Button>

            <Button onClick={changeSpeed} variant="outline">
              Speed: {speed === 1000 ? "Slow" : speed === 750 ? "Medium" : "Fast"}
            </Button>
          </div>

          <div className="text-lg">
            <p>
              {currentCount === 0
                ? `Let's start counting by ${step}s!`
                : currentCount === maxCount
                  ? `Great job! You counted to ${maxCount} by ${step}s!`
                  : `${currentCount} + ${step} = ${currentCount + step > maxCount ? maxCount : currentCount + step}`}
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-10 gap-2">
          {gridNumbers.map((num) => {
            const isHighlighted = num <= currentCount && num % step === 0
            const isCurrentNumber = num === currentCount

            return (
              <div
                key={num}
                className={`flex h-8 w-full items-center justify-center rounded-md text-sm font-medium transition-all md:h-10 md:text-base
                  ${
                    isCurrentNumber
                      ? `${bgColors} text-white ring-4 ring-offset-2 dark:ring-offset-background`
                      : isHighlighted
                        ? `${bgColors} text-white`
                        : "bg-white dark:bg-card"
                  }`}
              >
                {num}
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          {[1, 2, 5, 10].map((s) => (
            <Button
              key={s}
              variant={s === step ? "default" : "outline"}
              onClick={() => {
                setStep(s as 1 | 2 | 5 | 10)
                setCurrentCount(0)
                setIsPlaying(false)
              }}
            >
              Count by {s}s
            </Button>
          ))}
        </div>
      </div>
    </main>
  )
}

