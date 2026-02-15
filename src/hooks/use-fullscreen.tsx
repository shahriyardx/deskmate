"use client"

import { useEffect, useState } from "react"

export const useFullScreen = () => {
  const [fullscreen, setFullscreen] = useState(false)
  useEffect(() => {
    document.fullscreenElement ? setFullscreen(true) : setFullscreen(false)
  }, [])

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setFullscreen(false)
    } else {
      document.documentElement.requestFullscreen()
      setFullscreen(true)
    }
  }

  return { fullscreen, toggleFullScreen }
}
