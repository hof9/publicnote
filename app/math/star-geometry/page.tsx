"use client"

import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"

export default function StarGeometry() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [points, setPoints] = useState(5)
  const [skipFactor, setSkipFactor] = useState(2)
  const [showLabels, setShowLabels] = useState(true)
  const [showGuides, setShowGuides] = useState({
    radiusLines: false,
    centralAngles: false,
    interiorAngles: false,
    protractor: false,
  })
  const [showOutline, setShowOutline] = useState(false)
  const [showFill, setShowFill] = useState(false)
  const svgRef = useRef(null)

  const radius = 120
  const centerX = 200
  const centerY = 200
  const maxSteps = points * 2 + 2 // Circle + points + connections + final star

  // Calculate star points
  const starPoints = Array.from({ length: points }, (_, i) => {
    const angle = (Math.PI * 2 * i) / points - Math.PI / 2
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      angle,
    }
  })

  // Calculate star connections
  const starConnections = []
  for (let i = 0; i < points; i++) {
    const nextIndex = (i + skipFactor) % points
    starConnections.push({
      from: i,
      to: nextIndex,
    })
  }

  // Calculate interior angles of the star
  const interiorAngles = starPoints.map((point, i) => {
    const prevIndex = (i - skipFactor + points) % points
    const nextIndex = (i + skipFactor) % points

    const prevPoint = starPoints[prevIndex]
    const nextPoint = starPoints[nextIndex]

    // Calculate vectors
    const v1x = prevPoint.x - point.x
    const v1y = prevPoint.y - point.y
    const v2x = nextPoint.x - point.x
    const v2y = nextPoint.y - point.y

    // Calculate angle between vectors
    const dot = v1x * v2x + v1y * v2y
    const det = v1x * v2y - v1y * v2x
    const angle = Math.atan2(det, dot)

    return {
      angle: Math.abs((angle * 180) / Math.PI),
      bisector: {
        x: point.x + 30 * Math.cos(point.angle),
        y: point.y + 30 * Math.sin(point.angle),
      },
    }
  })

  // Animation effect
  useEffect(() => {
    let timer
    if (playing && step < maxSteps) {
      timer = setTimeout(() => {
        setStep((prev) => (prev < maxSteps ? prev + 1 : prev))
        if (step === maxSteps - 1) {
          setPlaying(false)
        }
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [playing, step, maxSteps])

  // Reset animation when points or skip factor changes
  useEffect(() => {
    setStep(0)
    setPlaying(false)
  }, [points, skipFactor])

  const handlePlayPause = () => {
    if (step >= maxSteps) {
      setStep(0)
      setPlaying(true)
    } else {
      setPlaying(!playing)
    }
  }

  const handleReset = () => {
    setStep(0)
    setPlaying(false)
  }

  const handleStepForward = () => {
    if (step < maxSteps) {
      setStep(step + 1)
    }
  }

  const handleStepBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const toggleGuide = (guide) => {
    setShowGuides({
      ...showGuides,
      [guide]: !showGuides[guide],
    })
  }

  // Function to draw an arc for angle measurement
  const drawAngleArc = (cx, cy, radius, startAngle, endAngle, color) => {
    const start = {
      x: cx + radius * Math.cos(startAngle),
      y: cy + radius * Math.sin(startAngle),
    }

    const end = {
      x: cx + radius * Math.cos(endAngle),
      y: cy + radius * Math.sin(endAngle),
    }

    const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
  }

  // Function to export SVG
  const exportSVG = () => {
    if (!svgRef.current) return

    // Clone the SVG element to avoid modifying the displayed one
    const svgElement = svgRef.current.cloneNode(true)

    // Set proper attributes for standalone SVG
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    svgElement.setAttribute("version", "1.1")

    // Get SVG as string
    const svgString = new XMLSerializer().serializeToString(svgElement)

    // Create a blob with the SVG content
    const blob = new Blob([svgString], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    // Create a download link and trigger it
    const downloadLink = document.createElement("a")
    downloadLink.href = url
    downloadLink.download = `star-${points}-points-${skipFactor}-skip.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    // Clean up the URL object
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Geometric Star and Shape Construction</CardTitle>
        <CardDescription>Watch how a {points}-pointed star is constructed using geometric principles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <svg
            ref={svgRef}
            width="400"
            height="400"
            viewBox="0 0 400 400"
            className="border border-gray-200 rounded-lg bg-white"
          >
            {/* Protractor guide */}
            {showGuides.protractor && step >= 1 && (
              <g>
                {/* Protractor circles */}
                <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx={centerX} cy={centerY} r={radius * 0.75} fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                <circle cx={centerX} cy={centerY} r={radius * 0.5} fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                <circle cx={centerX} cy={centerY} r={radius * 0.25} fill="none" stroke="#e2e8f0" strokeWidth="0.5" />

                {/* Angle markers every 30 degrees */}
                {Array.from({ length: 12 }, (_, i) => {
                  const angle = (Math.PI * 2 * i) / 12 - Math.PI / 2
                  const outerX = centerX + (radius + 10) * Math.cos(angle)
                  const outerY = centerY + (radius + 10) * Math.sin(angle)
                  const innerX = centerX + (radius - 5) * Math.cos(angle)
                  const innerY = centerY + (radius - 5) * Math.sin(angle)
                  const textX = centerX + (radius + 25) * Math.cos(angle)
                  const textY = centerY + (radius + 25) * Math.sin(angle)
                  const degrees = (i * 30) % 360

                  return (
                    <g key={`angle-${i}`}>
                      <line x1={innerX} y1={innerY} x2={outerX} y2={outerY} stroke="#94a3b8" strokeWidth="1" />
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#64748b"
                        fontSize="10"
                      >
                        {degrees}°
                      </text>
                    </g>
                  )
                })}

                {/* Angle markers every 10 degrees (shorter lines) */}
                {Array.from({ length: 36 }, (_, i) => {
                  if (i % 3 !== 0) {
                    // Skip the ones we already drew at 30 degree intervals
                    const angle = (Math.PI * 2 * i) / 36 - Math.PI / 2
                    const outerX = centerX + radius * Math.cos(angle)
                    const outerY = centerY + radius * Math.sin(angle)
                    const innerX = centerX + (radius - 5) * Math.cos(angle)
                    const innerY = centerY + (radius - 5) * Math.sin(angle)

                    return (
                      <line
                        key={`minor-angle-${i}`}
                        x1={innerX}
                        y1={innerY}
                        x2={outerX}
                        y2={outerY}
                        stroke="#cbd5e1"
                        strokeWidth="0.5"
                      />
                    )
                  }
                  return null
                })}
              </g>
            )}

            {/* Circle - Step 1 */}
            {step >= 1 && (
              <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray={step === 1 ? "5,5" : "none"}
              />
            )}

            {/* Radius lines */}
            {showGuides.radiusLines &&
              step >= 2 &&
              starPoints.map((point, i) => {
                const pointStep = i + 2
                if (step >= pointStep) {
                  return (
                    <line
                      key={`radius-${i}`}
                      x1={centerX}
                      y1={centerY}
                      x2={point.x}
                      y2={point.y}
                      stroke="#cbd5e1"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                  )
                }
                return null
              })}

            {/* Central angles */}
            {showGuides.centralAngles &&
              step >= 2 &&
              starPoints.map((point, i) => {
                const pointStep = i + 2
                if (step >= pointStep && i > 0) {
                  const prevPoint = starPoints[i - 1]
                  const centralAngle = 360 / points
                  const midAngle = (prevPoint.angle + point.angle) / 2
                  const arcRadius = radius * 0.3
                  const textRadius = radius * 0.4
                  const textX = centerX + textRadius * Math.cos(midAngle)
                  const textY = centerY + textRadius * Math.sin(midAngle)

                  return (
                    <g key={`central-angle-${i}`}>
                      <path
                        d={drawAngleArc(centerX, centerY, arcRadius, prevPoint.angle, point.angle, "#3b82f6")}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                      />
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#3b82f6"
                        fontSize="10"
                      >
                        {centralAngle}°
                      </text>
                    </g>
                  )
                }
                return null
              })}

            {/* Points - Step 2 to points+1 */}
            {starPoints.map((point, i) => {
              const pointStep = i + 2
              if (step >= pointStep) {
                return (
                  <g key={`point-${i}`}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={6}
                      fill={step === pointStep ? "#3b82f6" : "#64748b"}
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    {showLabels && (
                      <text
                        x={point.x + 15 * Math.cos(point.angle)}
                        y={point.y + 15 * Math.sin(point.angle)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#64748b"
                        fontSize="12"
                      >
                        {i + 1}
                      </text>
                    )}
                  </g>
                )
              }
              return null
            })}

            {/* Connections - Step points+2 to 2*points+1 */}
            {starConnections.map((conn, i) => {
              const connectionStep = points + 2 + i
              if (step >= connectionStep) {
                const fromPoint = starPoints[conn.from]
                const toPoint = starPoints[conn.to]
                return (
                  <line
                    key={`conn-${i}`}
                    x1={fromPoint.x}
                    y1={fromPoint.y}
                    x2={toPoint.x}
                    y2={toPoint.y}
                    stroke={step === connectionStep ? "#3b82f6" : "#64748b"}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )
              }
              return null
            })}

            {/* Interior angles */}
            {showGuides.interiorAngles &&
              step >= maxSteps - 1 &&
              starPoints.map((point, i) => {
                const prevIndex = (i - skipFactor + points) % points
                const nextIndex = (i + skipFactor) % points

                const prevPoint = starPoints[prevIndex]
                const nextPoint = starPoints[nextIndex]

                // Calculate vectors for angle bisector
                const v1x = prevPoint.x - point.x
                const v1y = prevPoint.y - point.y
                const v2x = nextPoint.x - point.x
                const v2y = nextPoint.y - point.y

                // Normalize vectors
                const v1Len = Math.sqrt(v1x * v1x + v1y * v1y)
                const v2Len = Math.sqrt(v2x * v2x + v2y * v2y)

                const v1NormX = v1x / v1Len
                const v1NormY = v1y / v1Len
                const v2NormX = v2x / v2Len
                const v2NormY = v2y / v2Len

                // Calculate bisector vector
                const bisectorX = (v1NormX + v2NormX) / 2
                const bisectorY = (v1NormY + v2NormY) / 2

                // Normalize bisector
                const bisectorLen = Math.sqrt(bisectorX * bisectorX + bisectorY * bisectorY)
                const finalBisectorX = bisectorX / bisectorLen
                const finalBisectorY = bisectorY / bisectorLen

                // Calculate arc for angle visualization
                const arcRadius = 25
                const startAngle = Math.atan2(v1y, v1x)
                const endAngle = Math.atan2(v2y, v2x)

                // Calculate text position along bisector
                const textDistance = 40
                const textX = point.x + textDistance * finalBisectorX
                const textY = point.y + textDistance * finalBisectorY

                return (
                  <g key={`interior-angle-${i}`}>
                    <path
                      d={drawAngleArc(point.x, point.y, arcRadius, startAngle, endAngle, "#10b981")}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#10b981"
                      fontSize="10"
                    >
                      {interiorAngles[i].angle.toFixed(1)}°
                    </text>
                  </g>
                )
              })}

            {/* Final star - Step 2*points+2 */}
            {step >= maxSteps && (
              <polygon
                points={starPoints
                  .map((p, i) => {
                    const nextIndex = (i * skipFactor) % points
                    return `${starPoints[nextIndex].x},${starPoints[nextIndex].y}`
                  })
                  .join(" ")}
                fill={showFill ? "rgb(234 179 8)" : "none"}
                stroke={showOutline ? "black" : "#3b82f6"}
                strokeWidth={showOutline ? "3" : "3"}
                strokeLinejoin="round"
              />
            )}

            {/* Center point */}
            {step >= 1 && <circle cx={centerX} cy={centerY} r={4} fill="#64748b" />}
          </svg>

          <div className="w-full mt-6 space-y-6">
            <Tabs defaultValue="parameters" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="guides">Measurement Guides</TabsTrigger>
              </TabsList>

              <TabsContent value="parameters" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Number of Points: {points}</span>
                  </div>
                  <Slider value={[points]} min={3} max={12} step={1} onValueChange={(value) => setPoints(value[0])} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Skip Factor: {skipFactor}</span>
                  </div>
                  <Slider
                    value={[skipFactor]}
                    min={1}
                    max={Math.floor(points / 2)}
                    step={1}
                    onValueChange={(value) => setSkipFactor(value[0])}
                    disabled={points <= 3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setShowLabels(!showLabels)}>
                    {showLabels ? "Hide" : "Show"} Labels
                  </Button>
                  <div className="text-sm text-gray-500">
                    Step: {step}/{maxSteps}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportSVG}
                    disabled={step < maxSteps}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Export SVG
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="guides" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="radiusLines"
                      checked={showGuides.radiusLines}
                      onCheckedChange={() => toggleGuide("radiusLines")}
                    />
                    <label htmlFor="radiusLines" className="text-sm font-medium">
                      Radius Lines
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="centralAngles"
                      checked={showGuides.centralAngles}
                      onCheckedChange={() => toggleGuide("centralAngles")}
                    />
                    <label htmlFor="centralAngles" className="text-sm font-medium">
                      Central Angles ({(360 / points).toFixed(1)}°)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interiorAngles"
                      checked={showGuides.interiorAngles}
                      onCheckedChange={() => toggleGuide("interiorAngles")}
                    />
                    <label htmlFor="interiorAngles" className="text-sm font-medium">
                      Interior Angles
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="protractor"
                      checked={showGuides.protractor}
                      onCheckedChange={() => toggleGuide("protractor")}
                    />
                    <label htmlFor="protractor" className="text-sm font-medium">
                      Protractor Overlay
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="outline" checked={showOutline} onCheckedChange={() => setShowOutline(!showOutline)} />
                    <label htmlFor="outline" className="text-sm font-medium">
                      Black Outline (3px)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="fill" checked={showFill} onCheckedChange={() => setShowFill(!showFill)} />
                    <label htmlFor="fill" className="text-sm font-medium">
                      Yellow Fill
                    </label>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Geometric Properties:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Central Angle: {(360 / points).toFixed(1)}°</li>
                    <li>• Interior Angle: {interiorAngles.length > 0 ? interiorAngles[0].angle.toFixed(1) : 0}°</li>
                    <li>
                      • Regular {points}-gon Angle: {(180 - 360 / points).toFixed(1)}°
                    </li>
                    <li>
                      • Star Density: {skipFactor}/{points}
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleStepBack} disabled={step === 0}>
            Previous
          </Button>
          <Button variant="outline" onClick={handleStepForward} disabled={step >= maxSteps}>
            Next
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handlePlayPause}>{playing ? "Pause" : step >= maxSteps ? "Restart" : "Play"}</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
