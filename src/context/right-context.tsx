"use client"

import { ComponentProps, createContext, useContext, useState } from "react"

export type RightView = "tasks" | "add-task"

const RightContext = createContext<{
  view: RightView
  setView: (view: RightView) => void
}>({
  view: "tasks",
  setView: () => {},
})

export const RightProvider = ({ children }: ComponentProps<"div">) => {
  const [view, setView] = useState<RightView>("tasks")

  return (
    <RightContext.Provider value={{ view, setView }}>
      {children}
    </RightContext.Provider>
  )
}

export const useRightContext = () => {
  const context = useContext(RightContext)

  return context
}
