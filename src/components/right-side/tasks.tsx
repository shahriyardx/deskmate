import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRightContext } from "@/context/right-context"

const TasksView = () => {
  const { setView } = useRightContext()

  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => setView("add-task")}
        >
          <Plus />
          Add Task
        </Button>
      </div>
      <Separator className="my-3" />
      Todo
    </>
  )
}

export default TasksView
