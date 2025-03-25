import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Note 2 | Minimal Docs Site",
  description: "Note 2",
}

export default function Note2() {
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Note 2</h1>
      <p className="text-xl mb-4">
        This is note 2
      </p>
         </main>
  )
}

