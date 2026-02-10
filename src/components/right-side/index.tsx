import React from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import AddTaskView from "./add-task"
import { useRightContext } from "@/context/right-context"
import TasksView from "./tasks"

const RightSide = () => {
  const { view } = useRightContext()

  return (
    <ScrollArea className="w-full h-svh p-5 border-l">
      <ScrollBar orientation="vertical" />
      {view === "add-task" && <AddTaskView />}
      {view === "tasks" && <TasksView />}
    </ScrollArea>
  )
}

export default RightSide
