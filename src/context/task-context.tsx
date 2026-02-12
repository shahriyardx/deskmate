"use client"

import { TaskFormInput } from "@/app/_schema"
import { Task } from "@/generated/prisma/client"
import { trpc } from "@/trpc/client"
import { UseMutateFunction } from "@tanstack/react-query"
import { ComponentProps, createContext, useContext } from "react"
import { toast } from "sonner"

export type RightView = "tasks" | "add-task"

const TaskContext = createContext<{
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
  addTask: (task: TaskFormInput, callback: () => void) => void
  addTaskPending: boolean
  markAsDone: UseMutateFunction<Task, unknown, { id: string }, unknown>
  deleteTask: UseMutateFunction<Task, unknown, { id: string }, unknown>
}>({
  tasks: undefined,
  refetchTasks: () => {},
  addTask: () => {},
  addTaskPending: false,
  markAsDone: () => {},
  deleteTask: () => {},
})

export const TaskProvider = ({ children }: ComponentProps<"div">) => {
  const { data, refetch: refetchTasks } = trpc.task.myTasks.useQuery(
    undefined,
    {
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  )

  const { mutate: addTaskMutation, isPending: addTaskPending } =
    trpc.task.addTask.useMutation({
      onSuccess: () => {
        toast.success("Task added successfully")
        refetchTasks()
      },
      onError: () => {
        toast.error("Failed to add task")
      },
    })

  const addTask = (task: TaskFormInput, callback: () => void) =>
    addTaskMutation(task, { onSuccess: callback })

  const { mutate: markAsDone } = trpc.task.markAsDone.useMutation({
    onSuccess: () => {
      refetchTasks()
      toast.success("Task marked as done")
    },
    onError: () => toast.error("Failed to mark task as done"),
  })

  const { mutate: deleteTask } = trpc.task.deleteTask.useMutation({
    onSuccess: () => {
      refetchTasks()
      toast.success("Task deleted")
    },
    onError: () => toast.error("Failed to delete task"),
  })

  return (
    <TaskContext.Provider
      value={{
        tasks: data,
        refetchTasks,
        addTask,
        addTaskPending,
        markAsDone,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)

  return context
}
