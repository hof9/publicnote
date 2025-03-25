import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Introduction | Minimal Docs Site",
  description: "Welcome to our minimal documentation site",
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="mb-6 text-4xl font-bold">Welcome to Our Docs</h1>
        <p className="mb-4">
          This is a gorgeous minimal documentation site built with Next.js, Tailwind CSS, and shadcn/ui components.
        </p>
        <h2 className="mb-4 mt-8 text-2xl font-semibold">Features</h2>
        <ul className="mb-4 list-inside list-disc space-y-1">
          <li>Clean and minimal design</li>
          <li>Dark mode support</li>
          <li>Responsive layout</li>
          <li>Easy navigation with shadcn sidebar</li>
          <li>Built with Next.js App Router</li>
        </ul>
        <h2 className="mb-4 mt-8 text-2xl font-semibold">Getting Started</h2>
        <p className="mb-4">
          To get started with our documentation, please navigate through the sections using the sidebar on the left.
          Here&apos;s a quick overview of the available sections:
        </p>
      </div>
    </main>
  )
}

