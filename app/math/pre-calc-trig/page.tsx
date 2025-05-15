"use client"

import AngleVisualizer from "./angle-visualizer"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Comprehensive Angle Visualizer</h1>
      <AngleVisualizer />
    </main>
  )
}
