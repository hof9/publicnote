"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Home, Play, Pause, RefreshCw } from "lucide-react"

export default function CountPage() {
  const params = useParams()
  const router = useRouter()
  const step = Number.parseInt(params.step as string) || 1

  const [currentCount, setCurrentCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000) // milliseconds between counts

  const maxCount = 100
  const stepName =
    {
      1: "ones",
      2: "twos",
      5: "fives",
      10: "tens",
    }[step] || "ones"

  const bgColors =
    {
      1: "bg-blue-500",
      2: "bg-green-500",
      5: "bg-yellow-500",
      10: "bg-red-500",
    }[step] || "bg-blue-500"

  const lightBgColors =
    {
      1: "bg-blue-100",
      2: "bg-green-100",
      5: "bg-yellow-100",
      10: "bg-red-100",
    }[step] || "bg-blue-100"

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

  // Generate numbers for the grid
  const gridNumbers = []
  for (let i = 1; i <= 100; i++) {
    gridNumbers.push(i)
  }

  return (
    <main className={`min-h-screen ${lightBgColors} p-4 md:p-8`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/annele/count-100">
            <Button variant="outline" size="icon">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold md:text-3xl">Counting by {stepName}</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        <Card className="mb-6 p-6 text-center">
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
                      ? `${bgColors} text-white ring-4 ring-offset-2`
                      : isHighlighted
                        ? `${bgColors} text-white`
                        : "bg-white"
                  }`}
              >
                {num}
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          {[1, 2, 5, 10].map((s) => (
            <Link key={s} href={`/count/${s}`}>
              <Button variant={s === step ? "default" : "outline"} className={s === step ? "" : ""}>
                Count by {s}s
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

