import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>π (Pi)</CardTitle>
            <CardDescription>The ratio of a circle's circumference to its diameter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square rounded-md bg-slate-100 p-4">
              <PiVisualization />
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>e (Euler's Number)</CardTitle>
            <CardDescription>The base of natural logarithms</CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="aspect-square rounded-md bg-slate-100 p-4">
              <EVisualization />
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>φ (Phi)</CardTitle>
            <CardDescription>The golden ratio found throughout nature</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square rounded-md bg-slate-100 p-4">
              <PhiVisualization />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PiVisualization() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        <div className="h-40 w-40 rounded-full border-4 border-yellow-500"></div>
        <div className="absolute left-1/2 top-1/2 h-[2px] w-40 -translate-x-1/2 -translate-y-1/2 bg-yellow-500"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-lg font-semibold">π ≈ 3.14159...</div>
          <div className="text-xs text-muted-foreground">circumference ÷ diameter</div>
        </div>
      </div>
    </div>
  )
}

function EVisualization() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <path
            d="M 20,140 Q 20,20 140,20"
            fill="none"
            stroke="hsl(48, 96%, 53%)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="80" y="80" textAnchor="middle" className="text-lg font-semibold">
            e ≈ 2.71828...
          </text>
          <text x="80" y="100" textAnchor="middle" className="text-xs text-muted-foreground">
            lim(1 + 1/n)^n as n→∞
          </text>
        </svg>
      </div>
    </div>
  )
}

function PhiVisualization() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160">
          {/* Main rectangle */}
          <rect x="20" y="60" width="120" height="74" fill="none" stroke="hsl(48, 96%, 53%)" strokeWidth="4" />
          {/* Left square */}
          <rect x="20" y="60" width="74" height="74" fill="none" stroke="hsl(48, 96%, 53%)" strokeWidth="4" />
          {/* Top right square */}
          <rect x="94" y="60" width="46" height="46" fill="none" stroke="hsl(48, 96%, 53%)" strokeWidth="4" />
          {/* Bottom right square */}
          <rect x="94" y="106" width="28" height="28" fill="none" stroke="hsl(48, 96%, 53%)" strokeWidth="4" />
          {/* Bottom right smaller square */}
          <rect x="122" y="106" width="18" height="18" fill="none" stroke="hsl(48, 96%, 53%)" strokeWidth="4" />
          {/* Smallest square */}
          <rect x="122" y="124" width="10" height="10" fill="none" stroke="hsl(48, 96%, 53%)" strokeWidth="4" />
          <text x="80" y="40" textAnchor="middle" className="text-lg font-semibold">
            φ ≈ 1.61803...
          </text>
        </svg>
      </div>
    </div>
  )
}
