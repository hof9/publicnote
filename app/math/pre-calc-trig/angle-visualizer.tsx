"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RotateCcw, RotateCw, Calculator, Compass, CornerUpRight } from "lucide-react"
import {
  degreesToRadians,
  radiansToDegrees,
  parseAngleInput,
  formatRadians,
  normalizeAngle,
  findCoterminalAngles,
  findComplementAngle,
  findSupplementAngle,
  findReferenceAngle,
  getQuadrant,
} from "./angle-utils"

export default function AngleVisualizer() {
  // State for angle input and unit
  const [angleInput, setAngleInput] = useState("70")
  const [angleUnit, setAngleUnit] = useState<"degrees" | "radians">("degrees")

  // Parsed angle values
  const [angle, setAngle] = useState(70)
  const [angleInRadians, setAngleInRadians] = useState(degreesToRadians(70))
  const [angleInDegrees, setAngleInDegrees] = useState(70)

  // Canvas reference
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Parse input and update angle values
  useEffect(() => {
    try {
      const parsed = parseAngleInput(angleInput)

      if (parsed.unit === "degrees") {
        setAngleInDegrees(parsed.value)
        setAngleInRadians(degreesToRadians(parsed.value))
      } else {
        setAngleInRadians(parsed.value)
        setAngleInDegrees(radiansToDegrees(parsed.value))
      }

      setAngle(
        parsed.unit === angleUnit
          ? parsed.value
          : angleUnit === "degrees"
            ? radiansToDegrees(parsed.value)
            : degreesToRadians(parsed.value),
      )
    } catch (error) {
      console.error("Error parsing angle:", error)
    }
  }, [angleInput, angleUnit])

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

    // Draw quadrant labels
    ctx.font = "14px sans-serif"
    ctx.fillStyle = "#64748b"
    ctx.fillText("I", centerX + radius / 2, centerY - radius / 2)
    ctx.fillText("II", centerX - radius / 2, centerY - radius / 2)
    ctx.fillText("III", centerX - radius / 2, centerY + radius / 2)
    ctx.fillText("IV", centerX + radius / 2, centerY + radius / 2)

    // Draw angle markers
    const angleMarkers = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]
    ctx.font = "10px sans-serif"

    angleMarkers.forEach((marker) => {
      const markerRad = (marker * Math.PI) / 180
      const markerX = centerX + (radius + 10) * Math.cos(markerRad)
      const markerY = centerY - (radius + 10) * Math.sin(markerRad)

      // Draw tick mark
      ctx.beginPath()
      ctx.moveTo(centerX + radius * 0.95 * Math.cos(markerRad), centerY - radius * 0.95 * Math.sin(markerRad))
      ctx.lineTo(centerX + radius * 1.05 * Math.cos(markerRad), centerY - radius * 1.05 * Math.sin(markerRad))
      ctx.strokeStyle = "#94a3b8"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw label
      ctx.fillStyle = "#64748b"
      ctx.fillText(`${marker}°`, markerX - 8, markerY + 4)
    })

    // Convert angle to radians for drawing
    const angleRad = angleUnit === "radians" ? angle : degreesToRadians(angle)

    // Draw angle line
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + radius * Math.cos(angleRad), centerY - radius * Math.sin(angleRad))
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw arc for the angle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius / 4, 0, angleRad, false)
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw reference angle if different from original
    const refAngleValue = findReferenceAngle(angle, angleUnit)
    const refAngleRad = angleUnit === "radians" ? refAngleValue : degreesToRadians(refAngleValue)

    if (Math.abs(refAngleRad - angleRad) > 0.01) {
      // Determine which quadrant we're in to draw the reference angle correctly
      const quadrant = getQuadrant(angle, angleUnit)
      let refStartAngle = 0

      if (quadrant === 2) refStartAngle = Math.PI
      else if (quadrant === 3) refStartAngle = Math.PI
      else if (quadrant === 4) refStartAngle = 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX +
          radius * 0.7 * Math.cos(refStartAngle + (quadrant === 2 || quadrant === 3 ? refAngleRad : -refAngleRad)),
        centerY -
          radius * 0.7 * Math.sin(refStartAngle + (quadrant === 2 || quadrant === 3 ? refAngleRad : -refAngleRad)),
      )
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 3])
      ctx.stroke()
      ctx.setLineDash([])

      // Label for reference angle
      ctx.fillStyle = "#10b981"
      ctx.font = "12px sans-serif"
      const refLabelX =
        centerX +
        radius * 0.4 * Math.cos(refStartAngle + (quadrant === 2 || quadrant === 3 ? refAngleRad / 2 : -refAngleRad / 2))
      const refLabelY =
        centerY -
        radius * 0.4 * Math.sin(refStartAngle + (quadrant === 2 || quadrant === 3 ? refAngleRad / 2 : -refAngleRad / 2))
      ctx.fillText("ref", refLabelX - 8, refLabelY)
    }

    // Label for angle
    ctx.fillStyle = "#3b82f6"
    ctx.font = "14px sans-serif"
    const labelDistance = radius * 0.7
    const labelX = centerX + labelDistance * Math.cos(angleRad / 2)
    const labelY = centerY - labelDistance * Math.sin(angleRad / 2)

    const displayAngle =
      angleUnit === "degrees"
        ? `${Math.round(normalizeAngle(angle, "degrees"))}°`
        : formatRadians(normalizeAngle(angle, "radians"))

    ctx.fillText(displayAngle, labelX - 15, labelY)

    // Draw terminal point
    ctx.beginPath()
    ctx.arc(centerX + radius * Math.cos(angleRad), centerY - radius * Math.sin(angleRad), 5, 0, 2 * Math.PI)
    ctx.fillStyle = "#3b82f6"
    ctx.fill()
  }, [angle, angleUnit])

  // Handle angle input change
  const handleAngleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAngleInput(e.target.value)
  }

  // Handle unit change
  const handleUnitChange = (value: string) => {
    setAngleUnit(value as "degrees" | "radians")
  }

  // Calculate derived angles
  const normalizedAngle = normalizeAngle(angle, angleUnit)
  const coterminalAngles = findCoterminalAngles(angle, angleUnit)
  const complementAngle = findComplementAngle(normalizedAngle, angleUnit)
  const supplementAngle = findSupplementAngle(normalizedAngle, angleUnit)
  const referenceAngle = findReferenceAngle(angle, angleUnit)
  const quadrant = getQuadrant(angle, angleUnit)

  // Format angle for display
  const formatAngle = (value: number, unit: "degrees" | "radians"): string => {
    if (unit === "degrees") {
      return `${Math.round(value * 100) / 100}°`
    } else {
      return formatRadians(value)
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Explore angles, conversions, and related angles on the unit circle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Visualization */}
            <div className="flex-1 flex flex-col items-center">
              <canvas ref={canvasRef} width={400} height={400} className="border rounded-lg bg-white" />
            </div>

            {/* Right side - Controls */}
            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="angle-input">Enter Angle</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="angle-input"
                      value={angleInput}
                      onChange={handleAngleInputChange}
                      placeholder="e.g., 45, pi/4, 3pi/2"
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={() => setAngleInput("0")}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter values in degrees (e.g., 45) or radians (e.g., pi/4, 3pi/2)
                  </p>
                </div>

                <RadioGroup value={angleUnit} onValueChange={handleUnitChange} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="degrees" id="degrees" />
                    <Label htmlFor="degrees">Degrees</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="radians" id="radians" />
                    <Label htmlFor="radians">Radians</Label>
                  </div>
                </RadioGroup>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm font-medium">In Degrees</div>
                    <div className="text-lg">{Math.round(angleInDegrees * 100) / 100}°</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm font-medium">In Radians</div>
                    <div className="text-lg">{formatRadians(angleInRadians)}</div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="text-sm font-medium">Quadrant</div>
                  <div className="text-lg">Quadrant {quadrant}</div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="coterminal">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="coterminal">
                <RotateCw className="h-4 w-4 mr-2" />
                Coterminal
              </TabsTrigger>
              <TabsTrigger value="complements">
                <CornerUpRight className="h-4 w-4 mr-2" />
                Complements
              </TabsTrigger>
              <TabsTrigger value="reference">
                <Compass className="h-4 w-4 mr-2" />
                Reference
              </TabsTrigger>
              <TabsTrigger value="conversion">
                <Calculator className="h-4 w-4 mr-2" />
                Conversion
              </TabsTrigger>
            </TabsList>

            {/* Coterminal Angles Tab */}
            <TabsContent value="coterminal" className="space-y-4">
              <div className="p-4 border rounded-lg bg-slate-50">
                <h3 className="font-medium mb-2">Coterminal Angles</h3>
                <p className="text-sm mb-4">
                  Coterminal angles are angles that share the same terminal side when placed in standard position. They
                  differ by multiples of 360° (or 2π radians).
                </p>
                <div className="space-y-2">
                  <p>Original angle: {formatAngle(normalizedAngle, angleUnit)}</p>
                  <p>Formula: θ + n × {angleUnit === "degrees" ? "360°" : "2π"} (where n is an integer)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Positive Coterminal</h3>
                  <div className="flex items-center">
                    <div className="flex-1">
                      {formatAngle(normalizedAngle, angleUnit)} + {angleUnit === "degrees" ? "360°" : "2π"} =
                    </div>
                    <div className="font-medium text-blue-600">{formatAngle(coterminalAngles.positive, angleUnit)}</div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Negative Coterminal</h3>
                  <div className="flex items-center">
                    <div className="flex-1">
                      {formatAngle(normalizedAngle, angleUnit)} - {angleUnit === "degrees" ? "360°" : "2π"} =
                    </div>
                    <div className="font-medium text-blue-600">{formatAngle(coterminalAngles.negative, angleUnit)}</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Complements and Supplements Tab */}
            <TabsContent value="complements" className="space-y-4">
              <div className="p-4 border rounded-lg bg-slate-50">
                <h3 className="font-medium mb-2">Complement and Supplement Angles</h3>
                <p className="text-sm mb-2">
                  <strong>Complement:</strong> Two angles are complementary if they add up to 90° (π/2 radians).
                </p>
                <p className="text-sm mb-4">
                  <strong>Supplement:</strong> Two angles are supplementary if they add up to 180° (π radians).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Complement Angle</h3>
                  <div className="flex items-center">
                    <div className="flex-1">
                      {angleUnit === "degrees" ? "90°" : "π/2"} - {formatAngle(normalizedAngle, angleUnit)} =
                    </div>
                    <div className="font-medium text-green-600">{formatAngle(complementAngle, angleUnit)}</div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Supplement Angle</h3>
                  <div className="flex items-center">
                    <div className="flex-1">
                      {angleUnit === "degrees" ? "180°" : "π"} - {formatAngle(normalizedAngle, angleUnit)} =
                    </div>
                    <div className="font-medium text-purple-600">{formatAngle(supplementAngle, angleUnit)}</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reference Angle Tab */}
            <TabsContent value="reference" className="space-y-4">
              <div className="p-4 border rounded-lg bg-slate-50">
                <h3 className="font-medium mb-2">Reference Angle</h3>
                <p className="text-sm mb-4">
                  The reference angle is the acute angle (≤ 90° or π/2) formed by the terminal side of the angle and the
                  x-axis. It's always positive and helps in calculating trigonometric values.
                </p>
                <div className="space-y-2">
                  <p>
                    Original angle: {formatAngle(normalizedAngle, angleUnit)} (Quadrant {quadrant})
                  </p>
                  <p>Reference angle: {formatAngle(referenceAngle, angleUnit)}</p>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">How to Find the Reference Angle</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Quadrant I (0° to 90°):</strong> The reference angle equals the angle itself.
                  </p>
                  <p>
                    <strong>Quadrant II (90° to 180°):</strong> The reference angle equals 180° - angle.
                  </p>
                  <p>
                    <strong>Quadrant III (180° to 270°):</strong> The reference angle equals angle - 180°.
                  </p>
                  <p>
                    <strong>Quadrant IV (270° to 360°):</strong> The reference angle equals 360° - angle.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Conversion Tab */}
            <TabsContent value="conversion" className="space-y-4">
              <div className="p-4 border rounded-lg bg-slate-50">
                <h3 className="font-medium mb-2">Angle Conversion</h3>
                <p className="text-sm mb-4">Convert between degrees and radians using these formulas:</p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Degrees to Radians:</strong> radians = degrees × (π/180)
                  </p>
                  <p>
                    <strong>Radians to Degrees:</strong> degrees = radians × (180/π)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Degrees to Radians</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="flex-1">{Math.round(angleInDegrees * 100) / 100}° × (π/180) =</div>
                      <div className="font-medium text-blue-600">{formatRadians(angleInRadians)}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Radians to Degrees</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="flex-1">{formatRadians(angleInRadians)} × (180/π) =</div>
                      <div className="font-medium text-blue-600">{Math.round(angleInDegrees * 100) / 100}°</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Common Angle Values</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="p-2 bg-slate-50 rounded">30° = π/6</div>
                  <div className="p-2 bg-slate-50 rounded">45° = π/4</div>
                  <div className="p-2 bg-slate-50 rounded">60° = π/3</div>
                  <div className="p-2 bg-slate-50 rounded">90° = π/2</div>
                  <div className="p-2 bg-slate-50 rounded">120° = 2π/3</div>
                  <div className="p-2 bg-slate-50 rounded">135° = 3π/4</div>
                  <div className="p-2 bg-slate-50 rounded">150° = 5π/6</div>
                  <div className="p-2 bg-slate-50 rounded">180° = π</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm">
            <span className="font-medium">Angle:</span>
            <span className="text-blue-500 ml-1">{formatAngle(normalizedAngle, angleUnit)}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Reference:</span>
            <span className="text-green-500 ml-1">{formatAngle(referenceAngle, angleUnit)}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
