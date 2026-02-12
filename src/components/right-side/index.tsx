import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import AddTaskView from "./add-task"
import { useRightContext } from "@/context/right-context"
import TasksView from "./tasks"
import { cn } from "@/lib/utils"

const RightSide = ({ className }: { className?: string }) => {
  const { view } = useRightContext()

  return (
    <ScrollArea className={cn("w-full h-svh p-5 pb-10 border-l", className)}>
      <ScrollBar orientation="vertical" />
      {view === "add-task" && <AddTaskView />}
      {view === "tasks" && <TasksView />}
    </ScrollArea>
  )
}

export default RightSide
