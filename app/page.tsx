"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Calculator, Brain, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex-1">
        <section className="py-20 md:py-32 border-b border-white/10">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
                    Interactive Learning
                  </h1>
                  <p className="mt-6 text-xl text-gray-400 max-w-[600px]">
                    Explore concepts through engaging visualizations and interactive tools.
                  </p>
                </motion.div>
                
                <div className="flex gap-4">
                  <Link href="/math" className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
                    <Calculator className="h-5 w-5" />
                    Start Learning
                  </Link>
                  <Link href="#features" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                    <Sparkles className="h-5 w-5" />
                    Explore Features
                  </Link>
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
                    <Brain className="h-32 w-32 text-yellow-500/20" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter mb-12">Featured Learning Tools</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/math/square-generator" className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-500">
                      <rect width="18" height="18" x="3" y="3" rx="2"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Square Generator</h3>
                </div>
                <p className="text-gray-400">Explore square numbers through interactive visualizations with customizable colors and sizes.</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-yellow-500/20 rounded-md flex items-center justify-center text-sm">1</div>
                  <div className="aspect-square bg-yellow-500/40 rounded-md flex items-center justify-center text-sm">4</div>
                  <div className="aspect-square bg-yellow-500/60 rounded-md flex items-center justify-center text-sm">9</div>
                </div>
              </Link>

              <Link href="/math/prime-composite" className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-500">
                      <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/>
                      <path d="m16 19 2 2 4-4"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Prime & Composite</h3>
                </div>
                <p className="text-gray-400">Visualize and understand prime and composite numbers through interactive grids.</p>
                <div className="mt-4 grid grid-cols-5 gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className={`aspect-square ${num === 2 || num === 3 || num === 5 ? 'bg-yellow-500/60' : 'bg-yellow-500/20'} rounded-md flex items-center justify-center text-sm`}>
                      {num}
                    </div>
                  ))}
                </div>
              </Link>

              <Link href="/math/place-value-stars" className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-500">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Place Value Stars</h3>
                </div>
                <p className="text-gray-400">Click directly on the hundreds, tens, and ones boxes to add stars!</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-center font-medium">Hundreds</div>
                    <div className="aspect-[4/5] bg-yellow-500/10 rounded-lg p-2 flex flex-wrap gap-1 content-start">
                      <div className="text-yellow-500">★★★</div>
                    </div>
                    <div className="text-sm text-center text-yellow-500/80">3 × 100</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-center font-medium">Tens</div>
                    <div className="aspect-[4/5] bg-yellow-500/10 rounded-lg p-2 flex flex-wrap gap-1 content-start">
                      <div className="text-yellow-500">★</div>
                    </div>
                    <div className="text-sm text-center text-yellow-500/80">1 × 10</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-center font-medium">Ones</div>
                    <div className="aspect-[4/5] bg-yellow-500/10 rounded-lg p-2 flex flex-wrap gap-1 content-start">
                      <div className="text-yellow-500">★★★★★★★</div>
                    </div>
                    <div className="text-sm text-center text-yellow-500/80">7 × 1</div>
                  </div>
                </div>
              </Link>

              <Link href="/classical-education" className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-500">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Classical Education</h3>
                </div>
                <p className="text-gray-400">Explore the timeless wisdom of classical education through interactive tools and resources.</p>
                <div className="mt-4 flex items-center gap-2 text-yellow-500/80">
                  <span className="text-sm">Trivium • Quadrivium • Great Books</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 border-t border-white/10">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Get in Touch</h2>
                <p className="text-gray-400 mb-6">
                  Interested in working together or have a question? Feel free to reach out through any of the channels below.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:andreas.three@gmail.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span>andreas.three@gmail.com</span>
                  </a>
                  <a
                    href="https://github.com/hof9/"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span>github.com/hof9</span>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">© {new Date().getFullYear()} Public Note. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="https://github.com/hof9/" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="mailto:andreas.three@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
