"use client"

import { Task } from "@/generated/prisma/client"
import { Button } from "../ui/button"
import { CheckIcon, TrashIcon } from "lucide-react"
import moment from "moment"
import { useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import { useTaskContext } from "@/context/task-context"

const SingleTaskDeadline = ({
  task,
  category,
}: {
  task: Task
  category: "today" | "upcoming"
}) => {
  const { markAsDone, deleteTask } = useTaskContext()
  const [isPastDue, setIsPastDue] = useState(false)
  const [showLong, setShowLong] = useState(false)

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
        <div className="flex items-center gap-2">
          <Button
            size="icon-xs"
            variant="outline"
            onClick={() => deleteTask({ id: task.id })}
            className="cursor-pointer"
          >
            <TrashIcon />
          </Button>

          <Button
            size="icon-xs"
            variant="outline"
            onClick={() => markAsDone({ id: task.id })}
            className="cursor-pointer"
          >
            <CheckIcon />
          </Button>
        </div>
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
