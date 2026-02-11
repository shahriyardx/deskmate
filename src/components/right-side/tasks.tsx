"use client"

import { Button } from "../ui/button"
import { Calendar, Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRightContext } from "@/context/right-context"
import { trpc } from "@/trpc/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "../ui/badge"
import SingleTaskDeadline from "./single-task-deadline"
import SingleTaskRange from "./single-task-range"

const TasksView = () => {
  const { setView } = useRightContext()

  const { data, refetch } = trpc.task.myTasks.useQuery()
  const todayTasks = data?.todayTasks || []
  const upcomingTasks = data?.upcomingTasks || []

  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <h1 className="text-xl font-semibold">Tasks</h1>
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
      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">
            <span>Upcoming</span>
            {upcomingTasks.length > 0 && (
              <Badge variant="secondary">{upcomingTasks.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <div className="space-y-3">
            {todayTasks.length === 0 && (
              <p className="flex items-center gap-2 text-center text-muted-foreground">
                <Calendar size={15} />
                No tasks today
              </p>
            )}
            {todayTasks.map((task) => {
              if (task.type === "deadline") {
                return (
                  <SingleTaskDeadline
                    key={task.id}
                    task={task}
                    refetch={refetch}
                    category="today"
                  />
                )
              }
              return (
                <SingleTaskRange key={task.id} task={task} refetch={refetch} />
              )
            })}
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <div className="space-y-3">
            {upcomingTasks.length === 0 && (
              <p className="flex items-center gap-2 text-center text-muted-foreground">
                <Calendar size={15} />
                No tasks upcoming
              </p>
            )}
            {upcomingTasks.map((task) => {
              if (task.type === "deadline") {
                return (
                  <SingleTaskDeadline
                    key={task.id}
                    task={task}
                    refetch={refetch}
                    category="upcoming"
                  />
                )
              }
              return (
                <SingleTaskRange key={task.id} task={task} refetch={refetch} />
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default TasksView
