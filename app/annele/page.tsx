"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function AnnelePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Annele</h1>
      <div className="grid gap-4">
        <Link 
          href="/annele/find-the-fox"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <h2 className="text-xl font-semibold text-black-800 mb-2">Find the Fox</h2>
          <p className="text-black-700">A fun game where you search for a hidden fox in the forest using temperature hints.</p>
        </Link>
        <Link 
          href="/annele/lottery"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <h2 className="text-xl font-semibold text-black-800 mb-2">Lucky Draw Lottery</h2>
          <p className="text-black-700">A fun game where you can win prizes by drawing numbers.</p>
        </Link>
        <Link 
          href="/annele/math-adventure"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <h2 className="text-xl font-semibold text-black-800 mb-2">Math Adventure</h2>
          <p className="text-black-700">A fun math game for kids.</p>
        </Link>
      </div>
    </motion.div>
  )
} 