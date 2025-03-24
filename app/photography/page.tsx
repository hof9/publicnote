"use client"

import { motion } from "framer-motion"

export default function PhotographyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Photography</h1>
      <div className="prose dark:prose-invert">
        <p>Welcome to the Photography section. Content coming soon.</p>
      </div>
    </motion.div>
  )
} 