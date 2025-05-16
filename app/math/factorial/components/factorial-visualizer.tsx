"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import PermutationsVisualizer from "./visualizers/permutations-visualizer"
import CombinationsVisualizer from "./visualizers/combinations-visualizer"
import ProbabilityVisualizer from "./visualizers/probability-visualizer"
import TaylorSeriesVisualizer from "./visualizers/taylor-series-visualizer"
import AlgorithmsVisualizer from "./visualizers/algorithms-visualizer"

export default function FactorialVisualizer() {
  const [n, setN] = useState(5)

  // Calculate factorial
  const calculateFactorial = (num: number): number => {
    if (num <= 1) return 1
    return num * calculateFactorial(num - 1)
  }

  const factorial = calculateFactorial(n)

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-xl md:text-2xl">Factorial Calculator</CardTitle>
          <CardDescription className="text-sm">
            Adjust the slider to see how factorial values grow exponentially
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-6">
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 md:gap-4">
                <span className="text-xl md:text-2xl font-bold">{n}! =</span>
                <span className="text-xl md:text-2xl font-mono">{factorial.toLocaleString()}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 md:gap-4">
                <span className="text-xs md:text-sm">n:</span>
                <Slider
                  value={[n]}
                  min={1}
                  max={12}
                  step={1}
                  onValueChange={(value) => setN(value[0])}
                  className="w-full"
                />
                <span className="text-xs md:text-sm font-mono w-6 md:w-8">{n}</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: n }, (_, i) => i + 1).map((num, index) => (
                  <div
                    key={num}
                    className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-600 text-white font-bold transition-all duration-300 text-sm md:text-base"
                    style={{
                      opacity: 1 - index * 0.05,
                      transform: `scale(${1 - index * 0.03})`,
                    }}
                  >
                    {num}
                  </div>
                ))}
                <div className="flex items-center text-lg md:text-xl font-bold mx-2">=</div>
                <div className="flex items-center justify-center px-3 py-1 rounded-lg bg-purple-700 text-white font-bold text-sm md:text-base">
                  {factorial}
                </div>
              </div>
              <div className="text-center mt-2 md:mt-4 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                {n}! = {Array.from({ length: n }, (_, i) => n - i).join(" × ")} = {factorial}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="permutations" className="space-y-4">
        {/* Modified TabsList to wrap on small screens */}
        <div className="overflow-x-auto pb-2">
          <TabsList className="flex w-full min-w-max">
            <TabsTrigger value="permutations" className="text-xs md:text-sm flex-1">
              Permutations
            </TabsTrigger>
            <TabsTrigger value="combinations" className="text-xs md:text-sm flex-1">
              Combinations
            </TabsTrigger>
            <TabsTrigger value="probability" className="text-xs md:text-sm flex-1">
              Probability
            </TabsTrigger>
            <TabsTrigger value="taylor" className="text-xs md:text-sm flex-1">
              Taylor Series
            </TabsTrigger>
            <TabsTrigger value="algorithms" className="text-xs md:text-sm flex-1">
              Algorithms
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="permutations" className="mt-4">
          <PermutationsVisualizer n={n} factorial={factorial} />
        </TabsContent>

        <TabsContent value="combinations" className="mt-4">
          <CombinationsVisualizer n={n} />
        </TabsContent>

        <TabsContent value="probability" className="mt-4">
          <ProbabilityVisualizer n={n} />
        </TabsContent>

        <TabsContent value="taylor" className="mt-4">
          <TaylorSeriesVisualizer />
        </TabsContent>

        <TabsContent value="algorithms" className="mt-4">
          <AlgorithmsVisualizer n={n} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
