


"use client"

import Link from "next/link"
import { Menu, Github, Linkedin, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <main className="flex-1">
        <section className="py-5 md:py-5 border-b border-white/10">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Developer. Engineer. Creator. Teacher. Analyst.
                </h1>
                <p className="max-w-[600px] text-gray-400 md:text-xl">
                  Crafting digital experiences that blend form and function. Turning complex problems into elegant
                  solutions.
                </p>

              </div>
              <div className="relative aspect-square md:aspect-auto">
                <div className="absolute inset-0 border border-white/20 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="h-1 w-full bg-white/20 overflow-hidden rounded-full">
                      <div className="h-full w-2/3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Get in Touch</h2>
                <p className="text-gray-400 mb-6">
                  Interested in working together or have a question? Feel free to reach out through any of the channels
                  below.
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
                  <a
                    href="https://www.linkedin.com/in/hofnine/"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>linkedin.com/in/hofnine</span>
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
            <a href="https://www.linkedin.com/in/hofnine/" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
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
