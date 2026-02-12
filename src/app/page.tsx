"use client"

import RequireAuth from "@/components/require-auth"
import LeftSide from "@/components/left-side"
import RightSide from "@/components/right-side"

const Page = () => {
  return (
    <RequireAuth>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <LeftSide className="hidden sm:flex" />
        <RightSide />
      </div>
    </RequireAuth>
  )
}

export default Page
