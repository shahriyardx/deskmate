import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import AddTaskView from "./add-task"
import { useRightContext } from "@/context/right-context"
import TasksView from "./tasks"
import { cn } from "@/lib/utils"
import NotesView from "./notes"
import AddNoteView from "./add-note"

const RightSide = ({ className }: { className?: string }) => {
  const { view } = useRightContext()

  return (
    <ScrollArea className={cn("w-full h-svh p-5 pb-10 border-l", className)}>
      <ScrollBar orientation="vertical" />
      {view === "add-task" && <AddTaskView />}
      {view === "tasks" && <TasksView />}
      {view === "notes" && <NotesView />}
      {view === "add-note" && <AddNoteView />}
    </ScrollArea>
  )
}

export default RightSide
