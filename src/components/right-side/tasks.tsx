"use client"

import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRightContext } from "@/context/right-context"
import { trpc } from "@/trpc/client"

const TasksView = () => {
  const { setView } = useRightContext()

  const { data, isLoading } = trpc.task.myTasks.useQuery()

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
      {isLoading && <div>Loading...</div>}
      {!isLoading && !data?.length && (
        <div>You are all caught up for today 🎉</div>
      )}

      {!isLoading && data && (
        <div className="space-y-3">
          {data.map((task) => (
            <div
              key={task.id}
              className="bg-secondary/30 p-3 rounded-md text-secondary-foreground hover:border border border-transparent hover:border-secondary cursor-pointer"
            >
              <h1>{task.title}</h1>
              <p className="text-muted-foreground">{task.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default TasksView
