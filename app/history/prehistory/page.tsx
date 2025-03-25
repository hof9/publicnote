"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function PreHistoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Prehistory</h1>
      <div className="prose dark:prose-invert">
        <Card className="bg-black-50 shadow-md border-2 border-black-200">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Test</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
} 