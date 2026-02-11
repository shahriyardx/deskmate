"use client"

import { Task } from "@/generated/prisma/client"
import { Button } from "../ui/button"
import { CheckIcon } from "lucide-react"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import moment from "moment"
import { useEffect, useState } from "react"
import { Badge } from "../ui/badge"

const SingleTaskDeadline = ({
  task,
  refetch,
  category,
}: {
  task: Task
  refetch: () => void
  category: "today" | "upcoming"
}) => {
  const [isPastDue, setIsPastDue] = useState(false)
  const [showLong, setShowLong] = useState(false)

  const { mutate } = trpc.task.markAsDone.useMutation({
    onSuccess: () => {
      refetch()
      toast.success("Task marked as done")
    },
    onError: () => toast.error("Failed to mark task as done"),
  })

  useEffect(() => {
    const updateStatus = () =>
      setIsPastDue(moment(task.ends_at).isBefore(moment()))
    updateStatus()
    const ticker = setInterval(updateStatus, 1000)
    return () => clearInterval(ticker)
  }, [task.ends_at])

  const long = moment(task.ends_at).format("DD MMM YYYY, h:mm A")
  const short = category === "today" ? moment(task.ends_at).fromNow() : long

  return (
    <div className="bg-secondary/30 p-3 rounded-md text-secondary-foreground hover:border border border-transparent hover:border-secondary cursor-pointer group relative">
      <div className="absolute top-2 right-2 z-50 cursor-pointer hidden group-hover:block">
        <Button
          size="icon-xs"
          variant="ghost"
          onClick={() => mutate({ id: task.id })}
        >
          <CheckIcon />
        </Button>
      </div>

      <h1>
        {task.title}
        {isPastDue && (
          <Badge variant="destructive" className="ml-2">
            Past due
          </Badge>
        )}
      </h1>

      <p className="text-muted-foreground">{task.description}</p>

      <div className="flex justify-between items-center mt-2">
        <p
          className="text-xs text-muted-foreground cursor-pointer"
          onClick={() => setShowLong((prev) => !prev)}
          title={long}
        >
          {showLong ? long : short}
        </p>
      </div>
    </div>
  )
}

export default SingleTaskDeadline
