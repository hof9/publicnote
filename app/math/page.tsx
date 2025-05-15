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
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-grid2x2-check-icon lucide-grid-2x2-check">
            <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" fill="rgb(234 179 8)"/>
            <path d="m16 19 2 2 4-4"/>
          </svg>
            <h2 className="text-xl font-semibold text-black-800">Prime and Composite Numbers</h2>
          </div>
        </Link>
        <Link 
          href="/math/count-100"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hash-icon lucide-hash"><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
            <h2 className="text-xl font-semibold text-black-800">Count to 100</h2>
          </div>
        </Link>
        <Link 
          href="/math/number-visualization"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        > 
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-icon lucide-square">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <circle cx="8" cy="8" r="2" fill="black"/>
            <circle cx="16" cy="8" r="2" fill="black"/>
            <circle cx="8" cy="16" r="2" fill="black"/>
            <circle cx="16" cy="16" r="2" fill="black"/>
            <path d="M12 8v8" stroke="black" stroke-width="2"/>
            <path d="M8 12h8" stroke="black" stroke-width="2"/>
          </svg>
          <h2 className="text-xl font-semibold text-black-800">Number Visualization</h2>
          </div>
       </Link>
       <Link 
          href="/math/square-generator"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        > 
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-icon lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
          <h2 className="text-xl font-semibold text-black-800">Square Generator</h2>
          </div>
        </Link>
        <Link 
          href="/math/place-value-stars"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        > 
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <h2 className="text-xl font-semibold text-black-800">Place Value Stars</h2>
          </div>
        </Link>
        <Link 
          href="/math/numbers"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        > 
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-icon lucide-square">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <text x="12" y="16" text-anchor="middle" font-size="12" fill="black">1</text>
          </svg>
            <h2 className="text-xl font-semibold text-black-800">Numbers</h2>
          </div>
        </Link>
        <Link href="/math/basic-math-flashcards" className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200">
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-icon lucide-square">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <text x="12" y="16" text-anchor="middle" font-size="12" fill="black">+</text>
          </svg>
            <h2 className="text-xl font-semibold text-black-800">Basic Math Flashcards</h2>
          </div>
        </Link>
        <Link href="/math/number-base-playground" className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200">
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-icon lucide-square">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <text x="12" y="16" text-anchor="middle" font-size="12" fill="black">2</text>
            <text x="12" y="16" text-anchor="middle" font-size="12" fill="black" dx="8">ₓ</text>
          </svg>
            <h2 className="text-xl font-semibold text-black-800">Number Base Playground</h2>
          </div>
        </Link>
        <Link href="/math/picks-theorem" className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200">
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-icon lucide-square">
            <polygon points="3,3 21,6 18,21 6,18" />
          </svg>
            <h2 className="text-xl font-semibold text-black-800">Picks Theorem</h2>
          </div>
        </Link>
        <Link href="/math/star-geometry" className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200">
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star-icon lucide-star">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
            <h2 className="text-xl font-semibold text-black-800">Polygon Geometric Construction</h2>
          </div>
        </Link>
        <Link href="/math/pre-calc-trig" className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="12" x2="12" y2="2"/>
              <line x1="12" y1="12" x2="20" y2="12"/>
              <path d="M12 12 L20 12 A8 8 0 0 1 12 20" fill="none"/>
            </svg>
            <h2 className="text-xl font-semibold text-black-800">Pre-Calculus & Trigonometry</h2>
          </div>
        </Link>
        <Link href="/math/circle-parts" className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(234 179 8)" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-icon lucide-circle">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <h2 className="text-xl font-semibold text-black-800">Circle Parts</h2>
          </div>
        </Link>
      </div>
    </motion.div>
  )
} 