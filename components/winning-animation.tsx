"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

export default function WinningAnimation() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Create confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Since particles fall down, start a bit higher than random
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
        shapes: ["circle", "square"],
        scalar: randomInRange(0.9, 1.5),
        particleCount: Math.floor(particleCount),
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  if (!isClient) return null

  return <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}

