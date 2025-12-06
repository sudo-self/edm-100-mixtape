"use client"

import { useState } from "react"
import { Music, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Equalizer } from "@/components/equalizer"

export function PlaylistTabs() {
  const [activeTab, setActiveTab] = useState<"apple" | "github">("apple")

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Tab Controls */}
      <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3 sm:gap-4">
        <Button
          variant={activeTab === "apple" ? "default" : "ghost"}
          size="lg"
          onClick={() => setActiveTab("apple")}
          className="gap-2 transition-all w-full xs:w-auto"
        >
          <Music className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-semibold text-sm sm:text-base">Listen on Apple Music</span>
        </Button>
        <Button
          variant={activeTab === "github" ? "default" : "ghost"}
          size="lg"
          onClick={() => setActiveTab("github")}
          className="gap-2 transition-all w-full xs:w-auto"
        >
          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-semibold text-sm sm:text-base">Listen FREE on GitHub</span>
        </Button>
      </div>

      {/* Tab Content */}
      <Card className="overflow-hidden border sm:border-2 bg-card/50 backdrop-blur-sm animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        {activeTab === "apple" ? (
          <div className="aspect-[4/3] sm:aspect-[16/9] w-full">
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="100%"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "inherit",
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/playlist/edm-100/pl.u-AkAmmDksxjyJLo9"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] sm:aspect-[16/9] w-full">
            <iframe
              frameBorder="0"
              height="100%"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "inherit",
              }}
              src="https://sudo-self.github.io/edm-100/"
            />
          </div>
        )}
        <Equalizer />
      </Card>

      {/* Playlist Info */}
      <div className="text-center space-y-2 px-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {activeTab === "apple" ? "99 EDM Hits 11+ HRs" : "Listen FREE on GitHub no sign-in"}
        </p>
      </div>
    </div>
  )
}
