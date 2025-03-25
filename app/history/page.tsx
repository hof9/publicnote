"use client"

import { motion } from "framer-motion"
import Link from "next/link"
export default function HistoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">History</h1>
      <div className="prose dark:prose-invert">
      </div>
      <div className="grid gap-4">
        <Link 
          href="/history/prehistory"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <h2 className="text-xl font-semibold text-black-800 mb-2">Prehistory</h2>
          <p className="text-black-700">Explore the prehistory of the universe.</p>
        </Link>
      </div>
    </motion.div>
  )
} 