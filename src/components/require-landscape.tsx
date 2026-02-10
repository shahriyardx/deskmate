import { Rotate3D } from "lucide-react"
import React from "react"

const RequireLandscape = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="hidden sm:block">{children}</div>
      <div className="sm:hidden h-svh grid place-items-center">
        <div className="flex flex-col gap-2 items-center">
          <Rotate3D />
          <span className="font-bold">Rotate your device to landscape</span>
        </div>
      </div>
    </div>
  )
}

export default RequireLandscape
