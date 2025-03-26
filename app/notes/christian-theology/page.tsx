import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Christian Theology",
  description: "Christian Theology",
}

export default function ChristianTheology() {
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Christian Theology</h1>
      <p className="text-xl mb-4">
        This is Christian Theology
      </p>
    </main>
  )
}

