"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, Users, Globe, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

export default function GreatBooks() {
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
                    Great Books
                  </h1>
                  <p className="mt-6 text-xl text-gray-400 max-w-[600px]">
                    Timeless works of literature, philosophy, and history that have shaped Western thought. Engage with the great conversation across centuries.
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
            <h2 className="text-3xl font-bold tracking-tighter mb-12">The Great Conversation</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Literature</h3>
                </div>
                <p className="text-gray-400 mb-4">Epic poems, plays, and novels that explore the human condition and timeless themes.</p>
                <div className="space-y-2 text-sm text-yellow-500/80">
                  <div>• Homer's Iliad & Odyssey</div>
                  <div>• Shakespeare's Plays</div>
                  <div>• Dante's Divine Comedy</div>
                  <div>• Modern Classics</div>
                </div>
              </div>

              <div className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Users className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Philosophy</h3>
                </div>
                <p className="text-gray-400 mb-4">The fundamental questions about existence, knowledge, ethics, and the nature of reality.</p>
                <div className="space-y-2 text-sm text-yellow-500/80">
                  <div>• Plato's Dialogues</div>
                  <div>• Aristotle's Works</div>
                  <div>• Stoic Philosophy</div>
                  <div>• Modern Thinkers</div>
                </div>
              </div>

              <div className="group p-6 border border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Globe className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold">History</h3>
                </div>
                <p className="text-gray-400 mb-4">The story of human civilization, from ancient empires to modern nations and ideas.</p>
                <div className="space-y-2 text-sm text-yellow-500/80">
                  <div>• Herodotus & Thucydides</div>
                  <div>• Roman Historians</div>
                  <div>• Medieval Chronicles</div>
                  <div>• Modern Histories</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-white/10">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Interactive Reading Coming Soon</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Experience the Great Books through interactive tools that enhance understanding and engagement. 
                From guided readings to discussion forums, explore these timeless works in new ways.
              </p>
              <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
                <div className="p-4 border border-white/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Guided Readings</h3>
                  <p className="text-sm text-gray-400">Step-by-step exploration of classic texts with commentary and analysis.</p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Discussion Forums</h3>
                  <p className="text-sm text-gray-400">Engage in thoughtful conversations about the ideas and themes in great works.</p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Timeline Explorer</h3>
                  <p className="text-sm text-gray-400">Visualize the connections between works across different time periods and cultures.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-white/10">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Featured Works Preview</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                <div className="p-4 border border-white/10 rounded-lg text-center">
                  <div className="text-2xl mb-2">📚</div>
                  <h3 className="font-semibold mb-1">The Iliad</h3>
                  <p className="text-sm text-gray-400">Homer's epic of the Trojan War</p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg text-center">
                  <div className="text-2xl mb-2">🎭</div>
                  <h3 className="font-semibold mb-1">Hamlet</h3>
                  <p className="text-sm text-gray-400">Shakespeare's tragedy of revenge</p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg text-center">
                  <div className="text-2xl mb-2">🏛️</div>
                  <h3 className="font-semibold mb-1">The Republic</h3>
                  <p className="text-sm text-gray-400">Plato's vision of justice</p>
                </div>
                <div className="p-4 border border-white/10 rounded-lg text-center">
                  <div className="text-2xl mb-2">⚖️</div>
                  <h3 className="font-semibold mb-1">Nicomachean Ethics</h3>
                  <p className="text-sm text-gray-400">Aristotle on virtue and happiness</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 