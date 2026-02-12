"use client"

import { Task } from "@/generated/prisma/client"
import { Button } from "../ui/button"
import { CheckIcon, TrashIcon } from "lucide-react"
import moment from "moment"
import { useCallback, useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import { useTaskContext } from "@/context/task-context"

const SingleTaskRange = ({ task }: { task: Task }) => {
  const { markAsDone, deleteTask } = useTaskContext()
  const [deadline, setDeadline] = useState({
    start: "",
    end: "",
    startFromNow: "",
    endFromNow: "",
    progressPercentage: 0,
    rangeStatus: "",
    rangeStartsIn: "",
    isRunning: false,
    range: "",
    isPastDue: false,
  })

  const calculateDeadline = useCallback(() => {
    if (!task.starts_at || !task.ends_at)
      return { isRunning: false, isUpcoming: false }

    const now = new Date()
    const start = moment(task.starts_at).format("DD MMM YYYY, h:mm A")
    const end = moment(task.ends_at).format("DD MMM YYYY, h:mm A")
    const range = `${moment(task.starts_at).format("h:mm A")} to ${moment(task.ends_at).format("h:mm A")}`

    const isRunning = now >= task.starts_at && now <= task.ends_at
    const isUpcoming = now < task.starts_at
    const isPastDue = now > task.ends_at

    const progressPercentage = Math.min(
      Math.max(
        ((now.getTime() - task.starts_at.getTime()) /
          (task.ends_at.getTime() - task.starts_at.getTime())) *
          100,
        0,
      ),
      100,
    )

    const rangeStatus = isUpcoming ? "upcoming" : "ongoing"
    const fromNow = (date: Date) => moment(date).fromNow()

    setDeadline({
      start,
      end,
      startFromNow: fromNow(task.starts_at),
      endFromNow: fromNow(task.ends_at),
      progressPercentage,
      rangeStatus,
      rangeStartsIn: fromNow(task.starts_at),
      isRunning,
      range,
      isPastDue,
    })

    return { isRunning, isUpcoming }
  }, [task])

  useEffect(() => {
    calculateDeadline()
    const ticker = setInterval(() => {
      const { isRunning, isUpcoming } = calculateDeadline()
      if (!isRunning && !isUpcoming) clearInterval(ticker)
    }, 1000)
    return () => clearInterval(ticker)
  }, [calculateDeadline])

  if (!task.starts_at || !task.ends_at) return null

  return (
    <div className="bg-secondary/30 p-3 rounded-md text-secondary-foreground hover:border border border-transparent hover:border-secondary cursor-pointer group relative overflow-hidden">
      {deadline.isRunning && (
        <div
          className="absolute top-0 left-0 h-full bg-green-500/10 z-40 rounded-md pointer-events-none"
          style={{ width: `${deadline.progressPercentage}%` }}
        />
      )}
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
        {deadline.isRunning && (
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block mr-2" />
        )}
        {task.title}
        {deadline.isPastDue && (
          <Badge variant="destructive" className="ml-2">
            Past due
          </Badge>
        )}
      </h1>
      <p className="text-muted-foreground">{task.description}</p>
      <div className="mt-2 text-xs text-muted-foreground">
        {deadline.isRunning ? (
          <div className="flex justify-between">
            <span
              title={`${deadline.start} to ${deadline.end}`}
            >{`started ${deadline.startFromNow}`}</span>
            <span
              title={`${deadline.start} to ${deadline.end}`}
            >{`ends ${deadline.endFromNow}`}</span>
          </div>
        ) : (
          <span title={`${deadline.start} to ${deadline.end}`}>
            {deadline.range}{" "}
            {deadline.rangeStatus === "upcoming"
              ? `(starting ${deadline.rangeStartsIn})`
              : ""}
          </span>
        )}
      </div>
    </div>
  )
}

export default SingleTaskRange
