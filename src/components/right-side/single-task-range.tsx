"use client"

import { Task } from "@/generated/prisma/client"
import { Button } from "../ui/button"
import { CheckIcon } from "lucide-react"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import moment from "moment"
import { useCallback, useEffect, useState } from "react"
import { Badge } from "../ui/badge"

const SingleTaskRange = ({
  task,
  refetch,
}: {
  task: Task
  refetch: () => void
}) => {
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

  const { mutate } = trpc.task.markAsDone.useMutation({
    onSuccess: () => {
      refetch()
      toast.success("Task marked as done")
    },
    onError: () => {
      toast.error("Failed to mark task as done")
    },
  })

  const calculateDeadline = useCallback(() => {
    if (!task.starts_at || !task.ends_at)
      return { isRunning: false, isUpcoming: false }

    const now = new Date()

    const start = task.starts_at
      ? moment(task.starts_at).format("DD MMM YYYY, h:mm A")
      : ""

    const end = task.ends_at
      ? moment(task.ends_at).format("DD MMM YYYY, h:mm A")
      : ""

    const range =
      task.starts_at && task.ends_at
        ? moment(task.starts_at).format("h:mm A") +
          " to " +
          moment(task.ends_at).format("h:mm A")
        : ""

    const isRunning = now >= task.starts_at && now <= task.ends_at
    const isUpcoming = now < task.starts_at
    const isPastDue = now > task.ends_at

    // should within 0 - 100
    const progressPercentage = Math.min(
      Math.max(
        ((now.getTime() - task.starts_at.getTime()) /
          (task.ends_at.getTime() - task.starts_at.getTime())) *
          100,
        0,
      ),
      100,
    )

    const rangeStatus =
      task.starts_at && now < task.starts_at ? "upcoming" : "ongoing"
    const rangeStartsIn = task.starts_at ? moment(task.starts_at).fromNow() : ""

    const startFromNow = task.starts_at ? moment(task.starts_at).fromNow() : ""
    const endFromNow = task.ends_at ? moment(task.ends_at).fromNow() : ""
    const deadline = {
      start,
      end,
      startFromNow,
      endFromNow,
      progressPercentage,
      rangeStatus,
      rangeStartsIn,
      isRunning,
      range,
      isPastDue,
    }
    setDeadline(deadline)
    return { isRunning, isUpcoming }
  }, [task.ends_at, task.starts_at])

  useEffect(() => {
    calculateDeadline()

    const ticker = setInterval(() => {
      const { isRunning, isUpcoming } = calculateDeadline()
      if (!isRunning && !isUpcoming) {
        clearInterval(ticker)
      }
    }, 1000)

    return () => clearInterval(ticker)
  }, [calculateDeadline])

  if (!task.starts_at || !task.ends_at) return null

  return (
    <div
      key={task.id}
      className="bg-secondary/30 p-3 rounded-md text-secondary-foreground hover:border border border-transparent hover:border-secondary cursor-pointer group relative"
    >
      {deadline.isRunning && (
        <div
          className="absolute top-0 left-0 h-full bg-green-500/10 z-40 rounded-md pointer-events-none"
          style={{ width: `${deadline.progressPercentage}%` }}
        ></div>
      )}
      <div className="absolute top-2 right-2 z-50 cursor-pointer hidden group-hover:block">
        <Button
          size={"icon-xs"}
          variant={"ghost"}
          onClick={() => mutate({ id: task.id })}
        >
          <CheckIcon />
        </Button>
      </div>
      <h1>
        {deadline.isRunning && (
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block mr-2"></div>
        )}
        <span>{task.title}</span>
        {deadline.isPastDue && (
          <Badge variant="destructive" className="ml-2">
            Past due
          </Badge>
        )}
      </h1>
      <p className="text-muted-foreground">{task.description}</p>
      <div className="mt-2">
        {!deadline.isRunning && (
          <p className="text-xs text-muted-foreground">
            <span title={`${deadline.start} to ${deadline.end}`}>
              {deadline.range}{" "}
              {deadline.rangeStatus === "upcoming"
                ? `(starting ${deadline.rangeStartsIn})`
                : ""}
            </span>
          </p>
        )}
        {deadline.isRunning && (
          <p className="text-xs text-muted-foreground flex justify-between">
            <span title={`${deadline.start} to ${deadline.end}`}>
              {`started ${deadline.startFromNow}`}
            </span>
            <span title={`${deadline.start} to ${deadline.end}`}>
              {`ends ${deadline.endFromNow}`}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default SingleTaskRange
