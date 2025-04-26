"use client"

import React, { useState, useRef, useEffect } from "react"
import { X, Trash2, Plus, Minus, Move } from "lucide-react"

// Types
type Point = { x: number; y: number }
type DraggingState = { index: number; active: boolean } | null

export default function PicksTheoremVisualizer() {
  const [vertices, setVertices] = useState<Point[]>([])
  const [dragging, setDragging] = useState<DraggingState>(null)
  const [draggingBoundary, setDraggingBoundary] = useState<{
    point: Point
    active: boolean
    segmentIndex: number
  } | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [boundaryPoints, setBoundaryPoints] = useState(0)
  const [interiorPoints, setInteriorPoints] = useState(0)
  const [area, setArea] = useState(0)
  const [isPolygonClosed, setIsPolygonClosed] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [interiorPointsCoords, setInteriorPointsCoords] = useState<Point[]>([])
  const [boundaryPointsCoords, setBoundaryPointsCoords] = useState<Point[]>([])
  const gridRef = useRef<SVGSVGElement>(null)
  const [selectedVertex, setSelectedVertex] = useState<number | null>(null)
  const [hoverVertex, setHoverVertex] = useState<number | null>(null)
  const [hoverFirstVertex, setHoverFirstVertex] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string>("")
  const [positionIndicator, setPositionIndicator] = useState<Point | null>(null)
  const [hoveredBoundaryPoint, setHoveredBoundaryPoint] = useState<Point | null>(null)

  const GRID_SIZE = 11
  const GRID_PADDING = 10
  const DEFAULT_GRID_SIZE = 500
  const [gridDimensions, setGridDimensions] = useState({
    width: DEFAULT_GRID_SIZE,
    height: DEFAULT_GRID_SIZE,
    cellSize: (DEFAULT_GRID_SIZE - 2 * GRID_PADDING) / (GRID_SIZE - 1)
  })
  const POINT_RADIUS = 4

  useEffect(() => {
    const updateGridDimensions = () => {
      const maxWidth = Math.min(500, window.innerWidth * 0.8)
      setGridDimensions({
        width: maxWidth,
        height: maxWidth,
        cellSize: (maxWidth - 2 * GRID_PADDING) / (GRID_SIZE - 1)
      })
    }

    updateGridDimensions()
    window.addEventListener('resize', updateGridDimensions)
    return () => window.removeEventListener('resize', updateGridDimensions)
  }, [])

  const { width: GRID_WIDTH, height: GRID_HEIGHT, cellSize: CELL_SIZE } = gridDimensions

  // Calculate GCD for boundary points
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a)
    b = Math.abs(b)
    if (b > a) {
      const temp = a
      a = b
      b = temp
    }
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }

  // Check if two line segments intersect
  const doLinesIntersect = (p1: Point, p2: Point, p3: Point, p4: Point): boolean => {
    // Calculate direction vectors
    const d1x = p2.x - p1.x
    const d1y = p2.y - p1.y
    const d2x = p4.x - p3.x
    const d2y = p4.y - p3.y

    // Calculate determinant
    const det = d1x * d2y - d1y * d2x

    // Lines are parallel if determinant is zero
    if (det === 0) return false

    // Calculate parameters for parametric line equations
    const s = ((p3.x - p1.x) * d2y - (p3.y - p1.y) * d2x) / det
    const t = ((p3.x - p1.x) * d1y - (p3.y - p1.y) * d1x) / det

    // Check if intersection point is within both line segments
    return s > 0 && s < 1 && t > 0 && t < 1
  }

  // Check if adding a new point would create a self-intersecting polygon
  const wouldCreateIntersection = (newPoint: Point): boolean => {
    if (vertices.length < 3) return false

    // Only check for intersections if we're closing the polygon
    if (vertices.length > 2 && newPoint.x === vertices[0].x && newPoint.y === vertices[0].y) {
      return false
    }

    // Check if the new edge would intersect with any existing edge
    const lastVertex = vertices[vertices.length - 1]

    for (let i = 0; i < vertices.length - 1; i++) {
      if (doLinesIntersect(lastVertex, newPoint, vertices[i], vertices[i + 1])) {
        return true
      }
    }

    return false
  }

  // Count boundary points on a line segment
  const countBoundaryPoints = (p1: Point, p2: Point): number => {
    const dx = Math.abs(p2.x - p1.x)
    const dy = Math.abs(p2.y - p1.y)
    return gcd(dx, dy) + 1
  }

  // Calculate the area of the polygon using the Shoelace formula
  const calculateArea = (points: Point[]): number => {
    if (points.length < 3) return 0

    let area = 0
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length
      area += points[i].x * points[j].y
      area -= points[j].x * points[i].y
    }

    return Math.abs(area) / 2
  }

  // Find all boundary points (including vertices)
  const findAllBoundaryPoints = (points: Point[]): Point[] => {
    if (points.length < 2) return points

    const boundaryPoints: Point[] = []

    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length
      const p1 = points[i]
      const p2 = points[j]

      // Add the first point of each segment
      boundaryPoints.push({ x: p1.x, y: p1.y })

      // Find intermediate boundary points
      const dx = p2.x - p1.x
      const dy = p2.y - p1.y
      const gcdValue = gcd(dx, dy)

      if (gcdValue > 1) {
        const stepX = dx / gcdValue
        const stepY = dy / gcdValue

        for (let k = 1; k < gcdValue; k++) {
          boundaryPoints.push({
            x: p1.x + k * stepX,
            y: p1.y + k * stepY,
          })
        }
      }
    }

    // Remove duplicates
    return boundaryPoints.filter(
      (point, index, self) => index === self.findIndex((p) => p.x === point.x && p.y === point.y),
    )
  }

  // Check if a point is inside a polygon
  const isPointInPolygon = (point: Point, polygon: Point[]): boolean => {
    let inside = false
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x,
        yi = polygon[i].y
      const xj = polygon[j].x,
        yj = polygon[j].y

      const intersect = yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi

      if (intersect) inside = !inside
    }
    return inside
  }

  // Check if a point is on a polygon boundary
  const isPointOnBoundary = (point: Point, boundaryPoints: Point[]): boolean => {
    return boundaryPoints.some((bp) => bp.x === point.x && bp.y === point.y)
  }

  // Find all interior points
  const findAllInteriorPoints = (polygon: Point[], boundaryPoints: Point[]): Point[] => {
    if (polygon.length < 3) return []

    const interiorPoints: Point[] = []

    // Find the bounding box of the polygon
    let minX = Number.POSITIVE_INFINITY,
      minY = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY

    for (const point of polygon) {
      minX = Math.min(minX, point.x)
      minY = Math.min(minY, point.y)
      maxX = Math.max(maxX, point.x)
      maxY = Math.max(maxY, point.y)
    }

    // Check all lattice points within the bounding box
    for (let x = Math.floor(minX); x <= Math.ceil(maxX); x++) {
      for (let y = Math.floor(minY); y <= Math.ceil(maxY); y++) {
        const point = { x, y }

        // Skip if the point is outside the grid
        if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) continue

        // Skip if the point is on the boundary
        if (isPointOnBoundary(point, boundaryPoints)) continue

        // Add if the point is inside the polygon
        if (isPointInPolygon(point, polygon)) {
          interiorPoints.push(point)
        }
      }
    }

    return interiorPoints
  }

  // Update calculations when vertices change
  useEffect(() => {
    if (vertices.length < 3 || !isPolygonClosed) {
      setBoundaryPoints(vertices.length)
      setInteriorPoints(0)
      setArea(0)
      setBoundaryPointsCoords([])
      setInteriorPointsCoords([])
      return
    }

    const allBoundaryPoints = findAllBoundaryPoints(vertices)
    const allInteriorPoints = findAllInteriorPoints(vertices, allBoundaryPoints)

    setBoundaryPointsCoords(allBoundaryPoints)
    setInteriorPointsCoords(allInteriorPoints)

    setBoundaryPoints(allBoundaryPoints.length)
    setInteriorPoints(allInteriorPoints.length)

    const calculatedArea = calculateArea(vertices)
    setArea(calculatedArea)
  }, [vertices, isPolygonClosed])

  // Handle vertex selection
  const handleVertexClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()

    if (vertices.length <= 3 && isPolygonClosed) {
      setStatusMessage("Cannot delete: Polygon needs at least 3 vertices")
      setTimeout(() => setStatusMessage(""), 2000)
      return
    }

    const newVertices = [...vertices]
    newVertices.splice(index, 1)
    setVertices(newVertices)

    // If we deleted the last vertex and the polygon was closed, open it
    if (newVertices.length < 3 && isPolygonClosed) {
      setIsPolygonClosed(false)
    }

    setStatusMessage("Vertex deleted")
    setTimeout(() => setStatusMessage(""), 1000)
  }

  // Handle edge click for adding new points
  const handleEdgeClick = (e: React.MouseEvent, startIdx: number) => {
    if (!gridRef.current) return

    const rect = gridRef.current.getBoundingClientRect()
    const x = Math.round((e.clientX - rect.left) / CELL_SIZE)
    const y = Math.round((e.clientY - rect.top) / CELL_SIZE)

    // Ensure coordinates are within grid bounds
    const boundedX = Math.max(0, Math.min(GRID_SIZE - 1, x))
    const boundedY = Math.max(0, Math.min(GRID_SIZE - 1, y))

    // Add the new point after the startIdx
    const newVertices = [...vertices]
    newVertices.splice(startIdx + 1, 0, { x: boundedX, y: boundedY })
    setVertices(newVertices)

    setStatusMessage("Vertex added")
    setTimeout(() => setStatusMessage(""), 1000)
  }

  // Handle vertex hover
  const handleVertexHover = (index: number | null) => {
    setHoverVertex(index)

    // Check if hovering over first vertex to indicate polygon closure
    if (index === 0 && vertices.length > 2 && !isPolygonClosed) {
      setHoverFirstVertex(true)
    } else {
      setHoverFirstVertex(false)
    }
  }

  // Complete polygon button handler
  const handleCompletePolygon = () => {
    if (vertices.length < 3) {
      setStatusMessage("Need at least 3 vertices to complete a polygon")
      setTimeout(() => setStatusMessage(""), 2000)
      return
    }

    setIsPolygonClosed(true)
    setStatusMessage("Polygon completed")
    setTimeout(() => setStatusMessage(""), 1000)
  }

  // Handle grid point click
  const handlePointClick = (x: number, y: number) => {
    const newPoint = { x, y }

    // If polygon is already closed, start a new one
    if (isPolygonClosed) {
      setVertices([newPoint])
      setIsPolygonClosed(false)
      return
    }

    // Check if clicking on the first point to close the polygon
    if (vertices.length > 2 && x === vertices[0].x && y === vertices[0].y && !isPolygonClosed) {
      setIsPolygonClosed(true)
      setStatusMessage("Polygon completed")
      setTimeout(() => setStatusMessage(""), 1000)
      return
    }

    // Check if the new point would create a self-intersection
    if (vertices.length > 1 && wouldCreateIntersection(newPoint)) {
      setIsIntersecting(true)
      setStatusMessage("Cannot create self-intersecting polygon")
      setTimeout(() => {
        setIsIntersecting(false)
        setStatusMessage("")
      }, 2000)
      return
    }

    // Only add points if polygon is not closed
    if (!isPolygonClosed) {
      setVertices([...vertices, newPoint])
    }
  }

  // Handle grid click for adding vertices anywhere
  const handleGridClick = (e: React.MouseEvent) => {
    if (!gridRef.current) return

    const rect = gridRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / CELL_SIZE
    const y = (e.clientY - rect.top) / CELL_SIZE

    // Always round to nearest grid point
    const roundedX = Math.round(x)
    const roundedY = Math.round(y)

    // Ensure coordinates are within grid bounds
    const boundedX = Math.max(0, Math.min(GRID_SIZE - 1, roundedX))
    const boundedY = Math.max(0, Math.min(GRID_SIZE - 1, roundedY))

    handlePointClick(boundedX, boundedY)
  }

  // Handle vertex mouse down for dragging
  const handleVertexMouseDown = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (vertices.length > 3 && isPolygonClosed) {
      setDragging({ index, active: true })
      setStatusMessage("Dragging vertex")
    }
  }

  // Handle mouse move for dragging vertices
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gridRef.current || !dragging?.active) return

    const rect = gridRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / CELL_SIZE
    const y = (e.clientY - rect.top) / CELL_SIZE

    // Always round to nearest grid point
    const roundedX = Math.round(x)
    const roundedY = Math.round(y)

    // Ensure coordinates are within grid bounds
    const boundedX = Math.max(0, Math.min(GRID_SIZE - 1, roundedX))
    const boundedY = Math.max(0, Math.min(GRID_SIZE - 1, roundedY))

    // Update position indicator
    setPositionIndicator({ x: boundedX, y: boundedY })

    // Skip if position hasn't changed
    if (vertices[dragging.index].x === boundedX && vertices[dragging.index].y === boundedY) {
      return
    }

    // Create a new vertices array with the updated position
    const newVertices = [...vertices]
    newVertices[dragging.index] = { x: boundedX, y: boundedY }

    // Check for self-intersection
    let willIntersect = false
    const idx = dragging.index

    if (vertices.length > 3 && isPolygonClosed) {
      const prev = (idx - 1 + vertices.length) % vertices.length
      const next = (idx + 1) % vertices.length

      // Check if moving the vertex would create intersections
      for (let i = 0; i < vertices.length; i++) {
        const j = (i + 1) % vertices.length
        if (i !== prev && j !== idx && i !== idx && j !== prev) {
          if (doLinesIntersect(newVertices[idx], newVertices[prev], vertices[i], vertices[j])) {
            willIntersect = true
            break
          }
        }

        if (i !== idx && j !== next && i !== next && j !== idx) {
          if (doLinesIntersect(newVertices[idx], newVertices[next], vertices[i], vertices[j])) {
            willIntersect = true
            break
          }
        }
      }
    }

    if (!willIntersect) {
      setVertices(newVertices)
    }
  }

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    if (dragging?.active) {
      setStatusMessage("Vertex moved")
      setTimeout(() => setStatusMessage(""), 1000)
    } else if (draggingBoundary?.active) {
      setStatusMessage("Boundary point converted to vertex")
      setTimeout(() => setStatusMessage(""), 1500)
    }

    setDragging(null)
    setDraggingBoundary(null)
    setPositionIndicator(null)
  }

  const handleDragStart = (e: React.MouseEvent) => {
    // Prevent default drag behavior
    e.preventDefault()
  }

  // Clear the grid and reset state
  const handleClearGrid = () => {
    setVertices([])
    setIsPolygonClosed(false)
    setBoundaryPoints(0)
    setInteriorPoints(0)
    setArea(0)
    setBoundaryPointsCoords([])
    setInteriorPointsCoords([])
  }

  // Create example triangle
  const createExampleTriangle = () => {
    setVertices([
      { x: 2, y: 4 },
      { x: 6, y: 2 },
      { x: 6, y: 6 },
    ])
    setIsPolygonClosed(true)
  }

  // Generate grid points
  const gridPoints = []
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      gridPoints.push(
        <circle
          key={`point-${x}-${y}`}
          cx={x * CELL_SIZE + GRID_PADDING}
          cy={y * CELL_SIZE + GRID_PADDING}
          r={POINT_RADIUS}
          className={`fill-gray-400 hover:fill-gray-600 transition-all cursor-pointer ${
            isIntersecting ? "animate-pulse" : ""
          }`}
          onClick={() => handlePointClick(x, y)}
        />,
      )
    }
  }

  // Generate grid lines
  const gridLines = []
  for (let y = 0; y < GRID_SIZE; y++) {
    gridLines.push(
      <line
        key={`horiz-${y}`}
        x1={GRID_PADDING}
        y1={y * CELL_SIZE + GRID_PADDING}
        x2={(GRID_SIZE - 1) * CELL_SIZE + GRID_PADDING}
        y2={y * CELL_SIZE + GRID_PADDING}
        className="stroke-gray-200"
      />
    )
  }
  for (let x = 0; x < GRID_SIZE; x++) {
    gridLines.push(
      <line
        key={`vert-${x}`}
        x1={x * CELL_SIZE + GRID_PADDING}
        y1={GRID_PADDING}
        x2={x * CELL_SIZE + GRID_PADDING}
        y2={(GRID_SIZE - 1) * CELL_SIZE + GRID_PADDING}
        className="stroke-gray-200"
      />
    )
  }
  // Add rightmost vertical line
  gridLines.push(
    <line
      key="vert-right"
      x1={(GRID_SIZE - 1) * CELL_SIZE + GRID_PADDING}
      y1={GRID_PADDING}
      x2={(GRID_SIZE - 1) * CELL_SIZE + GRID_PADDING}
      y2={(GRID_SIZE - 1) * CELL_SIZE + GRID_PADDING}
      className="stroke-gray-200"
    />
  )
  // Add bottommost horizontal line
  gridLines.push(
    <line
      key="horiz-bottom"
      x1={GRID_PADDING}
      y1={(GRID_SIZE - 1) * CELL_SIZE + GRID_PADDING}
      x2={(GRID_SIZE - 1) * CELL_SIZE + GRID_PADDING}
      y2={(GRID_SIZE - 1) * CELL_SIZE + GRID_PADDING}
      className="stroke-gray-200"
    />
  )

  // Generate interior points with visual indicators
  const interiorPointElements = []
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const point = { x, y }
      if (isPointInPolygon(point, vertices) && !isPointOnBoundary(point, boundaryPointsCoords)) {
        interiorPointElements.push(
          <g key={`interior-${x}-${y}`}>
            <circle
              cx={x * CELL_SIZE + GRID_PADDING}
              cy={y * CELL_SIZE + GRID_PADDING}
              r={POINT_RADIUS * 1.5}
              className="fill-gray-200 stroke-black stroke-2 hover:fill-gray-300 transition-colors"
            />
          </g>
        )
      }
    }
  }

  // Generate boundary points with visual indicators
  const boundaryPointElements = boundaryPointsCoords.map((point, index) => {
    const isVertex = vertices.some(v => v.x === point.x && v.y === point.y)
    return (
      <g key={`boundary-${index}`}>
        <circle
          cx={point.x * CELL_SIZE + GRID_PADDING}
          cy={point.y * CELL_SIZE + GRID_PADDING}
          r={POINT_RADIUS * (isVertex ? 2 : 1.5)}
          className="fill-yellow-500 stroke-black stroke-2 hover:fill-yellow-400 transition-colors"
          onClick={(e) => {
            if (index === 0 && vertices.length > 2 && !isPolygonClosed) {
              setIsPolygonClosed(true)
              setStatusMessage("Polygon completed")
              setTimeout(() => setStatusMessage(""), 1000)
            }
          }}
        />
      </g>
    )
  })

  // Generate polygon vertices with selection and hover states
  const polygonVertices = vertices.map((point, index) => (
    <g key={`vertex-${index}`}>
      <circle
        cx={point.x * CELL_SIZE + GRID_PADDING}
        cy={point.y * CELL_SIZE + GRID_PADDING}
        r={POINT_RADIUS * (selectedVertex === index || hoverVertex === index ? 2 : index === 0 && hoverFirstVertex ? 2.5 : 1.5)}
        className={`
          ${index === 0 && hoverFirstVertex ? "fill-yellow-500 stroke-black stroke-2 hover:fill-yellow-400" : ""}
          ${selectedVertex === index ? "fill-yellow-500 stroke-black stroke-2 hover:fill-yellow-400" : "fill-yellow-500 stroke-black stroke-2 hover:fill-yellow-400"} 
          ${hoverVertex === index ? "stroke-black stroke-2" : ""}
          cursor-pointer transition-colors duration-150
        `}
        onClick={(e) => {
          if (index === 0 && vertices.length > 2 && !isPolygonClosed) {
            setIsPolygonClosed(true)
            setStatusMessage("Polygon completed")
            setTimeout(() => setStatusMessage(""), 1000)
          } else {
            handleVertexClick(index, e)
          }
        }}
        onMouseEnter={() => handleVertexHover(index)}
        onMouseLeave={() => handleVertexHover(null)}
      />
      {selectedVertex === index && (
        <circle
          cx={point.x * CELL_SIZE + GRID_PADDING}
          cy={point.y * CELL_SIZE + GRID_PADDING}
          r={POINT_RADIUS * 3}
          className="fill-gray-200 fill-opacity-50"
        />
      )}
    </g>
  ))

  // Generate polygon edges with click areas
  const polygonEdges = []
  if (vertices.length > 1) {
    for (let i = 0; i < vertices.length; i++) {
      const j = (i + 1) % vertices.length
      if (!isPolygonClosed && j === 0) continue

      const start = vertices[i]
      const end = vertices[j]

      // Create an invisible wider path for better click targeting
      polygonEdges.push(
        <path
          key={`edge-click-${i}`}
          d={`M ${start.x * CELL_SIZE + GRID_PADDING},${start.y * CELL_SIZE + GRID_PADDING} L ${end.x * CELL_SIZE + GRID_PADDING},${end.y * CELL_SIZE + GRID_PADDING}`}
          className="stroke-transparent stroke-[10px] cursor-pointer"
          onClick={(e) => handleEdgeClick(e, i)}
        />,
      )
    }
  }

  // Generate polygon edges visible line
  const polygonPath =
    vertices.length > 1
      ? `M ${vertices.map((p) => `${p.x * CELL_SIZE + GRID_PADDING},${p.y * CELL_SIZE + GRID_PADDING}`).join(" L ")}${isPolygonClosed ? " Z" : ""}`
      : ""

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 mb-4 sm:mb-8 text-center">Pick's Theorem Visualization</h1>

        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-4 sm:gap-6">
          {/* Grid and Polygon */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              <svg
                ref={gridRef}
                width={GRID_WIDTH}
                height={GRID_HEIGHT}
                className="border border-gray-300 bg-white shadow-md"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onDragStart={handleDragStart}
                onClick={handleGridClick}
              >
                {/* Grid lines */}
                {gridLines}

                {/* Grid points */}
                {gridPoints}

                {/* Polygon fill */}
                {vertices.length > 2 && isPolygonClosed && (
                  <path d={polygonPath} className="fill-yellow-500 fill-opacity-20" />
                )}

                {/* Polygon edges visible line */}
                {vertices.length > 1 && (
                  <path
                    d={polygonPath}
                    className="fill-none stroke-black stroke-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Interior points */}
                {interiorPointElements}

                {/* Boundary points */}
                {boundaryPointElements}

                {/* Polygon vertices */}
                {polygonVertices}

                {/* Position indicator during dragging */}
                {positionIndicator && vertices.length > 3 && isPolygonClosed && dragging?.active && (
                  <g>
                    <circle
                      cx={positionIndicator.x * CELL_SIZE + GRID_PADDING}
                      cy={positionIndicator.y * CELL_SIZE + GRID_PADDING}
                      r={POINT_RADIUS * 2}
                      className="fill-yellow-500 fill-opacity-50"
                    />
                    <line
                      x1={vertices[dragging.index].x * CELL_SIZE + GRID_PADDING}
                      y1={vertices[dragging.index].y * CELL_SIZE + GRID_PADDING}
                      x2={positionIndicator.x * CELL_SIZE + GRID_PADDING}
                      y2={positionIndicator.y * CELL_SIZE + GRID_PADDING}
                      className="stroke-yellow-500 stroke-dashed stroke-1 opacity-50"
                      strokeDasharray="4"
                    />
                  </g>
                )}
              </svg>

              {/* Instructions overlay */}
              {vertices.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 pointer-events-none">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-gray-700">Click on grid points to create a polygon</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar with calculations */}
          <div className="w-full md:w-80 bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col gap-4 sm:gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Pick's Theorem</h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="border-b border-gray-200 pb-2 sm:pb-3">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Boundary Points (b)</h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{boundaryPoints}</p>
                </div>

                <div className="border-b border-gray-200 pb-2 sm:pb-3">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Interior Points (i)</h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{interiorPoints}</p>
                </div>

                <div className="border-b border-gray-200 pb-2 sm:pb-3">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Area</h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{area > 0 ? area.toFixed(2) : "0"}</p>
                </div>

                {isPolygonClosed && vertices.length >= 3 && (
                  <div className="pt-2">
                    <p className="text-sm sm:text-base text-gray-600">A = i + b/2 - 1</p>
                  </div>
                )}
              </div>
            </div>

            {!isPolygonClosed && vertices.length > 2 && (
              <button
                onClick={handleCompletePolygon}
                className="w-full mt-2 sm:mt-4 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors text-sm sm:text-base"
              >
                Complete Polygon
              </button>
            )}

            {statusMessage && (
              <div className="mt-2 sm:mt-4 p-2 bg-gray-100 rounded-lg text-center">
                <p className="text-xs sm:text-sm font-medium text-gray-700">{statusMessage}</p>
              </div>
            )}

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors text-sm sm:text-base"
              >
                Learn Pick's Theorem
              </button>
              <button
                onClick={handleClearGrid}
                className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Trash2 className="w-4 h-4" />
                Clear Grid
              </button>
            </div>

            <button
              onClick={createExampleTriangle}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base"
            >
              Create Example
            </button>
          </div>
        </div>
      </div>

      {/* Educational Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Learn Pick's Theorem</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-gray-700">
                Pick's Theorem calculates the area of a polygon with vertices on a lattice grid using the formula:
              </p>

              <div className="flex justify-center my-3 sm:my-4">
                <div className="bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
                  <p className="text-lg sm:text-xl text-gray-900 font-medium">A = i + b/2 - 1</p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-700">Where:</p>

              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700">
                <li>
                  <strong>A</strong> is the area of the polygon
                </li>
                <li>
                  <strong>i</strong> is the number of interior lattice points (shown in{" "}
                  <span className="text-gray-600">gray</span>)
                </li>
                <li>
                  <strong>b</strong> is the number of boundary lattice points (shown in{" "}
                  <span className="text-gray-900">black</span>)
                </li>
              </ul>

              <div className="mt-4 sm:mt-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Example</h3>

                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg flex flex-col items-center">
                  <svg width="200" height="200" viewBox="0 0 125 100" className="border border-gray-300 bg-white">
                    {/* Grid lines */}
                    <g className="stroke-gray-200">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <React.Fragment key={`modal-grid-${i}`}>
                          <line x1={0} y1={i*25} x2={125} y2={i*25} />
                          <line x1={i*25} y1={0} x2={i*25} y2={100} />
                        </React.Fragment>
                      ))}
                    </g>
                    {/* Triangle fill */}
                    <polygon points="25,75 100,75 25,0" className="fill-yellow-500 fill-opacity-20 stroke-black stroke-2" />
                    {/* Grid points */}
                    {Array.from({ length: 5 }).map((_, y) =>
                      Array.from({ length: 6 }).map((_, x) => (
                        <circle
                          key={`modal-point-${x}-${y}`}
                          cx={x*25}
                          cy={100-y*25}
                          r={2}
                          className="fill-gray-400"
                        />
                      ))
                    )}
                    {/* Boundary points */}
                    <circle cx={25} cy={75} r={4} className="fill-yellow-500 stroke-black stroke-2" />
                    <circle cx={50} cy={75} r={4} className="fill-yellow-500 stroke-black stroke-2" />
                    <circle cx={75} cy={75} r={4} className="fill-yellow-500 stroke-black stroke-2" />
                    <circle cx={100} cy={75} r={4} className="fill-yellow-500 stroke-black stroke-2" />
                    <circle cx={75} cy={50} r={4} className="fill-yellow-500 stroke-black stroke-2" />
                    <circle cx={50} cy={25} r={4} className="fill-yellow-500 stroke-black stroke-2" />
                    <circle cx={25} cy={0} r={4} className="fill-yellow-500 stroke-black stroke-2" />
                    <circle cx={25} cy={25} r={4} className="fill-yellow-500 stroke-black stroke-2" />
                    <circle cx={25} cy={50} r={4} className="fill-yellow-500 stroke-black stroke-2" />
                    {/* Interior point */}
                    <circle cx={50} cy={50} r={4} className="fill-gray-200 stroke-black stroke-2" />
                  </svg>
                  <div className="mt-4 text-center">
                    <p className="text-gray-700">
                      <strong>Boundary points (b):</strong> 9
                    </p>
                    <p className="text-gray-700">
                      <strong>Interior points (i):</strong> 1
                    </p>
                    <p className="text-gray-700 font-medium mt-2">Area = 1 + 9/2 - 1 = 1 + 4.5 - 1 = 4.5</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <p className="text-sm text-gray-600">
                Pick's Theorem was discovered by Austrian mathematician Georg Alexander Pick in 1899. It provides an
                elegant way to calculate the area of a polygon on a grid using only counting.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
