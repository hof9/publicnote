"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define circle parts
const circleParts = [
  { id: "circle", name: "Circle", color: "#eab308" },
  { id: "radius", name: "Radius", color: "#eab308" },
  { id: "chord", name: "Chord", color: "#eab308" },
  { id: "diameter", name: "Diameter", color: "#eab308" },
  { id: "secant", name: "Secant", color: "#eab308" },
  { id: "tangent", name: "Tangent", color: "#eab308" },
  { id: "pointOfTangency", name: "Point of Tangency", color: "#eab308" },
  { id: "centralAngle", name: "Central Angle", color: "#eab308" },
  { id: "inscribedAngle", name: "Inscribed Angle", color: "#eab308" },
  { id: "arc", name: "Arc", color: "#eab308" },
  { id: "minorArc", name: "Minor Arc", color: "#eab308" },
  { id: "majorArc", name: "Major Arc", color: "#eab308" },
  { id: "semicircle", name: "Semicircle", color: "#eab308" },
]

export default function CircleExplorer() {
  const [selectedPart, setSelectedPart] = useState(circleParts[0].id)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [definition, setDefinition] = useState("")

  // Get definition for the selected part
  useEffect(() => {
    const definitions: Record<string, string> = {
      circle: "The set of points equidistant from a given point (the center).",
      radius: "A segment with endpoints at the center and on the circle.",
      chord: "A segment with endpoints on the circle.",
      diameter: "A chord that passes through the center. (Diameter = 2·radius)",
      secant: "A line that intersects the circle in two places.",
      tangent: "A line that intersects the circle at exactly one place.",
      pointOfTangency: "The point at which the tangent line intersects the circle.",
      centralAngle: "An angle with a vertex at the center, and two sides that are radii.",
      inscribedAngle: "An angle with a vertex on the circle, and two sides that are chords.",
      arc: "A portion of the edge of the circle defined by two endpoints.",
      minorArc: "An arc with a measure less than 180°.",
      majorArc: "An arc with a measure greater than 180°.",
      semicircle: "An arc with endpoints on the diameter. (Always equal to 180°!)",
    }

    setDefinition(definitions[selectedPart] || "")
  }, [selectedPart])

  // Draw the selected circle part
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    // Ensure square dimensions for proper circle rendering
    const size = Math.min(rect.width, rect.height)
    canvas.width = size * dpr
    canvas.height = size * dpr

    // Set CSS dimensions to match
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Center of the canvas
    const centerX = size / 2
    const centerY = size / 2

    // Radius of the circle
    const radius = Math.min(centerX, centerY) - 40

    // Draw based on selected part
    const selectedColor = circleParts.find((part) => part.id === selectedPart)?.color || "#000000"

    // Helper function to draw a point
    const drawPoint = (x: number, y: number, label: string, color = "#000000", labelOffset = { x: 8, y: 8 }) => {
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      ctx.font = "14px Arial"
      ctx.fillStyle = color
      ctx.fillText(label, x + labelOffset.x, y + labelOffset.y)
    }

    // Always draw the basic circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw center point
    drawPoint(centerX, centerY, "P", "#000000", { x: -15, y: -5 })

    // Draw the selected part
    ctx.strokeStyle = selectedColor
    ctx.fillStyle = selectedColor
    ctx.lineWidth = 3

    switch (selectedPart) {
      case "circle":
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
        break

      case "radius":
        // Draw a radius from center to right edge
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + radius, centerY)
        ctx.stroke()

        // Label the endpoint
        drawPoint(centerX + radius, centerY, "A", selectedColor, { x: 10, y: -5 })
        break

      case "chord":
        // Draw a chord that doesn't pass through center
        const chordY = centerY - radius / 2
        const chordX1 = centerX - Math.sqrt(radius * radius - Math.pow(chordY - centerY, 2))
        const chordX2 = centerX + Math.sqrt(radius * radius - Math.pow(chordY - centerY, 2))

        ctx.beginPath()
        ctx.moveTo(chordX1, chordY)
        ctx.lineTo(chordX2, chordY)
        ctx.stroke()

        // Label the endpoints
        drawPoint(chordX1, chordY, "J", selectedColor, { x: -15, y: -5 })
        drawPoint(chordX2, chordY, "K", selectedColor, { x: 10, y: -5 })
        break

      case "diameter":
        // Draw a diameter (horizontal)
        ctx.beginPath()
        ctx.moveTo(centerX - radius, centerY)
        ctx.lineTo(centerX + radius, centerY)
        ctx.stroke()

        // Label the endpoints
        drawPoint(centerX - radius, centerY, "A", selectedColor, { x: -15, y: -5 })
        drawPoint(centerX + radius, centerY, "B", selectedColor, { x: 10, y: -5 })
        break

      case "secant":
        // Draw a secant line
        const secantOffset = radius / 2

        // Calculate intersection points
        const secantY = centerY + secantOffset
        const secantX1 = centerX - Math.sqrt(radius * radius - Math.pow(secantY - centerY, 2))
        const secantX2 = centerX + Math.sqrt(radius * radius - Math.pow(secantY - centerY, 2))

        // Extend the line beyond the circle
        ctx.beginPath()
        ctx.moveTo(secantX1 - 50, secantY)
        ctx.lineTo(secantX2 + 50, secantY)
        ctx.stroke()

        // Label the intersection points
        drawPoint(secantX1, secantY, "X", selectedColor, { x: -15, y: 15 })
        drawPoint(secantX2, secantY, "Y", selectedColor, { x: 10, y: 15 })
        break

      case "tangent":
        // Draw a tangent line at the right side of the circle
        const tangentX = centerX + radius
        const tangentY = centerY

        ctx.beginPath()
        ctx.moveTo(tangentX, tangentY - 80)
        ctx.lineTo(tangentX, tangentY + 80)
        ctx.stroke()

        // Label the point of tangency
        drawPoint(tangentX, tangentY, "Q", selectedColor, { x: -15, y: 0 })

        // Draw arrows to indicate the line extends
        ctx.beginPath()
        ctx.moveTo(tangentX, tangentY - 80)
        ctx.lineTo(tangentX - 5, tangentY - 70)
        ctx.moveTo(tangentX, tangentY - 80)
        ctx.lineTo(tangentX + 5, tangentY - 70)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(tangentX, tangentY + 80)
        ctx.lineTo(tangentX - 5, tangentY + 70)
        ctx.moveTo(tangentX, tangentY + 80)
        ctx.lineTo(tangentX + 5, tangentY + 70)
        ctx.stroke()
        break

      case "pointOfTangency":
        // Draw a tangent line at the right side of the circle
        const potX = centerX + radius
        const potY = centerY

        // Draw the tangent line (lighter)
        ctx.beginPath()
        ctx.moveTo(potX, potY - 80)
        ctx.lineTo(potX, potY + 80)
        ctx.strokeStyle = "#000000"
        ctx.stroke()

        // Highlight the point of tangency
        ctx.beginPath()
        ctx.arc(potX, potY, 6, 0, Math.PI * 2)
        ctx.fillStyle = selectedColor
        ctx.fill()

        // Label the point
        ctx.font = "14px Arial"
        ctx.fillStyle = selectedColor
        ctx.fillText("Q", potX - 15, potY)
        break

      case "centralAngle":
        // Draw two radii forming an angle
        const centralAngle = Math.PI / 3 // 60 degrees

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + radius * Math.cos(-centralAngle / 2), centerY + radius * Math.sin(-centralAngle / 2))
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + radius * Math.cos(centralAngle / 2), centerY + radius * Math.sin(centralAngle / 2))
        ctx.stroke()

        // Draw the angle arc
        ctx.beginPath()
        ctx.arc(centerX, centerY, 20, -centralAngle / 2, centralAngle / 2)
        ctx.stroke()

        // Label the points
        const pointA = {
          x: centerX + radius * Math.cos(-centralAngle / 2),
          y: centerY + radius * Math.sin(-centralAngle / 2),
        }
        const pointB = {
          x: centerX + radius * Math.cos(centralAngle / 2),
          y: centerY + radius * Math.sin(centralAngle / 2),
        }

        drawPoint(pointA.x, pointA.y, "A", selectedColor, {
          x: pointA.x < centerX ? -15 : 10,
          y: pointA.y < centerY ? -5 : 15,
        })
        drawPoint(pointB.x, pointB.y, "B", selectedColor, {
          x: pointB.x < centerX ? -15 : 10,
          y: pointB.y < centerY ? -5 : 15,
        })

        // Label the angle - position away from the angle
        ctx.font = "14px Arial"
        ctx.fillStyle = selectedColor
        ctx.fillText("∠APB", centerX + 40, centerY + 40)
        break

      case "inscribedAngle":
        // Draw an inscribed angle
        const inscribedAngleVertex = { x: centerX, y: centerY - radius }
        const inscribedAnglePoint1 = { x: centerX - radius, y: centerY }
        const inscribedAnglePoint2 = { x: centerX + radius, y: centerY }

        ctx.beginPath()
        ctx.moveTo(inscribedAngleVertex.x, inscribedAngleVertex.y)
        ctx.lineTo(inscribedAnglePoint1.x, inscribedAnglePoint1.y)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(inscribedAngleVertex.x, inscribedAngleVertex.y)
        ctx.lineTo(inscribedAnglePoint2.x, inscribedAnglePoint2.y)
        ctx.stroke()

        // Label the points
        drawPoint(inscribedAngleVertex.x, inscribedAngleVertex.y, "A", selectedColor, { x: 0, y: -15 })
        drawPoint(inscribedAnglePoint1.x, inscribedAnglePoint1.y, "C", selectedColor, { x: -15, y: 0 })
        drawPoint(inscribedAnglePoint2.x, inscribedAnglePoint2.y, "B", selectedColor, { x: 10, y: 0 })

        // Label the angle - position away from the angle
        ctx.font = "14px Arial"
        ctx.fillStyle = selectedColor
        ctx.fillText("∠ACB", inscribedAngleVertex.x - 40, inscribedAngleVertex.y - 20)
        break

      case "arc":
        // Draw an arc
        const arcAngle = Math.PI / 2 // 90 degrees
        const arcStartAngle = -Math.PI / 4
        const arcEndAngle = arcStartAngle + arcAngle

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, arcStartAngle, arcEndAngle)
        ctx.stroke()

        // Label the endpoints
        const arcPoint1 = {
          x: centerX + radius * Math.cos(arcStartAngle),
          y: centerY + radius * Math.sin(arcStartAngle),
        }
        const arcPoint2 = {
          x: centerX + radius * Math.cos(arcEndAngle),
          y: centerY + radius * Math.sin(arcEndAngle),
        }

        drawPoint(arcPoint1.x, arcPoint1.y, "A", selectedColor, {
          x: arcPoint1.x < centerX ? -15 : 10,
          y: arcPoint1.y < centerY ? -5 : 15,
        })
        drawPoint(arcPoint2.x, arcPoint2.y, "B", selectedColor, {
          x: arcPoint2.x < centerX ? -15 : 10,
          y: arcPoint2.y < centerY ? -5 : 15,
        })
        break

      case "minorArc":
        // Draw a minor arc (less than 180 degrees)
        const minorArcAngle = Math.PI / 3 // 60 degrees
        const minorArcStartAngle = -minorArcAngle / 2
        const minorArcEndAngle = minorArcAngle / 2

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, minorArcStartAngle, minorArcEndAngle)
        ctx.stroke()

        // Label the endpoints
        const minorArcPoint1 = {
          x: centerX + radius * Math.cos(minorArcStartAngle),
          y: centerY + radius * Math.sin(minorArcStartAngle),
        }
        const minorArcPoint2 = {
          x: centerX + radius * Math.cos(minorArcEndAngle),
          y: centerY + radius * Math.sin(minorArcEndAngle),
        }

        drawPoint(minorArcPoint1.x, minorArcPoint1.y, "A", selectedColor, {
          x: minorArcPoint1.x < centerX ? -15 : 10,
          y: minorArcPoint1.y < centerY ? -5 : 15,
        })
        drawPoint(minorArcPoint2.x, minorArcPoint2.y, "B", selectedColor, {
          x: minorArcPoint2.x < centerX ? -15 : 10,
          y: minorArcPoint2.y < centerY ? -5 : 15,
        })

        // Label the arc - position outside the arc
        const minorArcMidAngle = (minorArcStartAngle + minorArcEndAngle) / 2
        const minorArcLabelRadius = radius + 25
        ctx.font = "14px Arial"
        ctx.fillStyle = selectedColor
        ctx.fillText(
          "AB",
          centerX + minorArcLabelRadius * Math.cos(minorArcMidAngle),
          centerY + minorArcLabelRadius * Math.sin(minorArcMidAngle),
        )

        // Add a point C to show it's not used in naming
        drawPoint(centerX, centerY + radius, "C", "#000000", { x: 0, y: 15 })
        break

      case "majorArc":
        // Draw a major arc (greater than 180 degrees)
        const majorArcAngle = (5 * Math.PI) / 3 // 300 degrees
        const majorArcStartAngle = -Math.PI / 6
        const majorArcEndAngle = majorArcStartAngle + majorArcAngle

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, majorArcStartAngle, majorArcEndAngle)
        ctx.stroke()

        // Label the endpoints and a point on the arc
        const majorArcPoint1 = {
          x: centerX + radius * Math.cos(majorArcStartAngle),
          y: centerY + radius * Math.sin(majorArcStartAngle),
        }
        const majorArcPoint2 = {
          x: centerX + radius * Math.cos(majorArcEndAngle),
          y: centerY + radius * Math.sin(majorArcEndAngle),
        }
        const majorArcPoint3 = {
          x: centerX + radius * Math.cos(majorArcStartAngle + majorArcAngle / 2),
          y: centerY + radius * Math.sin(majorArcStartAngle + majorArcAngle / 2),
        }

        drawPoint(majorArcPoint1.x, majorArcPoint1.y, "A", selectedColor, {
          x: majorArcPoint1.x < centerX ? -15 : 10,
          y: majorArcPoint1.y < centerY ? -5 : 15,
        })
        drawPoint(majorArcPoint2.x, majorArcPoint2.y, "B", selectedColor, {
          x: majorArcPoint2.x < centerX ? -15 : 10,
          y: majorArcPoint2.y < centerY ? -5 : 15,
        })
        drawPoint(majorArcPoint3.x, majorArcPoint3.y, "C", selectedColor, {
          x: majorArcPoint3.x < centerX ? -15 : 10,
          y: majorArcPoint3.y < centerY ? -5 : 15,
        })

        // Label the arc - position outside the arc
        const majorArcMidAngle = majorArcStartAngle + majorArcAngle / 2
        const majorArcLabelRadius = radius + 25
        ctx.font = "14px Arial"
        ctx.fillStyle = selectedColor
        ctx.fillText(
          "ACB",
          centerX + majorArcLabelRadius * Math.cos(majorArcMidAngle),
          centerY + majorArcLabelRadius * Math.sin(majorArcMidAngle),
        )
        break

      case "semicircle":
        // Draw a semicircle (above the horizontal diameter)
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, Math.PI, 0, true)
        ctx.stroke()

        // Draw the diameter line
        ctx.beginPath()
        ctx.moveTo(centerX - radius, centerY)
        ctx.lineTo(centerX + radius, centerY)
        ctx.strokeStyle = "#000000"
        ctx.stroke()
        ctx.strokeStyle = selectedColor // Reset stroke style

        // Label the endpoints and center
        drawPoint(centerX - radius, centerY, "J", selectedColor, { x: -15, y: -5 })
        drawPoint(centerX + radius, centerY, "L", selectedColor, { x: 10, y: -5 })

        // Add point K at the bottom of the circle
        drawPoint(centerX, centerY + radius, "K", selectedColor, { x: 0, y: 15 })

        // Position for the JKL label - in the lower right corner of the canvas
        const textWidth = ctx.measureText("JKL").width
        const labelX = size - 40 // Position from right edge
        const labelY = size - 30 // Position from bottom edge

        // Draw the JKL label
        ctx.font = "14px Arial"
        ctx.fillStyle = selectedColor
        ctx.fillText("JKL", labelX - textWidth / 2, labelY)

        // Draw arc symbol centered above the JKL text
        ctx.font = "16px Arial"
        ctx.fillText("⌒", labelX - textWidth / 2, labelY - 10)
        break
    }
  }, [selectedPart])

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <canvas
            ref={canvasRef}
            className="w-full border rounded-md bg-white"
            style={{ aspectRatio: "1/1", maxHeight: "500px", width: "100%" }}
          />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Select a Circle Part:</h3>
          <Select value={selectedPart} onValueChange={setSelectedPart}>
            <SelectTrigger>
              <SelectValue placeholder="Select a part" />
            </SelectTrigger>
            <SelectContent>
              {circleParts.map((part) => (
                <SelectItem key={part.id} value={part.id}>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: part.color }} />
                    {part.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Definition:</h3>
          <div className="p-4 bg-gray-100 rounded-md">
            <p>{definition}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Instructions:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Select a circle part from the dropdown menu</li>
            <li>The selected part will be highlighted in the circle</li>
            <li>Read the definition to understand the concept</li>
            <li>Explore all parts to learn about circle geometry</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
