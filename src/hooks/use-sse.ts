"use client"

import { useEffect, useState } from "react"

export function useSSE<T>(url: string) {
  const [data, setData] = useState<T>(null as T)

  useEffect(() => {
    const eventSource = new EventSource(url)

    eventSource.onmessage = (event) => {
      setData(JSON.parse(event.data))
    }

    eventSource.onerror = (err) => {
      console.error("SSE error:", err)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [url])

  return data
}