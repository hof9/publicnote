"use client"

import { useState, useEffect, useRef } from "react"
import PlaceValueContainer from "./place-value-container"
import NumberDisplay from "./number-display"

export default function PlaceValueGame() {
  const [hundreds, setHundreds] = useState(0)
  const [tens, setTens] = useState(0)
  const [ones, setOnes] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioInitialized, setAudioInitialized] = useState(false)

  // Calculate total value when place values change
  useEffect(() => {
    setTotalValue(hundreds * 100 + tens * 10 + ones)
  }, [hundreds, tens, ones])

  // Initialize audio after first user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!audioInitialized) {
        // Create and initialize audio element with base64 sound
        const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU4LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAAAAA')
        audio.load()
        audioRef.current = audio
        setAudioInitialized(true)
        
        // Remove event listeners after initialization
        document.removeEventListener('click', handleUserInteraction)
        document.removeEventListener('touchstart', handleUserInteraction)
      }
    }

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [audioInitialized])

  const handleAdd = (type: "hundreds" | "tens" | "ones") => {
    if (type === "hundreds" && hundreds < 9) {
      setHundreds(hundreds + 1)
      playSound()
    } else if (type === "tens" && tens < 9) {
      setTens(tens + 1)
      playSound()
    } else if (type === "ones" && ones < 9) {
      setOnes(ones + 1)
      playSound()
    }
  }

  const handleRemoveStar = (type: "hundreds" | "tens" | "ones") => {
    if (type === "hundreds" && hundreds > 0) {
      setHundreds(hundreds - 1)
      playSound()
    } else if (type === "tens" && tens > 0) {
      setTens(tens - 1)
      playSound()
    } else if (type === "ones" && ones > 0) {
      setOnes(ones - 1)
      playSound()
    }
  }

  const resetValues = () => {
    setHundreds(0)
    setTens(0)
    setOnes(0)
  }

  const playSound = () => {
    if (!audioInitialized || !audioRef.current) return
    
    try {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        // Silently fail - audio is non-essential
      })
    } catch (error) {
      // Silently fail - audio is non-essential
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
      <NumberDisplay value={totalValue} hundreds={hundreds} tens={tens} ones={ones} />

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 my-3 w-full">
        <PlaceValueContainer
          type="hundreds"
          count={hundreds}
          onContainerClick={() => handleAdd("hundreds")}
          onStarClick={() => handleRemoveStar("hundreds")}
          color="bg-white"
          borderColor="border-gray-800"
          label="Hundreds"
          isFull={hundreds >= 9}
        />
        <PlaceValueContainer
          type="tens"
          count={tens}
          onContainerClick={() => handleAdd("tens")}
          onStarClick={() => handleRemoveStar("tens")}
          color="bg-white"
          borderColor="border-gray-600"
          label="Tens"
          isFull={tens >= 9}
        />
        <PlaceValueContainer
          type="ones"
          count={ones}
          onContainerClick={() => handleAdd("ones")}
          onStarClick={() => handleRemoveStar("ones")}
          color="bg-white"
          borderColor="border-gray-400"
          label="Ones"
          isFull={ones >= 9}
        />
      </div>

      <button
        onClick={resetValues}
        className="px-4 py-1.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors mt-2"
      >
        Reset
      </button>
    </div>
  )
}
