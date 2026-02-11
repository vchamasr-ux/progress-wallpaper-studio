"use client"

import Link from 'next/link'
import { GeneratorContainer } from "@/components/generator/GeneratorContainer"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { FAQ } from "@/components/landing/FAQ"
import { Footer } from "@/components/landing/Footer"
import { useEffect } from 'react'
import { trackEvent } from "@/lib/analytics"

export default function Home() {
  useEffect(() => {
    trackEvent('landing_view')
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Mobile-first Header/Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">Progress Wallpaper</span>
          <Link href="#generator" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full">
            Get Started
          </Link>
        </div>
      </nav>

      <Hero />
      <HowItWorks />
      <Features />

      <section id="generator" className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-b">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Ready to commit?</h2>
          <p className="mt-4 text-lg text-muted-foreground mb-8">Design your custom lock screen in our dedicated studio.</p>

          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-lg font-semibold h-14 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Launch Studio
          </Link>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  )
}
