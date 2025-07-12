"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, GraduationCap, Scroll, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function ClassicalEducation() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex-1">
        <section className="py-20 md:py-32 border-b border-white/10">
          <div className="container">
            <div className="mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
            
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
                    Classical Education
                  </h1>
                  <p className="mt-6 text-xl text-gray-400 max-w-[600px]">
                    Explore the timeless wisdom of classical education through interactive tools and resources.
                  </p>
                </motion.div>
                
                <div className="flex gap-4">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
                    <BookOpen className="h-5 w-5" />
                    Coming Soon
                  </button>
                </div>
              </div>
              
              <motion.div 
                className="relative aspect-square md:aspect-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute inset-0 border border-yellow-500/20 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="h-32 w-32 text-yellow-500/20" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter mb-12">Classical Education Areas</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/classical-education/trivium" className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Trivium</h3>
                </div>
                <p className="text-gray-400">Grammar, Logic, and Rhetoric - the foundational arts of learning and communication.</p>
              </Link>

              <Link href="/classical-education/quadrivium" className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Scroll className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Quadrivium</h3>
                </div>
                <p className="text-gray-400">Arithmetic, Geometry, Music, and Astronomy - the mathematical arts.</p>
              </Link>

              <Link href="/classical-education/great-books" className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Users className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Great Books</h3>
                </div>
                <p className="text-gray-400">Timeless works of literature, philosophy, and history that shape Western thought.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-white/10">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Content Coming Soon</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We're working on interactive tools and resources to make classical education more engaging and accessible. 
                Stay tuned for updates on grammar exercises, logic puzzles, rhetoric practice, and more.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 