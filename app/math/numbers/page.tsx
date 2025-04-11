"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { playPlasticButtonSound } from "../../utils/sounds"

type NumberType = 'natural' | 'whole' | 'integer' | 'rational' | 'irrational' | 'real'

export default function NumbersPage() {
  const [filledSquares, setFilledSquares] = useState<Record<NumberType, number[]>>({
    natural: [],
    whole: [],
    integer: [],
    rational: [],
    irrational: [],
    real: []
  })
  const [isAnimating, setIsAnimating] = useState<Record<NumberType, boolean>>({
    natural: false,
    whole: false,
    integer: false,
    rational: false,
    irrational: false,
    real: false
  })

  useEffect(() => {
    Object.entries(isAnimating).forEach(([type, animating]) => {
      if (animating && filledSquares[type as NumberType].length < 5) {
        const timer = setTimeout(() => {
          setFilledSquares(prev => ({
            ...prev,
            [type]: [...prev[type as NumberType], prev[type as NumberType].length]
          }))
        }, 1000)
        return () => clearTimeout(timer)
      }
    })
  }, [filledSquares, isAnimating])

  const startAnimation = (type: NumberType) => {
    playPlasticButtonSound()
    setFilledSquares(prev => ({ ...prev, [type]: [] }))
    setIsAnimating(prev => ({ ...prev, [type]: true }))
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Numbers</h1>
      <div className="prose max-w-none">
        {/* <p className="text-lg">
          Welcome to the numbers section. Here you can learn about different types of numbers and their properties.
        </p> */}
     
     {/* Natural Numbers */}
     <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Natural Numbers</CardTitle>
          <CardDescription>
            Counting numbers
          </CardDescription>
        </div>
        <button 
          onClick={() => startAnimation('natural')}
          className="min-w-[48px] w-12 h-12 rounded-full border-2 border-black bg-yellow-500 text-black font-bold flex items-center justify-center hover:bg-yellow-600 transition-colors active:scale-95"
        >
          Go
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 max-w-[400px]">
          {[1, 2, 3, 4, 5].map((num, index) => (
            <motion.div 
              key={num}
              className="rounded-lg"
              animate={{
                backgroundColor: filledSquares.natural.includes(index) ? "#eab308" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-black rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold">
                {num}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
     <div className="mt-6" />

     {/* Whole Numbers */}
     <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Whole Numbers</CardTitle>
          <CardDescription>
            Natural numbers including zero
          </CardDescription>
        </div>
        <button 
          onClick={() => startAnimation('whole')}
          className="min-w-[48px] w-12 h-12 rounded-full border-2 border-black bg-yellow-500 text-black font-bold flex items-center justify-center hover:bg-yellow-600 transition-colors active:scale-95"
        >
          Go
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 max-w-[400px]">
          {[0, 1, 2, 3, 4].map((num, index) => (
            <motion.div 
              key={num}
              className="rounded-lg"
              animate={{
                backgroundColor: filledSquares.whole.includes(index) ? "#eab308" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-black rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold">
                {num}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
    <div className="mt-6" />

    {/* Integers */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Integers</CardTitle>
          <CardDescription>
          Whole numbers and their negatives
          </CardDescription>
        </div>
        <button 
          onClick={() => startAnimation('integer')}
          className="min-w-[48px] w-12 h-12 rounded-full border-2 border-black bg-yellow-500 text-black font-bold flex items-center justify-center hover:bg-yellow-600 transition-colors active:scale-95"
        >
          Go
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 max-w-[400px]">
          {[-2, -1, 0, 1, 2].map((num, index) => (
            <motion.div 
              key={num}
              className="rounded-lg"
              animate={{
                backgroundColor: filledSquares.integer.includes(index) ? "#eab308" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-black rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold">
                {num}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
    <div className="mt-6" />

    {/* Rational Numbers */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Rational Numbers</CardTitle>
          <CardDescription>
            Numbers expressible as fractions
          </CardDescription>
        </div>
        <button 
          onClick={() => startAnimation('rational')}
          className="min-w-[48px] w-12 h-12 rounded-full border-2 border-black bg-yellow-500 text-black font-bold flex items-center justify-center hover:bg-yellow-600 transition-colors active:scale-95"
        >
          Go
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 max-w-[400px]">
          {["½", "¾", "1.5", "-2.25", "0.75"].map((num, index) => (
            <motion.div 
              key={num}
              className="rounded-lg"
              animate={{
                backgroundColor: filledSquares.rational.includes(index) ? "#eab308" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 border-2 border-black rounded-lg flex items-center justify-center ${index >= 2 ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'} font-bold`}>
                {num}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6" />
        <button
          onClick={() => {
            const modal = document.createElement('div')
            modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
            modal.innerHTML = `
              <div class="bg-white rounded-lg p-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div class="flex justify-end mb-4">
                  <button class="text-gray-500 hover:text-gray-700" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div id="rational-visualizer-root"></div>
              </div>
            `
            document.body.appendChild(modal)
            
            const root = document.getElementById('rational-visualizer-root')
            if (root) {
              const visualizer = document.createElement('div')
              visualizer.id = 'rational-number-visualizer'
              root.appendChild(visualizer)
              
              // Dynamically import and render the visualizer
              import('./_components/rational-number-visualizer').then(module => {
                const React = require('react')
                const ReactDOM = require('react-dom')
                ReactDOM.render(React.createElement(module.default), visualizer)
              })
            }
          }}
          className="mt-4 px-4 py-2 bg-yellow-500 text-black border-2 border-black rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Visualization
        </button>
      </CardContent>
    </Card>
    <div className="mt-6" />

    {/* Irrational Numbers */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Irrational Numbers</CardTitle>
          <CardDescription>
            Numbers which cannot be expressed as fractions
          </CardDescription>
        </div>
        <button 
          onClick={() => startAnimation('irrational')}
          className="min-w-[48px] w-12 h-12 rounded-full border-2 border-black bg-yellow-500 text-black font-bold flex items-center justify-center hover:bg-yellow-600 transition-colors active:scale-95"
        >
          Go
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 max-w-[400px]">
          {["π", "√2", "e", "φ", "√3"].map((num, index) => (
            <motion.div 
              key={num}
              className="rounded-lg"
              animate={{
                backgroundColor: filledSquares.irrational.includes(index) ? "#eab308" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-black rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold">
                {num}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6" />
        <button
          onClick={() => {
            const modal = document.createElement('div')
            modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
            modal.innerHTML = `
              <div class="bg-white rounded-lg p-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div class="flex justify-end mb-4">
                  <button class="text-gray-500 hover:text-gray-700" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div id="pi-e-phi-root"></div>
              </div>
            `
            document.body.appendChild(modal)
            
            const root = document.getElementById('pi-e-phi-root')
            if (root) {
              const visualizer = document.createElement('div')
              visualizer.id = 'pi-e-phi'
              root.appendChild(visualizer)
              
              // Dynamically import and render the visualizer
              import('./_components/pi_e_phi').then(module => {
                const React = require('react')
                const ReactDOM = require('react-dom')
                ReactDOM.render(React.createElement(module.default), visualizer)
              })
            }
          }}
          className="mt-4 px-4 py-2 bg-yellow-500 text-black border-2 border-black rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Visualization
        </button>

      </CardContent>
    </Card>
    <div className="mt-6" />

    {/* Real Numbers */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Real Numbers</CardTitle>
          <CardDescription>
            All numbers on the number line, including rational and irrational numbers
          </CardDescription>
        </div>
        <button 
          onClick={() => startAnimation('real')}
          className="min-w-[48px] w-12 h-12 rounded-full border-2 border-black bg-yellow-500 text-black font-bold flex items-center justify-center hover:bg-yellow-600 transition-colors active:scale-95"
        >
          Go
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 max-w-[400px]">
          {["-2", "½", "π", "0", "√2"].map((num, index) => (
            <motion.div 
              key={num}
              className="rounded-lg"
              animate={{
                backgroundColor: filledSquares.real.includes(index) ? "#eab308" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-black rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold">
                {num}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
    <div className="mt-6" />

      </div>
    </div>
  )
}
