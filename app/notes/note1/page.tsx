import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Note 1 | Minimal Docs Site",
  description: "Note 1",
}

export default function Note1() {
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Note 1</h1>
      <p className="text-xl mb-4">
        This is note 1
      </p>
    </main>
  )
}

