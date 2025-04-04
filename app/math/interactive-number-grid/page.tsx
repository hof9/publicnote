import NumberGrid from "./components/number-grid"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-3xl font-bold text-center mb-8">Interactive Number Grid</h1>
        <p className="text-center mb-8">
          Click on squares to construct numeric values. Each square represents one unit.
        </p>
        <NumberGrid />
      </div>
    </main>
  )
}

