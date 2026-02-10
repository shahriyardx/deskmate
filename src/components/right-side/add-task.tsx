import { zodResolver } from "@hookform/resolvers/zod"
import TaskForm, { TaskFormInput, taskSchema } from "../forms/task-form"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { ChevronLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRightContext } from "@/context/right-context"

const AddTaskView = () => {
  const { setView } = useRightContext()
  const form = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      type: "deadline",
      remind_hours: 0,
    },
  })
  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <h1 className="text-2xl font-bold">Add Task</h1>
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => setView("tasks")}
        >
          <ChevronLeft />
          Go Back
        </Button>
      </div>

      <Separator className="my-3" />

      <TaskForm form={form} />
    </>
  )
}

export default AddTaskView
