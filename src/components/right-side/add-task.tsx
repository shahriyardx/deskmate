"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import TaskForm from "../forms/task-form"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { ChevronLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRightContext } from "@/context/right-context"
import { TaskFormInput, taskSchema } from "@/app/_schema"
import { useTaskContext } from "@/context/task-context"

const AddTaskView = () => {
  const { setView } = useRightContext()
  const { refetchTasks, addTask, addTaskPending } = useTaskContext()

  const form = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      type: "deadline",
    },
  })

  const onSubmit = async (data: TaskFormInput) => {
    addTask(data, () => refetchTasks())
  }

  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <h1 className="text-xl font-semibold">Add Task</h1>
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

      <TaskForm form={form} onSubmit={onSubmit} isLoading={addTaskPending} />
    </>
  )
}

export default AddTaskView
