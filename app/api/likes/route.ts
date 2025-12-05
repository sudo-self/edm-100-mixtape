import { NextResponse } from "next/server"

const WORKER_URL = "https://likes.jessejesse.workers.dev/"

export async function GET() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(WORKER_URL, {
      method: "GET",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Worker returned ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching likes:", error)
    return NextResponse.json({ likes: 1337 }, { status: 200 })
  }
}

export async function POST() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(WORKER_URL, {
      method: "POST",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Worker returned ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error posting like:", error)
    return NextResponse.json({ likes: 1338 }, { status: 200 })
  }
}
