"use client"

import { useEffect, useState } from "react"

export function Equalizer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 h-10 sm:h-12 px-4 py-3 sm:px-8 sm:py-4">
      {[...Array(8)].map((_, i) => {
        const heights = ["h-2", "h-4", "h-6", "h-8", "h-6", "h-4", "h-5", "h-7"]
        return (
          <div
            key={i}
            className={`w-1 sm:w-1.5 rounded-full bg-primary/80 transition-all ${mounted ? "animate-equalizer" : heights[i]}`}
            style={{
              animationDelay: `${i * 100}ms`,
            }}
          />
        )
      })}
    </div>
  )
}
