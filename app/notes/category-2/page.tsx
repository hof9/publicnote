import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Category 2",
  description: "Category 2",
}

export default function Category2() {
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Category 2</h1>
      <p className="text-xl mb-4">
        This is Category 2
      </p>


    </main>
  )
}

