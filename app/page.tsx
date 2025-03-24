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
          A collection of notes and resources across various subjects
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {[
          { title: "Math", description: "Mathematical concepts and formulas" },
          { title: "History", description: "Historical events and timelines" },
          { title: "Christian Theology", description: "Biblical studies and theology" },
          { title: "Photography", description: "Photography tips and techniques" },
          { title: "Notes", description: "General notes and observations" },
          { title: "Annele", description: "Personal collection" },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
