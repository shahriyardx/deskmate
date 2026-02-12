"use client"

import { Button } from "../ui/button"
import { Calendar, Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRightContext } from "@/context/right-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "../ui/badge"
import SingleTaskDeadline from "./single-task-deadline"
import SingleTaskRange from "./single-task-range"
import { Task } from "@/generated/prisma/client"
import moment from "moment"
import { useTaskContext } from "@/context/task-context"

const TasksView = () => {
  const { setView } = useRightContext()
  const { tasks } = useTaskContext()

  const todayTasks = tasks?.todayTasks || []
  const upcomingTasks = tasks?.upcomingTasks || {
    count: 0,
    tasks: {} as Record<string, Task[]>,
  }

  return (
    <Tabs defaultValue="today">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">
            <span>Upcoming</span>
            {upcomingTasks.count > 0 && (
              <Badge variant="secondary">{upcomingTasks.count}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

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
                  category="today"
                />
              )
            }
            return <SingleTaskRange key={task.id} task={task} />
          })}
        </div>
      </TabsContent>
      <TabsContent value="upcoming">
        <div className="space-y-3">
          {upcomingTasks.count === 0 && (
            <p className="flex items-center gap-2 text-center text-muted-foreground">
              <Calendar size={15} />
              No tasks upcoming
            </p>
          )}

          <div className="space-y-5">
            {Object.entries(upcomingTasks.tasks).map(([date, tasks]) => {
              return (
                <div key={date}>
                  <p className="font-bold">
                    {moment(new Date(Number(date))).format("DD MMM YYYY")}
                  </p>
                  {tasks.map((task) => {
                    if (task.type === "deadline") {
                      return (
                        <SingleTaskDeadline
                          key={task.id}
                          task={task}
                          category="upcoming"
                        />
                      )
                    }
                    return <SingleTaskRange key={task.id} task={task} />
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default TasksView
