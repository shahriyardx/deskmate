"use client"

import DateAndTime from "@/components/left-side/date-and-time"
import Footer from "@/components/left-side/footer"
import { cn } from "@/lib/utils"
import OpenPRs from "./open-prs"
import OpenIssues from "./open-isssues"

const LeftSide = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "select-none h-full flex flex-col landscape:p-5 p-5 lg:p-10",
        className,
      )}
    >
      <DateAndTime />
      <div className="flex-1 mt-5 space-y-2">
        <OpenPRs />
        <OpenIssues />
      </div>
      <Footer />
    </div>
  )
}

export default LeftSide
