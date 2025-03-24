"use client"

import { motion } from "framer-motion"
import PrimeCompositeLearner from "./prime-composite-learner"

export default function PrimeCompositeLearnerPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <PrimeCompositeLearner />
    </motion.div>
  )
} 