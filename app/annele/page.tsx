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
      <h1 className="text-3xl font-bold mb-6 ">Annele</h1>
      <div className="grid gap-4">
        <Link 
          href="/annele/find-the-fox"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <div className="flex items-center gap-2">
          <span className="text-2xl grayscale">🦊</span>
            <h2 className="text-xl font-semibold text-black-800">Find the Fox</h2>
          </div>
        </Link>
        <Link 
          href="/annele/lottery"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ticket-x-icon lucide-ticket-x"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="m9.5 14.5 5-5"/><path d="m9.5 9.5 5 5"/></svg>
            <h2 className="text-xl font-semibold text-black-800">Lucky Draw Lottery</h2>
          </div>
        </Link>
        <Link 
          href="/annele/math-adventure"
          className="p-4 bg-black-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-black-200"
        >
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-tally5-icon lucide-tally-5"><path d="M4 4v16"/><path d="M9 4v16"/><path d="M14 4v16"/><path d="M19 4v16"/><path d="M22 6 2 18"/></svg>
          <h2 className="text-xl font-semibold text-black-800">Math Adventure</h2>
          </div>
        </Link>
      </div>
    </motion.div>
  )
} 