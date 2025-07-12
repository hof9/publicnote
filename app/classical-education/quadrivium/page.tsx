"use client"

import Link from "next/link"
import { ArrowLeft, Calculator, Square, Music, Star, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

export default function Quadrivium() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex-1">
        <section className="py-20 md:py-32 border-b border-white/10">
          <div className="container">
            <div className="mb-8">
              <Link 
                href="/classical-education" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Classical Education
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
                    The Quadrivium
                  </h1>
                  <p className="mt-6 text-xl text-gray-400 max-w-[600px]">
                    The four mathematical arts: Arithmetic, Geometry, Music, and Astronomy. Discover the harmony of numbers, shapes, and the cosmos.
                  </p>
                </motion.div>
                
                <div className="flex gap-4">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
                    <Calculator className="h-5 w-5" />
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
            <h2 className="text-3xl font-bold tracking-tighter mb-12">The Four Mathematical Arts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Calculator className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Arithmetic</h3>
                </div>
                <p className="text-gray-400 mb-4">The study of numbers and their properties. The foundation of all mathematical thinking.</p>
                <div className="space-y-2 text-sm text-yellow-500/80">
                  <div>• Number theory</div>
                  <div>• Operations</div>
                  <div>• Patterns</div>
                  <div>• Sequences</div>
                </div>
              </div>

              <div className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Square className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Geometry</h3>
                </div>
                <p className="text-gray-400 mb-4">The study of shapes, spaces, and spatial relationships. Understanding the world through form.</p>
                <div className="space-y-2 text-sm text-yellow-500/80">
                  <div>• Shapes & figures</div>
                  <div>• Spatial reasoning</div>
                  <div>• Proportions</div>
                  <div>• Constructions</div>
                </div>
              </div>

              <div className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Music className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Music</h3>
                </div>
                <p className="text-gray-400 mb-4">The mathematical study of harmony, rhythm, and proportion. Numbers made audible.</p>
                <div className="space-y-2 text-sm text-yellow-500/80">
                  <div>• Harmonics</div>
                  <div>• Intervals</div>
                  <div>• Rhythm</div>
                  <div>• Proportions</div>
                </div>
              </div>

              <div className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Astronomy</h3>
                </div>
                <p className="text-gray-400 mb-4">The study of celestial bodies and their movements. Mathematics applied to the cosmos.</p>
                <div className="space-y-2 text-sm text-yellow-500/80">
                  <div>• Celestial mechanics</div>
                  <div>• Orbits</div>
                  <div>• Time measurement</div>
                  <div>• Navigation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-white/10">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Mathematical Explorations Coming Soon</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Discover the beauty of mathematics through interactive tools that bring the Quadrivium to life. 
                From number patterns to geometric constructions, musical harmonies to celestial mechanics.
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                <div className="p-4 border border-white/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Number Explorations</h3>
                  <p className="text-sm text-gray-400">Interactive number theory, sequences, and mathematical patterns.</p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Geometric Constructions</h3>
                  <p className="text-sm text-gray-400">Build shapes, explore proportions, and understand spatial relationships.</p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Musical Mathematics</h3>
                  <p className="text-sm text-gray-400">Explore harmonics, intervals, and the mathematical foundations of music.</p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Celestial Mechanics</h3>
                  <p className="text-sm text-gray-400">Model orbits, understand time, and explore the mathematics of the cosmos.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 