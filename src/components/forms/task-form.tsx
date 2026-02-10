"use client"

import { UseFormReturn, useWatch } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { DateTimePicker } from "../ui/date-time-picker"
import { Button } from "../ui/button"
import { TaskFormInput, TaskSchema } from "@/app/_schema"
import { Loader2 } from "lucide-react"

const TaskForm = ({
  form,
  onSubmit,
  isLoading,
}: {
  form: UseFormReturn<TaskFormInput>
  onSubmit: (data: TaskFormInput) => void
  isLoading: boolean
}) => {
  const selectedType = useWatch({
    control: form.control,
    name: "type",
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter task description here.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Task type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="range">Time Range</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedType === "range" && (
          <FormField
            control={form.control}
            name="starts_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starts</FormLabel>
                <FormControl>
                  <DateTimePicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="ends_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {selectedType === "range" ? "Ends" : "Deadline"}
              </FormLabel>
              <FormControl>
                <DateTimePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remind_hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remind (hours)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter number of days before you want soft reminder"
                  {...field}
                  value={(field.value as number) ?? 0}
                />
              </FormControl>
              <FormDescription>
                Controls how many hours before the deadline the task becomes
                visible.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit">
            {isLoading && <Loader2 className="animate-spin" />}
            <span>Add Task</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TaskForm
