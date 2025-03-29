"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function MathPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Mathematics</h1>
      <div className="prose dark:prose-invert">
      </div>

      <div className="grid gap-4">
        <Link 
          href="/math/prime-composite"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <h2 className="text-xl font-semibold text-black-800 mb-2">Prime and Composite Numbers</h2>
          <p className="text-black-700">Learn about prime and composite numbers! Identify the prime or composite numbers.</p>
        </Link>
        <Link 
          href="/math/math-concepts"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <h2 className="text-xl font-semibold text-black-800 mb-2">Math Concepts</h2>
          <p className="text-black-700">Explore math concepts of prime, composite, square, even, odd numbers, and fractions.</p>
        </Link>
        <Link 
          href="/math/count-100"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <h2 className="text-xl font-semibold text-black-800 mb-2">Count to 100</h2>
          <p className="text-black-700">A fun game where you count to 100 using a number line.</p>
        </Link>
        <Link 
          href="/math/sort-size-color-shape"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <h2 className="text-xl font-semibold text-black-800 mb-2">Sort - Size, Color, Shape</h2>
          <p className="text-black-700">A fun game where you sort size, color, and shape.</p>
        </Link>
      </div>
    </motion.div>
  )
} 