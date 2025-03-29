"use client"

import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to Public Note</h1>
        <p className="text-lg text-muted-foreground">
          A collection of notes, resources, and applications across various disciplines
        </p>
      </motion.div>
      

    </div>
  )
}
