import NumberGrid from "./components/number-grid"

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Number Pattern Visualizer</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        Explore how different types of numbers create visual patterns when arranged in a grid. Select different number
        types to see their distribution and patterns.
      </p>
      <NumberGrid />
    </div>
  )
}

