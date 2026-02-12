"use client"

import { Task } from "@/generated/prisma/client"
import { trpc } from "@/trpc/client"
import { ComponentProps, createContext, useContext, useState } from "react"

export type RightView = "tasks" | "add-task"

const RightContext = createContext<{
  view: RightView
  setView: (view: RightView) => void
  tasks:
    | {
        todayTasks: Task[]
        upcomingTasks: {
          count: number
          tasks: Record<number, Task[]>
        }
      }
    | undefined
  refetchTasks: () => void
}>({
  view: "tasks",
  setView: () => {},
  tasks: undefined,
  refetchTasks: () => {},
})

export const RightProvider = ({ children }: ComponentProps<"div">) => {
  const [view, setView] = useState<RightView>("tasks")
  const { data, refetch: refetchTasks } = trpc.task.myTasks.useQuery(
    undefined,
    {
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  )

  return (
    <RightContext.Provider value={{ view, setView, tasks: data, refetchTasks }}>
      {children}
    </RightContext.Provider>
  )
}

export const useRightContext = () => {
  const context = useContext(RightContext)

  return context
}
