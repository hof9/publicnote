import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "History",
  description: "History",
}

export default function History() {
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">History</h1>
      <p className="text-xl mb-4">
        This is History
      </p>
         </main>
  )
}

