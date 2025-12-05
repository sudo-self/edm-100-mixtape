"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

const API_URL = "https://likes.jessejesse.workers.dev/"

export function LikeCounter() {
  const [likes, setLikes] = useState<number | null>(null)
  const [isLiking, setIsLiking] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)

  // Fetch initial like count
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const res = await fetch(API_URL, {
          method: "GET",
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`)
        }

        const data = await res.json()
        setLikes(data.likes ?? 0)
      } catch (err) {
        console.error("Failed to fetch likes:", err)
        setLikes(1337)
      }
    }

    fetchLikes()

    // Check if user has already liked
    const liked = localStorage.getItem("edm-100-liked")
    if (liked === "true") {
      setHasLiked(true)
    }
  }, [])

  const handleLike = async () => {
    if (isLiking || hasLiked) return

    setIsLiking(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(API_URL, {
        method: "POST",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        setLikes(data.likes ?? (likes || 0) + 1)
      } else {
        setLikes((likes || 0) + 1)
      }

      setHasLiked(true)
      localStorage.setItem("edm-100-liked", "true")

      // Trigger confetti
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff3ebf", "#4ade80", "#f87171", "#ffdd57"],
      })
    } catch (err) {
      console.error("Failed to increment likes:", err)
      setLikes((likes || 0) + 1)
      setHasLiked(true)
      localStorage.setItem("edm-100-liked", "true")

      // Trigger confetti even on error
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff3ebf", "#4ade80", "#f87171", "#ffdd57"],
      })
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant={hasLiked ? "secondary" : "ghost"}
        size="sm"
        onClick={handleLike}
        disabled={isLiking || hasLiked}
        className={`gap-2 transition-all ${hasLiked ? "animate-pulse-glow" : ""}`}
      >
        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all ${hasLiked ? "fill-primary text-primary" : ""}`} />
        <span className="font-semibold text-xs sm:text-sm">
          {likes !== null ? likes.toLocaleString() : "..."} Likes
        </span>
      </Button>
    </div>
  )
}
