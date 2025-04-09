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
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  // Calculate total value when place values change
  useEffect(() => {
    setTotalValue(hundreds * 100 + tens * 10 + ones)
  }, [hundreds, tens, ones])

  const initializeAudioContext = () => {
    if (!audioInitialized) {
      try {
        // Create audio context with options for iOS compatibility
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
          // Add these options for better iOS compatibility
          sampleRate: 44100,
          latencyHint: 'interactive'
        });
        
        audioContextRef.current = audioContext;
        
        // Create gain node
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.1;
        gainNodeRef.current = gainNode;
        
        // Resume the audio context (important for iOS)
        audioContext.resume().then(() => {
          setAudioInitialized(true);
        });
      } catch (error) {
        console.error('Audio initialization failed:', error);
      }
    }
  }

  const handleAdd = (type: "hundreds" | "tens" | "ones") => {
    // Initialize audio on first interaction
    if (!audioInitialized) {
      initializeAudioContext();
    }
    
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
    // Initialize audio on first interaction
    if (!audioInitialized) {
      initializeAudioContext();
    }
    
    if (type === "hundreds" && hundreds > 0) {
      setHundreds(hundreds - 1)
      playRemoveSound()
    } else if (type === "tens" && tens > 0) {
      setTens(tens - 1)
      playRemoveSound()
    } else if (type === "ones" && ones > 0) {
      setOnes(ones - 1)
      playRemoveSound()
    }
  }

  const resetValues = () => {
    setHundreds(0)
    setTens(0)
    setOnes(0)
  }

  const playSound = () => {
    if (!audioInitialized || !audioContextRef.current || !gainNodeRef.current) return;

    try {
      const audioContext = audioContextRef.current;
      
      // Ensure audio context is running (important for iOS)
      if (audioContext.state !== 'running') {
        audioContext.resume();
      }
      
      // Create main oscillator
      const oscillator = audioContext.createOscillator()
      oscillator.type = 'square' // More classic UI sound
      
      // Create frequency modulation for subtle movement
      const modulator = audioContext.createOscillator()
      modulator.type = 'sine'
      modulator.frequency.setValueAtTime(4, audioContext.currentTime) // Very slow modulation
      
      const modulatorGain = audioContext.createGain()
      modulatorGain.gain.setValueAtTime(10, audioContext.currentTime) // Minimal modulation
      
      // Connect modulation
      modulator.connect(modulatorGain)
      modulatorGain.connect(oscillator.frequency)
      
      // Set base frequency for classic UI blip
      oscillator.frequency.setValueAtTime(250, audioContext.currentTime) // Lower frequency
      
      // Create low-pass filter for dulling
      const filter = audioContext.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(400, audioContext.currentTime) // Much lower cutoff
      filter.Q.setValueAtTime(0.5, audioContext.currentTime) // Reduce resonance
      
      // Create subtle distortion
      const waveshaper = audioContext.createWaveShaper()
      const curve = new Float32Array(65536)
      for (let i = 0; i < 65536; i++) {
        const x = (i - 32768) / 32768
        curve[i] = Math.tanh(x * 0.5) // Subtle soft clipping
      }
      waveshaper.curve = curve
      
      // Create volume envelope
      const gainNode = audioContext.createGain()
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime) // Lower volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2)
      
      // Connect everything with filter and distortion
      oscillator.connect(filter)
      filter.connect(waveshaper)
      waveshaper.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Start and stop
      modulator.start()
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.2)
      modulator.stop(audioContext.currentTime + 0.2)
      
      // Clean up
      oscillator.onended = () => {
        oscillator.disconnect()
        modulator.disconnect()
        modulatorGain.disconnect()
        filter.disconnect()
        waveshaper.disconnect()
        gainNode.disconnect()
      }
    } catch (error) {
      console.error('Sound playback failed:', error)
    }
  }

  const playRemoveSound = () => {
    if (!audioInitialized || !audioContextRef.current || !gainNodeRef.current) return;

    try {
      const audioContext = audioContextRef.current;
      
      // Ensure audio context is running (important for iOS)
      if (audioContext.state !== 'running') {
        audioContext.resume();
      }
      
      // Create main oscillator
      const oscillator = audioContext.createOscillator()
      oscillator.type = 'square' // Classic UI sound
      
      // Create subtle frequency modulation
      const modulator = audioContext.createOscillator()
      modulator.type = 'sine'
      modulator.frequency.setValueAtTime(3, audioContext.currentTime) // Very slow modulation
      
      const modulatorGain = audioContext.createGain()
      modulatorGain.gain.setValueAtTime(8, audioContext.currentTime) // Minimal modulation
      
      // Connect modulation
      modulator.connect(modulatorGain)
      modulatorGain.connect(oscillator.frequency)
      
      // Set frequency for classic UI blip
      oscillator.frequency.setValueAtTime(450, audioContext.currentTime) // Lower frequency
      
      // Create low-pass filter
      const filter = audioContext.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(600, audioContext.currentTime) // Lower cutoff
      filter.Q.setValueAtTime(0.5, audioContext.currentTime) // Reduce resonance
      
      // Create subtle distortion
      const waveshaper = audioContext.createWaveShaper()
      const curve = new Float32Array(65536)
      for (let i = 0; i < 65536; i++) {
        const x = (i - 32768) / 32768
        curve[i] = Math.tanh(x * 0.5) // Subtle soft clipping
      }
      waveshaper.curve = curve
      
      // Create volume envelope
      const gainNode = audioContext.createGain()
      gainNode.gain.setValueAtTime(0.08, audioContext.currentTime) // Lower volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)
      
      // Connect everything with filter and distortion
      oscillator.connect(filter)
      filter.connect(waveshaper)
      waveshaper.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Start and stop
      modulator.start()
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.15)
      modulator.stop(audioContext.currentTime + 0.15)
      
      // Clean up
      oscillator.onended = () => {
        oscillator.disconnect()
        modulator.disconnect()
        modulatorGain.disconnect()
        filter.disconnect()
        waveshaper.disconnect()
        gainNode.disconnect()
      }
    } catch (error) {
      console.error('Sound playback failed:', error)
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
