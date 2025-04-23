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
  const [editMode, setEditMode] = useState<"add" | "delete" | "move">("add")
  const [statusMessage, setStatusMessage] = useState<string>("")
  const [positionIndicator, setPositionIndicator] = useState<Point | null>(null)
  const [hoveredBoundaryPoint, setHoveredBoundaryPoint] = useState<Point | null>(null)

  const GRID_SIZE = 10
  const CELL_SIZE = 50
  const POINT_RADIUS = 4
  const GRID_WIDTH = GRID_SIZE * CELL_SIZE
  const GRID_HEIGHT = GRID_SIZE * CELL_SIZE

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

    // Check if the new edge would intersect with any existing edge
    const lastVertex = vertices[vertices.length - 1]

    for (let i = 0; i < vertices.length - 1; i++) {
      if (doLinesIntersect(lastVertex, newPoint, vertices[i], vertices[i + 1])) {
        return true
      }
    }

    // Check if closing the polygon would create an intersection
    if (vertices.length > 2) {
      for (let i = 1; i < vertices.length - 1; i++) {
        if (doLinesIntersect(newPoint, vertices[0], vertices[i], vertices[i + 1])) {
          return true
        }
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

    if (editMode === "delete") {
      // Delete the vertex
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
    } else {
      setSelectedVertex(index)
    }
  }

  // Handle edge click for adding new points
  const handleEdgeClick = (e: React.MouseEvent, startIdx: number) => {
    if (editMode !== "add" || !isPolygonClosed) return

    e.stopPropagation()

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

  // Reset selection when clicking on the grid
  const handleGridClick = (x: number, y: number) => {
    setSelectedVertex(null)
    handlePointClick(x, y)
  }

  // Change edit mode
  const changeEditMode = (mode: "add" | "delete" | "move") => {
    setEditMode(mode)
    setSelectedVertex(null)
  }

  // Handle grid point click
  const handlePointClick = (x: number, y: number) => {
    // If in delete mode, don't add points
    if (editMode === "delete") return

    const newPoint = { x, y }

    // If polygon is already closed and in add mode, start a new one
    if (isPolygonClosed && editMode === "add") {
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

    // Only add points if in add mode and polygon is not closed
    if (editMode === "add" && !isPolygonClosed) {
      setVertices([...vertices, newPoint])
    }
  }

  // Handle mouse down on a vertex for dragging
  const handleVertexMouseDown = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (editMode === "move") {
      setDragging({ index, active: true })
      setStatusMessage("Dragging vertex")
    }
  }

  // Handle mouse down on a boundary point for dragging
  const handleBoundaryMouseDown = (point: Point, segmentIndex: number, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (editMode === "move") {
      setDraggingBoundary({ point, active: true, segmentIndex })
      setStatusMessage("Dragging boundary point")
    }
  }

  const handleBoundaryMouseEnter = (point: Point) => {
    if (editMode === "move") {
      setHoveredBoundaryPoint(point)
    }
  }

  const handleBoundaryMouseLeave = () => {
    setHoveredBoundaryPoint(null)
  }

  // Handle mouse move for dragging vertices and boundary points
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gridRef.current) return

    const rect = gridRef.current.getBoundingClientRect()
    const x = Math.round((e.clientX - rect.left) / CELL_SIZE)
    const y = Math.round((e.clientY - rect.top) / CELL_SIZE)

    // Ensure coordinates are within grid bounds
    const boundedX = Math.max(0, Math.min(GRID_SIZE - 1, x))
    const boundedY = Math.max(0, Math.min(GRID_SIZE - 1, y))

    // Show position indicator when in move mode
    if (editMode === "move" && (dragging?.active || draggingBoundary?.active)) {
      setPositionIndicator({ x: boundedX, y: boundedY })
    } else {
      setPositionIndicator(null)
    }

    // Handle vertex dragging
    if (editMode === "move" && dragging?.active) {
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

    // Handle boundary point dragging - completely rewritten for reliability
    else if (editMode === "move" && draggingBoundary?.active && isPolygonClosed) {
      const newPoint = { x: boundedX, y: boundedY }

      // Skip if position hasn't changed
      if (draggingBoundary.point.x === boundedX && draggingBoundary.point.y === boundedY) {
        return
      }

      const segmentIndex = draggingBoundary.segmentIndex
      const startVertex = vertices[segmentIndex]
      const endVertex = vertices[(segmentIndex + 1) % vertices.length]

      // Create a new vertices array with the new point inserted
      const newVertices = [...vertices]
      newVertices.splice(segmentIndex + 1, 0, newPoint)

      // Check for self-intersection
      let willIntersect = false

      if (vertices.length > 2) {
        // Check if the new segments would intersect with any non-adjacent segments
        for (let i = 0; i < vertices.length; i++) {
          const j = (i + 1) % vertices.length

          // Skip checking against the segments we're modifying
          if (i === segmentIndex || j === (segmentIndex + 1) % vertices.length) continue

          // Check both new segments for intersection
          if (
            doLinesIntersect(startVertex, newPoint, vertices[i], vertices[j]) ||
            doLinesIntersect(newPoint, endVertex, vertices[i], vertices[j])
          ) {
            willIntersect = true
            break
          }
        }
      }

      if (!willIntersect) {
        setVertices(newVertices)
        // Update the dragging state to reflect the new vertex index
        setDraggingBoundary(null)
        setDragging({ index: segmentIndex + 1, active: true })
      }
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
          cx={x * CELL_SIZE}
          cy={y * CELL_SIZE}
          r={POINT_RADIUS}
          className={`fill-gray-400 hover:fill-gray-600 transition-all cursor-pointer ${
            isIntersecting ? "animate-pulse" : ""
          }`}
          onClick={() => handleGridClick(x, y)}
        />,
      )
    }
  }

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
          d={`M ${start.x * CELL_SIZE},${start.y * CELL_SIZE} L ${end.x * CELL_SIZE},${end.y * CELL_SIZE}`}
          className="stroke-transparent stroke-[10px] cursor-pointer"
          onClick={(e) => handleEdgeClick(e, i)}
        />,
      )
    }
  }

  // Generate polygon vertices with selection and hover states
  const polygonVertices = vertices.map((point, index) => (
    <g key={`vertex-${index}`}>
      <circle
        cx={point.x * CELL_SIZE}
        cy={point.y * CELL_SIZE}
        r={
          POINT_RADIUS *
          (selectedVertex === index || hoverVertex === index ? 2 : index === 0 && hoverFirstVertex ? 2.5 : 1.5)
        }
        className={`
          ${index === 0 && hoverFirstVertex ? "fill-yellow-500 stroke-white stroke-2" : ""}
          ${selectedVertex === index ? "fill-yellow-500" : "fill-black"} 
          ${hoverVertex === index ? "stroke-white stroke-2" : ""}
          cursor-pointer transition-all duration-150
        `}
        onClick={(e) => handleVertexClick(index, e)}
        onMouseEnter={() => handleVertexHover(index)}
        onMouseLeave={() => handleVertexHover(null)}
      />
      {selectedVertex === index && (
        <circle
          cx={point.x * CELL_SIZE}
          cy={point.y * CELL_SIZE}
          r={POINT_RADIUS * 3}
          className="fill-gray-200 fill-opacity-50"
        />
      )}
    </g>
  ))

  // Generate polygon edges
  const polygonPath =
    vertices.length > 1
      ? `M ${vertices.map((p) => `${p.x * CELL_SIZE},${p.y * CELL_SIZE}`).join(" L ")}${isPolygonClosed ? " Z" : ""}`
      : ""

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl font-bold text-yellow-500 mb-8">Pick's Theorem Visualization</h1>

        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6">
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
              >
                {/* Grid lines */}
                <g className="stroke-gray-200">
                  {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
                    <React.Fragment key={`grid-lines-${i}`}>
                      <line x1={0} y1={i * CELL_SIZE} x2={GRID_WIDTH} y2={i * CELL_SIZE} />
                      <line x1={i * CELL_SIZE} y1={0} x2={i * CELL_SIZE} y2={GRID_HEIGHT} />
                    </React.Fragment>
                  ))}
                </g>

                {/* Polygon fill */}
                {vertices.length > 2 && isPolygonClosed && (
                  <path d={polygonPath} className="fill-yellow-500 fill-opacity-20 stroke-yellow-500 stroke-2" />
                )}

                {/* Grid points */}
                {gridPoints}

                {/* Interior points */}
                {interiorPointsCoords.map((point, index) => (
                  <circle
                    key={`interior-${index}`}
                    cx={point.x * CELL_SIZE}
                    cy={point.y * CELL_SIZE}
                    r={POINT_RADIUS * 1.2}
                    className="fill-gray-600"
                  />
                ))}

                {/* Boundary points (excluding vertices) */}
                {boundaryPointsCoords
                  .filter((point) => !vertices.some((v) => v.x === point.x && v.y === point.y))
                  .map((point, index) => {
                    // Find which segment this boundary point belongs to
                    let segmentIndex = -1
                    for (let i = 0; i < vertices.length; i++) {
                      const j = (i + 1) % vertices.length
                      if (!isPolygonClosed && j === 0) continue

                      const p1 = vertices[i]
                      const p2 = vertices[j]

                      // Check if point is on this segment
                      const dx1 = point.x - p1.x
                      const dy1 = point.y - p1.y
                      const dx2 = p2.x - p1.x
                      const dy2 = p2.y - p1.y

                      // Check if point is collinear with segment
                      if (dx1 * dy2 === dx2 * dy1) {
                        // Check if point is within segment bounds
                        if (
                          point.x >= Math.min(p1.x, p2.x) &&
                          point.x <= Math.max(p1.x, p2.x) &&
                          point.y >= Math.min(p1.y, p2.y) &&
                          point.y <= Math.max(p1.y, p2.y)
                        ) {
                          segmentIndex = i
                          break
                        }
                      }
                    }

                    const isHovered =
                      hoveredBoundaryPoint && hoveredBoundaryPoint.x === point.x && hoveredBoundaryPoint.y === point.y

                    return (
                      <g key={`boundary-${index}`}>
                        {/* Highlight circle for better visibility in move mode */}
                        {editMode === "move" && (
                          <circle
                            cx={point.x * CELL_SIZE}
                            cy={point.y * CELL_SIZE}
                            r={POINT_RADIUS * 2.5}
                            className="fill-yellow-500 fill-opacity-20"
                            style={{ display: isHovered ? "block" : "none" }}
                          />
                        )}

                        {/* The actual boundary point */}
                        <circle
                          cx={point.x * CELL_SIZE}
                          cy={point.y * CELL_SIZE}
                          r={POINT_RADIUS * (editMode === "move" ? (isHovered ? 2 : 1.5) : 1.2)}
                          className={`
                            ${editMode === "move" ? "cursor-grab active:cursor-grabbing" : ""}
                            ${isHovered ? "fill-yellow-500" : "fill-gray-800"}
                            transition-all duration-150
                          `}
                          onMouseDown={(e) => segmentIndex >= 0 && handleBoundaryMouseDown(point, segmentIndex, e)}
                          onMouseEnter={() => handleBoundaryMouseEnter(point)}
                          onMouseLeave={handleBoundaryMouseLeave}
                          onDragStart={(e) => e.preventDefault()}
                        />
                      </g>
                    )
                  })}

                {/* Polygon edges with click areas for adding points */}
                {polygonEdges}

                {/* Polygon edges visible line */}
                {vertices.length > 1 && (
                  <path
                    d={polygonPath}
                    className="fill-none stroke-yellow-500 stroke-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Polygon vertices */}
                {polygonVertices}

                {/* Position indicator during dragging */}
                {positionIndicator && editMode === "move" && (dragging?.active || draggingBoundary?.active) && (
                  <g>
                    <circle
                      cx={positionIndicator.x * CELL_SIZE}
                      cy={positionIndicator.y * CELL_SIZE}
                      r={POINT_RADIUS * 2}
                      className="fill-yellow-500 fill-opacity-50"
                    />
                    <line
                      x1={(dragging?.active ? vertices[dragging.index].x : draggingBoundary?.point.x) * CELL_SIZE}
                      y1={(dragging?.active ? vertices[dragging.index].y : draggingBoundary?.point.y) * CELL_SIZE}
                      x2={positionIndicator.x * CELL_SIZE}
                      y2={positionIndicator.y * CELL_SIZE}
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
          <div className="w-full md:w-80 bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pick's Theorem</h2>

              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Boundary Points (b)</h3>
                  <p className="text-2xl font-bold text-gray-900">{boundaryPoints}</p>
                </div>

                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Interior Points (i)</h3>
                  <p className="text-2xl font-bold text-gray-900">{interiorPoints}</p>
                </div>

                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Area</h3>
                  <p className="text-2xl font-bold text-gray-900">{area > 0 ? area.toFixed(2) : "0"}</p>
                </div>

                {isPolygonClosed && vertices.length >= 3 && (
                  <div className="pt-2">
                    <p className="text-gray-600">A = i + b/2 - 1</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <h3 className="text-sm font-medium text-gray-500">Edit Mode</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => changeEditMode("add")}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    editMode === "add" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
                <button
                  onClick={() => changeEditMode("delete")}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    editMode === "delete" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Minus className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => changeEditMode("move")}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    editMode === "move" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Move className="w-4 h-4" />
                  <span>Move</span>
                </button>
              </div>
            </div>

            {editMode === "move" && (
              <div className="mt-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Move Mode Instructions:</span>
                </p>
                <ul className="text-xs text-gray-700 list-disc pl-4 space-y-1">
                  <li>
                    Click and drag <span className="font-medium">black vertices</span> to move them
                  </li>
                  <li>
                    Click and drag <span className="font-medium">gray boundary points</span> to convert them to vertices
                  </li>
                  <li>Points highlight in yellow when they can be dragged</li>
                </ul>
              </div>
            )}

            {!isPolygonClosed && vertices.length > 2 && (
              <button
                onClick={handleCompletePolygon}
                className="w-full mt-4 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
              >
                Complete Polygon
              </button>
            )}

            {statusMessage && (
              <div className="mt-4 p-2 bg-gray-100 rounded-lg text-center">
                <p className="text-sm font-medium text-gray-700">{statusMessage}</p>
              </div>
            )}

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
              >
                Learn Pick's Theorem
              </button>
              <button
                onClick={handleClearGrid}
                className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Grid
              </button>
            </div>

            <button
              onClick={createExampleTriangle}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
            >
              Create Example
            </button>
          </div>
        </div>
      </div>

      {/* Educational Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Learn Pick's Theorem</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Pick's Theorem calculates the area of a polygon with vertices on a lattice grid using the formula:
              </p>

              <div className="flex justify-center my-4">
                <div className="bg-gray-100 px-6 py-3 rounded-lg">
                  <p className="text-xl text-gray-900 font-medium">A = i + b/2 - 1</p>
                </div>
              </div>

              <p className="text-gray-700">Where:</p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
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

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example</h3>

                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                  <svg width="200" height="200" viewBox="0 0 200 200" className="border border-gray-300 bg-white">
                    {/* Grid lines */}
                    <g className="stroke-gray-200">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <React.Fragment key={`modal-grid-${i}`}>
                          <line x1={0} y1={i * 40} x2={200} y2={i * 40} />
                          <line x1={i * 40} y1={0} x2={i * 40} y2={200} />
                        </React.Fragment>
                      ))}
                    </g>

                    {/* Example triangle */}
                    <path
                      d="M 40,40 L 160,40 L 40,160 Z"
                      className="fill-yellow-500 fill-opacity-20 stroke-yellow-500 stroke-2"
                    />

                    {/* Boundary points */}
                    <circle cx={40} cy={40} r={5} className="fill-black" />
                    <circle cx={160} cy={40} r={5} className="fill-black" />
                    <circle cx={40} cy={160} r={5} className="fill-black" />

                    {/* Interior points */}
                    <circle cx={60} cy={60} r={4} className="fill-gray-600" />
                    <circle cx={80} cy={60} r={4} className="fill-gray-600" />
                    <circle cx={100} cy={60} r={4} className="fill-gray-600" />
                    <circle cx={120} cy={60} r={4} className="fill-gray-600" />
                    <circle cx={60} cy={80} r={4} className="fill-gray-600" />
                  </svg>

                  <div className="mt-4 text-center">
                    <p className="text-gray-700">
                      <strong>Boundary points (b):</strong> 3
                    </p>
                    <p className="text-gray-700">
                      <strong>Interior points (i):</strong> 5
                    </p>
                    <p className="text-gray-700 font-medium mt-2">Area = 5 + 3/2 - 1 = 5 + 1.5 - 1 = 5.5</p>
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
