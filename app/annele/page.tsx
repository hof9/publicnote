"use client"

import { motion } from "framer-motion"
import FindTheFox from "./find-the-fox"

export default function AnnelePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Annele</h1>
      <div className="prose dark:prose-invert mb-8">
        <p>Welcome to the Annele section. Try your luck at finding the fox!</p>
      </div>
      <FindTheFox />
    </motion.div>
  )
} 