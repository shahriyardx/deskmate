/** biome-ignore-all lint/suspicious/noExplicitAny: required */

"use client"

import { useEffect, useRef } from "react"

export function useWakeLock() {
  const wakeLockRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!("wakeLock" in navigator)) return

    let isMounted = true

    const requestWakeLock = async () => {
      try {
        wakeLockRef.current = await (navigator as any).wakeLock.request(
          "screen",
        )

        wakeLockRef.current.addEventListener("release", () => {
          wakeLockRef.current = null
        })
      } catch (error) {
        console.error("Wake Lock request failed:", error)
      }
    }

    const handleVisibilityChange = async () => {
      if (
        document.visibilityState === "visible" &&
        !wakeLockRef.current &&
        isMounted
      ) {
        await requestWakeLock()
      }
    }

    requestWakeLock()
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      isMounted = false
      document.removeEventListener("visibilitychange", handleVisibilityChange)

      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {})
        wakeLockRef.current = null
      }
    }
  }, [])
}
