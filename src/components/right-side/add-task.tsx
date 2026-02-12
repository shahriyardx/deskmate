"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import TaskForm from "../forms/task-form"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { ChevronLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRightContext } from "@/context/right-context"
import { TaskFormInput, TaskSchema, taskSchema } from "@/app/_schema"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"

const AddTaskView = () => {
  const { setView } = useRightContext()

  const form = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      type: "deadline",
    },
  })

  const { mutate, isPending } = trpc.task.addTask.useMutation({
    onSuccess: () => {
      toast.success("Task added successfully")
      form.reset({
        title: "",
        description: "",
        type: "deadline",
      })
    },
    onError: () => {
      toast.error("Failed to add task")
    },
  })

  const onSubmit = async (data: TaskFormInput) => {
    mutate(data as TaskSchema)
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

      <TaskForm form={form} onSubmit={onSubmit} isLoading={isPending} />
    </>
  )
}

export default AddTaskView
