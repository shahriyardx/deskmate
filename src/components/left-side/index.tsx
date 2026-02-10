"use client"

import DateAndTime from "@/components/left-side/date-and-time"
import Footer from "@/components/left-side/footer"
import { cn } from "@/lib/utils"
const LeftSide = () => {
  return (
    <div
      className={cn(
        "select-none h-full flex flex-col landscape:p-5 p-5 lg:p-10",
      )}
    >
      <DateAndTime />
      <Footer />
    </div>
  )
}

export default LeftSide
