import { useEffect, useState } from "react"

type Location = {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
}

export function useGeolocation(): Location {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by your browser",
        loading: false,
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        })
      },
      (err) => {
        setLocation({
          latitude: null,
          longitude: null,
          error: err.message,
          loading: false,
        })
      },
      {
        enableHighAccuracy: true,
      },
    )
  }, [])

  return location
}
