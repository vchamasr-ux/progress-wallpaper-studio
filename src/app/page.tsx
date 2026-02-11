"use client"

import Link from 'next/link'
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { FAQ } from "@/components/landing/FAQ"
import { Footer } from "@/components/landing/Footer"
import { useEffect, Suspense } from 'react'
import { track, setUtmParams } from "@/lib/analytics"
import { useSearchParams } from 'next/navigation'

function LandingContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Capture UTM params
    const utmParams = {
      utm_source: searchParams.get('utm_source') || undefined,
      utm_medium: searchParams.get('utm_medium') || undefined,
      utm_campaign: searchParams.get('utm_campaign') || undefined,
    }
    setUtmParams(utmParams)

    // Track view
    track('landing_view')
  }, [searchParams])

  return (
    <main className="min-h-screen bg-background">
      {/* Mobile-first Header/Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">Progress Wallpaper</span>
          <Link
            href="#generator"
            onClick={() => track('cta_get_started_clicked', { location: 'nav' })}
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full"
          >
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
          <p className="mt-4 text-lg text-muted-foreground mb-8">
            No accounts. Minimal anonymous analytics. We don’t store your goal text.
          </p>

          <Link
            href="/app"
            onClick={() => track('cta_get_started_clicked', { location: 'productivity_section' })}
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

export default function Home() {
  return (
    <Suspense fallback={null}>
      <LandingContent />
    </Suspense>
  )
}
