"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw } from "lucide-react"

interface AlgorithmsVisualizerProps {
  n: number
}

export default function AlgorithmsVisualizer({ n }: AlgorithmsVisualizerProps) {
  const [algorithm, setAlgorithm] = useState<"factorial" | "fibonacci" | "sorting">("factorial")
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(500) // ms per step
  const [currentStep, setCurrentStep] = useState(0)
  const [maxSteps, setMaxSteps] = useState(0)
  const [sortingArray, setSortingArray] = useState<number[]>([])
  const [sortingSteps, setSortingSteps] = useState<number[][]>([])
  const [fibonacciSteps, setFibonacciSteps] = useState<number[]>([])
  const [factorialSteps, setFactorialSteps] = useState<number[]>([])

  // Calculate factorial steps
  useEffect(() => {
    const steps = [1]
    for (let i = 1; i <= n; i++) {
      steps.push(steps[i - 1] * i)
    }
    setFactorialSteps(steps)
    if (algorithm === "factorial") {
      setMaxSteps(steps.length)
      setCurrentStep(0)
    }
  }, [n, algorithm])

  // Calculate Fibonacci steps
  useEffect(() => {
    const steps = [0, 1]
    for (let i = 2; i <= n + 1; i++) {
      steps.push(steps[i - 1] + steps[i - 2])
    }
    setFibonacciSteps(steps)
    if (algorithm === "fibonacci") {
      setMaxSteps(steps.length)
      setCurrentStep(0)
    }
  }, [n, algorithm])

  // Initialize sorting array
  useEffect(() => {
    if (algorithm === "sorting") {
      // Generate random array
      const array = Array.from({ length: Math.min(n, 10) }, () => Math.floor(Math.random() * 100))
      setSortingArray(array)

      // Generate sorting steps (bubble sort)
      const steps = generateBubbleSortSteps([...array])
      setSortingSteps(steps)
      setMaxSteps(steps.length)
      setCurrentStep(0)
    }
  }, [n, algorithm])

  // Generate bubble sort steps
  const generateBubbleSortSteps = (arr: number[]): number[][] => {
    const steps: number[][] = [[...arr]]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          steps.push([...arr])
        }
      }
    }

    return steps
  }

  // Animation loop
  useEffect(() => {
    if (!isRunning) return

    const timer = setTimeout(() => {
      if (currentStep < maxSteps - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setIsRunning(false)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [isRunning, currentStep, maxSteps, speed])

  // Play/pause animation
  const toggleAnimation = () => {
    setIsRunning(!isRunning)
  }

  // Reset animation
  const resetAnimation = () => {
    setIsRunning(false)
    setCurrentStep(0)
  }

  // Get current factorial value
  const getCurrentFactorialValue = () => {
    return factorialSteps[currentStep] || 0
  }

  // Get current Fibonacci value
  const getCurrentFibonacciValue = () => {
    return fibonacciSteps[currentStep] || 0
  }

  // Get current sorting array
  const getCurrentSortingArray = () => {
    if (!sortingSteps || sortingSteps.length === 0) return sortingArray
    return sortingSteps[currentStep] || sortingArray
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Algorithms</CardTitle>
        <CardDescription>
          Factorials model recursive processes or complexity in computer science, like sorting algorithms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="factorial"
          onValueChange={(value) => setAlgorithm(value as "factorial" | "fibonacci" | "sorting")}
          value={algorithm}
        >
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="factorial">Factorial</TabsTrigger>
            <TabsTrigger value="fibonacci">Fibonacci</TabsTrigger>
            <TabsTrigger value="sorting">Sorting</TabsTrigger>
          </TabsList>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button onClick={toggleAnimation} variant="outline" className="w-24">
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </>
                )}
              </Button>

              <Button onClick={resetAnimation} variant="outline" className="w-24">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>

              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm">Speed:</span>
                <Slider
                  value={[speed]}
                  min={100}
                  max={1000}
                  step={100}
                  onValueChange={(value) => setSpeed(value[0])}
                  className="w-full"
                />
                <span className="text-sm font-mono w-16">{speed}ms</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / (maxSteps - 1)) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-mono w-16">
                {currentStep + 1}/{maxSteps}
              </span>
            </div>

            {algorithm === "factorial" && (
              <div className="space-y-6">
                <div className="p-4 rounded-md bg-gray-100 dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-2">Factorial Algorithm:</h3>
                  <pre className="text-sm bg-gray-200 dark:bg-gray-700 p-3 rounded-md overflow-x-auto">
                    {`function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`}
                  </pre>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-4">
                    {currentStep}! = {getCurrentFactorialValue().toLocaleString()}
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    {Array.from({ length: currentStep + 1 }, (_, i) => i).map((num) => (
                      <div
                        key={num}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold transition-all duration-300"
                        style={{
                          opacity: num === 0 ? 0.5 : 1,
                          transform: `scale(${1 + num * 0.05})`,
                        }}
                      >
                        {num === 0 ? 1 : num}
                      </div>
                    ))}

                    {currentStep > 0 && <div className="text-2xl font-bold">=</div>}

                    <div className="flex items-center justify-center px-3 py-1 rounded-lg bg-purple-700 text-white font-bold">
                      {getCurrentFactorialValue()}
                    </div>
                  </div>

                  <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                    {currentStep}! = {Array.from({ length: currentStep }, (_, i) => currentStep - i).join(" × ")}
                    {currentStep > 0 ? " × " : ""}
                    {1} = {getCurrentFactorialValue()}
                  </div>
                </div>
              </div>
            )}

            {algorithm === "fibonacci" && (
              <div className="space-y-6">
                <div className="p-4 rounded-md bg-gray-100 dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-2">Fibonacci Algorithm:</h3>
                  <pre className="text-sm bg-gray-200 dark:bg-gray-700 p-3 rounded-md overflow-x-auto">
                    {`function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`}
                  </pre>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-4">
                    Fib({currentStep}) = {getCurrentFibonacciValue().toLocaleString()}
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-2xl">
                    {fibonacciSteps.slice(0, currentStep + 1).map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Fib({index})</div>
                        <div
                          className={`flex items-center justify-center rounded-full text-white font-bold transition-all duration-300
                            ${index === currentStep ? "bg-emerald-600" : "bg-emerald-500"}`}
                          style={{
                            width: `${Math.max(30, Math.min(60, value * 3 + 30))}px`,
                            height: `${Math.max(30, Math.min(60, value * 3 + 30))}px`,
                          }}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {currentStep >= 2 && (
                    <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                      Fib({currentStep}) = Fib({currentStep - 1}) + Fib({currentStep - 2}) ={" "}
                      {fibonacciSteps[currentStep - 1]} + {fibonacciSteps[currentStep - 2]} ={" "}
                      {getCurrentFibonacciValue()}
                    </div>
                  )}
                </div>
              </div>
            )}

            {algorithm === "sorting" && (
              <div className="space-y-6">
                <div className="p-4 rounded-md bg-gray-100 dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-2">Bubble Sort Algorithm:</h3>
                  <pre className="text-sm bg-gray-200 dark:bg-gray-700 p-3 rounded-md overflow-x-auto">
                    {`function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  
  return arr;
}`}
                  </pre>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-end justify-center gap-2 h-64 mb-6">
                    {getCurrentSortingArray().map((value, index) => {
                      // Determine if this element was just swapped
                      const isSwapped =
                        currentStep > 0 && sortingSteps[currentStep][index] !== sortingSteps[currentStep - 1][index]

                      return (
                        <div
                          key={index}
                          className={`w-8 rounded-t-md transition-all duration-300 flex items-center justify-center
                            ${isSwapped ? "bg-yellow-500" : "bg-blue-500"}`}
                          style={{ height: `${value * 2 + 20}px` }}
                        >
                          <span className="text-white font-medium text-sm">{value}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                    Bubble sort has a time complexity of O(n²) in the worst case.
                  </div>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
