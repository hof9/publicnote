"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function TaylorSeriesVisualizer() {
  const [x, setX] = useState(1)
  const [terms, setTerms] = useState(5)
  const [selectedFunction, setSelectedFunction] = useState<"exp" | "sin" | "cos">("exp")
  const [chartData, setChartData] = useState<any[]>([])

  // Calculate factorial
  const factorial = (n: number): number => {
    if (n <= 1) return 1
    return n * factorial(n - 1)
  }

  // Calculate Taylor series terms
  const calculateTaylorTerms = (func: "exp" | "sin" | "cos", x: number, terms: number) => {
    const result = []

    for (let n = 0; n <= terms; n++) {
      let term = 0
      let sum = 0

      for (let i = 0; i <= n; i++) {
        switch (func) {
          case "exp":
            term = Math.pow(x, i) / factorial(i)
            break
          case "sin":
            if (i % 2 === 1) {
              term = (Math.pow(-1, (i - 1) / 2) * Math.pow(x, i)) / factorial(i)
            } else {
              term = 0
            }
            break
          case "cos":
            if (i % 2 === 0) {
              term = (Math.pow(-1, i / 2) * Math.pow(x, i)) / factorial(i)
            } else {
              term = 0
            }
            break
        }
        sum += term
      }

      result.push({
        n,
        term,
        sum,
      })
    }

    return result
  }

  // Generate chart data
  const generateChartData = (func: "exp" | "sin" | "cos", terms: number) => {
    const data = []
    const step = 0.2
    const range = 4

    for (let xi = -range; xi <= range; xi += step) {
      const exact = func === "exp" ? Math.exp(xi) : func === "sin" ? Math.sin(xi) : Math.cos(xi)

      const approximation = calculateTaylorApproximation(func, xi, terms)

      data.push({
        x: xi,
        exact,
        approximation,
      })
    }

    return data
  }

  // Calculate Taylor approximation
  const calculateTaylorApproximation = (func: "exp" | "sin" | "cos", x: number, terms: number) => {
    let sum = 0

    for (let i = 0; i <= terms; i++) {
      switch (func) {
        case "exp":
          sum += Math.pow(x, i) / factorial(i)
          break
        case "sin":
          if (i % 2 === 1) {
            sum += (Math.pow(-1, (i - 1) / 2) * Math.pow(x, i)) / factorial(i)
          }
          break
        case "cos":
          if (i % 2 === 0) {
            sum += (Math.pow(-1, i / 2) * Math.pow(x, i)) / factorial(i)
          }
          break
      }
    }

    return sum
  }

  // Update chart data when function or terms change
  useEffect(() => {
    setChartData(generateChartData(selectedFunction, terms))
  }, [selectedFunction, terms])

  // Get Taylor series formula
  const getTaylorFormula = (func: "exp" | "sin" | "cos") => {
    switch (func) {
      case "exp":
        return "e^x = 1 + x + x²/2! + x³/3! + x⁴/4! + ..."
      case "sin":
        return "sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ..."
      case "cos":
        return "cos(x) = 1 - x²/2! + x⁴/4! - x⁶/6! + ..."
    }
  }

  // Get function name
  const getFunctionName = (func: "exp" | "sin" | "cos") => {
    switch (func) {
      case "exp":
        return "e^x"
      case "sin":
        return "sin(x)"
      case "cos":
        return "cos(x)"
    }
  }

  // Calculate exact value
  const calculateExactValue = (func: "exp" | "sin" | "cos", x: number) => {
    switch (func) {
      case "exp":
        return Math.exp(x)
      case "sin":
        return Math.sin(x)
      case "cos":
        return Math.cos(x)
    }
  }

  const taylorTerms = calculateTaylorTerms(selectedFunction, x, terms)
  const exactValue = calculateExactValue(selectedFunction, x)
  const approximation = taylorTerms[terms].sum
  const error = Math.abs(exactValue - approximation)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Taylor Series</CardTitle>
        <CardDescription>
          Factorials appear in series expansions for functions like e^x, sin(x), used in physics and engineering.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="exp"
          onValueChange={(value) => setSelectedFunction(value as "exp" | "sin" | "cos")}
          value={selectedFunction}
        >
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="exp">e^x</TabsTrigger>
            <TabsTrigger value="sin">sin(x)</TabsTrigger>
            <TabsTrigger value="cos">cos(x)</TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Taylor Series Formula:</h3>
                <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-800 text-center">
                  {getTaylorFormula(selectedFunction)}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>x value:</span>
                    <span className="font-mono">{x.toFixed(2)}</span>
                  </div>
                  <Slider value={[x]} min={-3} max={3} step={0.1} onValueChange={(value) => setX(value[0])} />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Number of terms:</span>
                    <span className="font-mono">{terms}</span>
                  </div>
                  <Slider value={[terms]} min={1} max={10} step={1} onValueChange={(value) => setTerms(value[0])} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Exact {getFunctionName(selectedFunction)}:</span>
                  <span className="font-mono">{exactValue.toFixed(8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taylor approximation:</span>
                  <span className="font-mono">{approximation.toFixed(8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Error:</span>
                  <span className="font-mono">{error.toExponential(4)}</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-medium mb-2">Visualization:</h3>
              <div className="h-64">
                <ChartContainer
                  config={{
                    exact: {
                      label: "Exact Function",
                      color: "hsl(var(--chart-1))",
                    },
                    approximation: {
                      label: "Taylor Approximation",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" domain={[-4, 4]} tickFormatter={(value) => value.toFixed(1)} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="exact"
                        stroke="var(--color-exact)"
                        dot={false}
                        name="Exact Function"
                      />
                      <Line
                        type="monotone"
                        dataKey="approximation"
                        stroke="var(--color-approximation)"
                        strokeDasharray="5 5"
                        dot={false}
                        name="Taylor Approximation"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Terms:</h3>
                <div className="max-h-40 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">n</th>
                        <th className="text-left py-2">Term</th>
                        <th className="text-left py-2">Sum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taylorTerms.map((term, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-1">{term.n}</td>
                          <td className="py-1 font-mono">{term.term.toFixed(6)}</td>
                          <td className="py-1 font-mono">{term.sum.toFixed(6)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
