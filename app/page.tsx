


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

        {/* <section id="about" className="py-24 border-b border-white/10">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">About</h2>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <p className="text-gray-400 mb-4">
                  I'm a passionate developer and engineer with a keen eye for design and a love for creating meaningful
                  digital experiences. My work spans across frontend and backend development, with a focus on
                  performance, accessibility, and user experience.
                </p>
                <p className="text-gray-400">
                  When I'm not coding, I'm experimenting with new technologies, contributing to open source, or sharing
                  my knowledge through content creation.
                </p>
              </div>
              {/* <div className="space-y-4">
                <div className="border border-white/10 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "JavaScript",
                      "TypeScript",
                      "React",
                      "Next.js",
                      "Node.js",
                      "Python",
                      "UI/UX",
                      "System Design",
                    ].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-white/10 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border border-white/10 rounded-lg p-4"> */}
                  {/* <h3 className="font-medium mb-2">Experience</h3> */}
                  {/* <ul className="space-y-2 text-gray-400">
                    <li className="flex justify-between">
                      <span>Senior Developer</span>
                      <span>2021 - Present</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Software Engineer</span>
                      <span>2018 - 2021</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Frontend Developer</span>
                      <span>2016 - 2018</span>
                    </li>
                  </ul> */}
                {/* </div>
              </div>
            </div>
          </div> */}
        {/* </section> */}

        {/* <section id="projects" className="py-24 border-b border-white/10">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Featured Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "E-commerce Platform",
                  description: "A full-stack e-commerce solution with real-time inventory management.",
                  tags: ["Next.js", "Prisma", "Stripe"],
                },
                {
                  title: "Analytics Dashboard",
                  description: "Interactive data visualization dashboard for business intelligence.",
                  tags: ["React", "D3.js", "Firebase"],
                },
                {
                  title: "AI Content Generator",
                  description: "Machine learning powered tool for generating marketing content.",
                  tags: ["Python", "TensorFlow", "API"],
                },
              ].map((project, index) => (
                <div key={index} className="group relative border border-white/10 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-white/5"></div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-white/10 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                      View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* <section id="experiments" className="py-24 border-b border-white/10">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Experiments & Research</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="border border-white/10 rounded-lg p-6 space-y-4">
                <div className="h-40 bg-gradient-to-r from-white/10 to-white/5 rounded-lg flex items-center justify-center">
                  <div className="h-16 w-16 border border-white/20 rounded-full flex items-center justify-center">
                    <div className="h-8 w-8 bg-white rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-medium">Generative Art with WebGL</h3>
                <p className="text-gray-400">
                  Exploring the intersection of code and creativity through procedurally generated visual art using
                  WebGL and fragment shaders.
                </p>
                <Button variant="link" className="p-0 h-auto text-white hover:text-gray-400">
                  Explore the experiment →
                </Button>
              </div>
              <div className="border border-white/10 rounded-lg p-6 space-y-4">
                <div className="h-40 bg-gradient-to-r from-white/10 to-white/5 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2">
                    {Array(9)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="h-8 w-8 bg-white/20 rounded"></div>
                      ))}
                  </div>
                </div>
                <h3 className="text-xl font-medium">Neural Network Visualization</h3>
                <p className="text-gray-400">
                  An interactive visualization of neural networks that helps explain machine learning concepts to
                  non-technical audiences.
                </p>
                <Button variant="link" className="p-0 h-auto text-white hover:text-gray-400">
                  Explore the experiment →
                </Button>
              </div>
            </div>
          </div>
        </section> */}

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
