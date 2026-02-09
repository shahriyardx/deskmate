import React, { ComponentProps } from "react"

const Stage = ({ children }: ComponentProps<"div">) => {
  return <div className="w-full h-screen overflow-hidden">{children}</div>
}

export default Stage
