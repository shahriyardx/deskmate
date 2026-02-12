"use client"

import DateAndTime from "@/components/left-side/date-and-time"
import Footer from "@/components/left-side/footer"
import { cn } from "@/lib/utils"
import { Calendar } from "../ui/calendar"

const LeftSide = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "select-none h-full flex flex-col landscape:p-5 p-5 lg:p-10",
        className,
      )}
    >
      <DateAndTime />
      <div className="flex-1 grid grid-cols-3 gap-5"></div>
      <Footer />
    </div>
  )
}

export default LeftSide
