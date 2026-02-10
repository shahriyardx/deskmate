"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const DateAndTime = () => {
  const [clockOnly, setClockOnly] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  const formatTime = (date: Date, showSeconds = false) => {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    hours = hours % 12
    hours = hours ? hours : 12
    const hoursFormatted = hours < 10 ? `0${hours}` : hours
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const seconds = showSeconds ? `:${date.getSeconds()}` : ""

    return `${hoursFormatted}:${formattedMinutes}${seconds}`
  }

  const getAmPm = (date: Date) => {
    const hours = date.getHours()
    return hours >= 12 ? "PM" : "AM"
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div
      className={cn(
        clockOnly &&
          "flex flex-col justify-center items-center fixed top-0 left-0 w-full h-svh z-50 bg-black",
      )}
    >
      <h1
        onClick={() => setClockOnly((val) => !val)}
        className={cn(
          "text-8xl lg:text-9xl font-bold leading-none",
          clockOnly && "text-9xl",
        )}
      >
        <span className="align-baseline">
          {formatTime(currentTime, clockOnly)}
        </span>

        {!clockOnly && (
          <span className="text-xl align-[0.1em] ml-2">
            {getAmPm(currentTime)}
          </span>
        )}
      </h1>

      {!clockOnly && (
        <h2 className="text-primary/70 font-semibold">
          {formatDate(currentTime)}
        </h2>
      )}
    </div>
  )
}

export default DateAndTime
