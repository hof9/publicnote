"use client"

import { motion } from "framer-motion"
import FindTheFox from "./find-the-fox"

export default function FindTheFoxPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Find the Fox</h1>
      <div className="prose dark:prose-invert mb-8">
        <p>Try your luck at finding the fox in the forest! Click on the grid cells to search, and use the hints to guide you.</p>
      </div>
      <FindTheFox />
    </motion.div>
  )
} 