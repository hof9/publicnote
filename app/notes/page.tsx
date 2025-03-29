import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Notes Home",
  description: "Notes Home",
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="mb-6 text-4xl font-bold">Home</h1>
        <p className="mb-4">
          Notes Home
        </p>

      </div>
    </main>
  )
}

