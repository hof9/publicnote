import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Category 1",
  description: "Category 1",
}

export default function ChristianTheology() {
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Category 1</h1>
      <p className="text-xl mb-4">
        This is Category 1
      </p>
    </main>
  )
}

