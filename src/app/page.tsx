"use client"

import DateAndTime from "@/components/date-and-time"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ChevronLeft, PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/context/auth-context"
import LoginForm, { AuthPending } from "@/components/forms/login-form"
import TaskForm, {
  TaskFormInput,
  taskSchema,
} from "@/components/forms/task-form"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

const Page = () => {
  const [showForm, setShowForm] = useState(false)
  const { isPending, data } = useAuth()
  const form = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      type: "deadline",
      remind_hours: 0,
    },
  })
  return (
    <>
      {isPending && <AuthPending />}
      {data && (
        <div className="grid grid-cols-2 gap-5">
          <div className="p-10">
            <DateAndTime />
          </div>
          <div>
            <ScrollArea className="w-full h-screen p-5 border-l">
              <ScrollBar orientation="vertical" />

              <div className="flex justify-between items-center gap-5">
                <h1 className="text-2xl font-bold">
                  {showForm ? "Add Task" : "Tasks"}
                </h1>
                <Button
                  size={"sm"}
                  variant={"secondary"}
                  onClick={() => setShowForm((val) => !val)}
                >
                  {showForm ? <ChevronLeft /> : <PlusIcon />}
                  {showForm ? "Go Back" : "New Task"}
                </Button>
              </div>

              <Separator className="my-3" />

              <div>{showForm && <TaskForm form={form} />}</div>
            </ScrollArea>
          </div>
        </div>
      )}
      {!data && !isPending && <LoginForm />}
    </>
  )
}

export default Page
