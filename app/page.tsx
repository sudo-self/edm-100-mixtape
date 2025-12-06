"use client"

import { useState, useEffect } from "react"
import { PlaylistTabs } from "@/components/playlist-tabs"
import { LikeCounter } from "@/components/like-counter"
import { Music2, Zap } from "lucide-react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(134,239,172,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Floating Icon */}
            <div
              className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 border border-primary/20 ${mounted ? "animate-float" : ""}`}
            >
              <Music2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>

            {/* Title */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-balance">
                <span className="block text-foreground">EDM 100</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                  Mixtape
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty px-4">
                The ultimate collection of the top 100 EDM tracks.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-2 sm:pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">100.JesseJesse.com</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <LikeCounter />
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Section */}
      <div className="max-w-7xl mx-auto px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <PlaylistTabs />
      </div>
      
{/* Footer */}
<footer className="border-t border-border mt-16 sm:mt-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    <a href="https://100.jessejesse.com" target="_blank" rel="noopener noreferrer" className="text-center text-xs sm:text-sm text-pink-400 hover:text-indigo-500 hover:underline text-muted-foreground">
      100.JesseJesse.com
    </a>
  </div>
</footer>

    </main>
  )
}
