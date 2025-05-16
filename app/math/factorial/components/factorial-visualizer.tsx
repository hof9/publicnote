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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Factorial Calculator</CardTitle>
          <CardDescription>Adjust the slider to see how factorial values grow exponentially</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">{n}! =</span>
                <span className="text-2xl font-mono">{factorial.toLocaleString()}</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-sm">n:</span>
                <Slider
                  value={[n]}
                  min={1}
                  max={12}
                  step={1}
                  onValueChange={(value) => setN(value[0])}
                  className="w-full"
                />
                <span className="text-sm font-mono w-8">{n}</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: n }, (_, i) => i + 1).map((num, index) => (
                  <div
                    key={num}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold transition-all duration-300"
                    style={{
                      opacity: 1 - index * 0.05,
                      transform: `scale(${1 - index * 0.03})`,
                    }}
                  >
                    {num}
                  </div>
                ))}
                <div className="flex items-center text-xl font-bold mx-2">=</div>
                <div className="flex items-center justify-center px-3 py-1 rounded-lg bg-purple-700 text-white font-bold">
                  {factorial}
                </div>
              </div>
              <div className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
                {n}! = {Array.from({ length: n }, (_, i) => n - i).join(" × ")} = {factorial}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="permutations">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="permutations">Permutations</TabsTrigger>
          <TabsTrigger value="combinations">Combinations</TabsTrigger>
          <TabsTrigger value="probability">Probability</TabsTrigger>
          <TabsTrigger value="taylor">Taylor Series</TabsTrigger>
          <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
        </TabsList>

        <TabsContent value="permutations">
          <PermutationsVisualizer n={n} factorial={factorial} />
        </TabsContent>

        <TabsContent value="combinations">
          <CombinationsVisualizer n={n} />
        </TabsContent>

        <TabsContent value="probability">
          <ProbabilityVisualizer n={n} />
        </TabsContent>

        <TabsContent value="taylor">
          <TaylorSeriesVisualizer />
        </TabsContent>

        <TabsContent value="algorithms">
          <AlgorithmsVisualizer n={n} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
