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
  const [error, setError] = useState(false)

  // Fetch initial like count
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setLikes(data.value || 0)
        setError(false)
      })
      .catch(() => {
        setLikes(0)
        setError(true)
      })

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
      const response = await fetch(API_URL, {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        setLikes(data.value || (likes || 0) + 1)
        setHasLiked(true)
        localStorage.setItem("edm-100-liked", "true")

        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#86efac", "#a78bfa", "#60a5fa"],
        })
      } else {
        setLikes((likes || 0) + 1)
        setHasLiked(true)
        localStorage.setItem("edm-100-liked", "true")
      }
    } catch {
      setLikes((likes || 0) + 1)
      setHasLiked(true)
      localStorage.setItem("edm-100-liked", "true")
    } finally {
      setIsLiking(false)
    }
  }

  if (error && likes === 0) {
    return null
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
