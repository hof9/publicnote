"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Loader2 } from "lucide-react"
import { analyzeNumber } from "./utils/number-utils"
import NumberPropertiesGuide from "./number-properties-guide"

export default function NumberGrid() {
  const rows = 10
  const cols = 10
  const [grid, setGrid] = useState<boolean[][]>(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(false)),
  )
  const [sum, setSum] = useState(0)
  const [numberProperties, setNumberProperties] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  // Toggle a cell's selection state
  const toggleCell = (row: number, col: number) => {
    const newGrid = [...grid]
    newGrid[row][col] = !newGrid[row][col]
    setGrid(newGrid)
  }

  // Calculate the sum of selected cells
  useEffect(() => {
    let count = 0
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j]) {
          count++
        }
      }
    }
    setSum(count)
    setNumberProperties(analyzeNumber(count))
  }, [grid])

  // Reset the grid
  const resetGrid = () => {
    setGrid(
      Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(false)),
    )
  }

  // Save grid as image
  const saveGridAsImage = async () => {
    if (!gridRef.current) return

    setIsSaving(true)

    try {
      // Dynamically import html2canvas to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default

      const canvas = await html2canvas(gridRef.current, {
        backgroundColor: null,
        scale: 2, // Higher resolution
      })

      // Create a download link
      const link = document.createElement("a")
      link.download = `number-grid-${sum}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error saving grid as image:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="p-4">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Grid Representation</h2>
            <div
              ref={gridRef}
              className="grid gap-1 bg-white p-4 rounded-md"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                width: "100%",
                maxWidth: "500px",
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`aspect-square border cursor-pointer transition-colors duration-200 ${
                      cell ? "bg-green-500 border-green-600" : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                    }`}
                    onClick={() => toggleCell(rowIndex, colIndex)}
                    aria-label={cell ? "Selected cell" : "Unselected cell"}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        toggleCell(rowIndex, colIndex)
                      }
                    }}
                  />
                )),
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveGridAsImage} disabled={isSaving} className="w-full">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Save Grid as Image
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="p-4">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Number Analysis</h2>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold mb-2">{sum}</div>
              <p className="text-gray-500">Total value of selected squares</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Number Properties:</h3>
              <div className="flex flex-wrap gap-2">
                {numberProperties.map((property, index) => (
                  <Badge key={index} variant="secondary">
                    {property}
                  </Badge>
                ))}
              </div>
            </div>

            <Button onClick={resetGrid} className="w-full">
              Reset Grid
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Add the NumberPropertiesGuide component */}
      <NumberPropertiesGuide />
    </div>
  )
}

