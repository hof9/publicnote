"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"

export default function CoterminalAngles() {
  const [originalAngle, setOriginalAngle] = useState(70)
  const [rotations, setRotations] = useState(0)
  const [currentAngle, setCurrentAngle] = useState(originalAngle)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Update current angle when rotations change
  useEffect(() => {
    setCurrentAngle(originalAngle + rotations * 360)
  }, [originalAngle, rotations])

  // Draw the angle visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 30

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw coordinate system
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1

    // Draw x and y axes
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()

    // Draw unit circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = "#94a3b8"
    ctx.stroke()

    // Draw 0° reference line
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + radius, centerY)
    ctx.strokeStyle = "#64748b"
    ctx.stroke()

    // Draw original angle (70°)
    const originalAngleRad = (originalAngle * Math.PI) / 180
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + radius * Math.cos(originalAngleRad), centerY - radius * Math.sin(originalAngleRad))
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw current angle
    const currentAngleRad = (currentAngle * Math.PI) / 180
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + radius * Math.cos(currentAngleRad), centerY - radius * Math.sin(currentAngleRad))
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw arc for the angle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius / 4, 0, originalAngleRad, false)
    ctx.strokeStyle = "#3b82f6"
    ctx.stroke()

    // Add labels
    ctx.font = "14px sans-serif"
    ctx.fillStyle = "#1e293b"

    // Label for 0°
    ctx.fillText("0°", centerX + radius + 5, centerY + 15)

    // Label for 90°
    ctx.fillText("90°", centerX - 15, centerY - radius - 5)

    // Label for 180°
    ctx.fillText("180°", centerX - radius - 30, centerY + 15)

    // Label for 270°
    ctx.fillText("270°", centerX - 15, centerY + radius + 20)

    // Label for original angle
    ctx.fillStyle = "#3b82f6"
    ctx.fillText(
      `${originalAngle}°`,
      centerX + (radius / 2) * Math.cos(originalAngleRad) - 15,
      centerY - (radius / 2) * Math.sin(originalAngleRad) - 10,
    )

    // Label for current angle
    ctx.fillStyle = "#ef4444"
    ctx.fillText(
      `${currentAngle}°`,
      centerX + (radius / 1.5) * Math.cos(currentAngleRad) + 5,
      centerY - (radius / 1.5) * Math.sin(currentAngleRad) + 5,
    )

    // Draw rotation arrows if there are rotations
    if (rotations !== 0) {
      const arcRadius = radius / 2
      const startAngle = 0
      const endAngle = currentAngleRad

      ctx.beginPath()
      ctx.arc(centerX, centerY, arcRadius, startAngle, endAngle, rotations < 0)
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw arrowhead
      const arrowSize = 10
      const arrowAngle = endAngle - (rotations < 0 ? -Math.PI / 8 : Math.PI / 8)
      const arrowX = centerX + arcRadius * Math.cos(arrowAngle)
      const arrowY = centerY - arcRadius * Math.sin(arrowAngle)

      ctx.beginPath()
      ctx.moveTo(arrowX, arrowY)
      ctx.lineTo(
        arrowX + arrowSize * Math.cos(arrowAngle + Math.PI / 2),
        arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 2),
      )
      ctx.lineTo(
        arrowX + arrowSize * Math.cos(arrowAngle - Math.PI / 2),
        arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 2),
      )
      ctx.closePath()
      ctx.fillStyle = "#10b981"
      ctx.fill()
    }
  }, [originalAngle, currentAngle, rotations])

  const handleRotationChange = (newRotations: number) => {
    setRotations(newRotations)
  }

  const resetRotations = () => {
    setRotations(0)
  }

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Coterminal Angles Visualizer</CardTitle>
          <CardDescription>Explore coterminal angles for θ = {originalAngle}°</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <canvas ref={canvasRef} width={400} height={400} className="border rounded-lg bg-white" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="rotations">Rotations: {rotations}</Label>
                <Button variant="outline" size="sm" onClick={resetRotations}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => handleRotationChange(rotations - 1)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Slider
                  id="rotations"
                  min={-3}
                  max={3}
                  step={1}
                  value={[rotations]}
                  onValueChange={(value) => handleRotationChange(value[0])}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" onClick={() => handleRotationChange(rotations + 1)}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="calculation">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculation">Calculation</TabsTrigger>
              <TabsTrigger value="explanation">Explanation</TabsTrigger>
            </TabsList>
            <TabsContent value="calculation" className="space-y-4">
              <div className="p-4 border rounded-lg bg-slate-50">
                <h3 className="font-medium mb-2">Finding Coterminal Angles</h3>
                <div className="space-y-2">
                  <p>Original angle: θ = {originalAngle}°</p>
                  <p>Formula: θ + n × 360° (where n is an integer)</p>
                  <p>
                    Current value: {originalAngle}° + ({rotations} × 360°) = {currentAngle}°
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Positive Coterminal</h3>
                  <p>
                    {originalAngle}° + 360° = {originalAngle + 360}°
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Negative Coterminal</h3>
                  <p>
                    {originalAngle}° - 360° = {originalAngle - 360}°
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="explanation">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">What are Coterminal Angles?</h3>
                <p className="text-sm">
                  Coterminal angles are angles that share the same terminal side when placed in standard position on the
                  coordinate plane. They differ by multiples of 360° (or 2π radians).
                </p>
                <h3 className="font-medium mt-4 mb-2">How to Find Them:</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>For positive coterminal angles: Add 360° (or 2π) to the original angle</li>
                  <li>For negative coterminal angles: Subtract 360° (or 2π) from the original angle</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm">
            <span className="font-medium">Original angle:</span>
            <span className="text-blue-500 ml-1">{originalAngle}°</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Current angle:</span>
            <span className="text-red-500 ml-1">{currentAngle}°</span>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Solution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">For θ = 70°:</h3>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>
                  <span className="font-medium">Positive coterminal angle:</span>
                  <span className="ml-2">70° + 360° = 430°</span>
                </li>
                <li>
                  <span className="font-medium">Negative coterminal angle:</span>
                  <span className="ml-2">70° - 360° = -290°</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm">
                You can find additional coterminal angles by adding or subtracting more multiples of 360°. For example:
                70° + 720° = 790° or 70° - 720° = -650°
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
