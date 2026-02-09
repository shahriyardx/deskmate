"use client"

import z from "zod"
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

export const taskSchema = z
  .object({
    title: z.string("title is required").min(10),
    description: z.string("description is required").min(10),
    type: z.enum(["deadline", "range"]),
    starts_at: z.date().optional(),
    ends_at: z.date().optional(),
    remind_hours: z.coerce.number(),
  })
  .superRefine((data, ctx) => {
    // Conditional required fields
    if (data.type === "range") {
      if (!data.starts_at) {
        ctx.addIssue({
          path: ["starts_at"],
          message: "Start time is required for a time range",
          code: "custom",
        })
      }

      if (!data.ends_at) {
        ctx.addIssue({
          path: ["ends_at"],
          message: "End time is required for a time range",
          code: "custom",
        })
      }

      // Ensure start ≤ end
      if (data.starts_at && data.ends_at && data.starts_at > data.ends_at) {
        ctx.addIssue({
          path: ["ends_at"],
          message: "End time must be after start time",
          code: "custom",
        })
      }
    }

    // Deadline type
    if (data.type === "deadline" && !data.ends_at) {
      ctx.addIssue({
        path: ["ends_at"],
        message: "Deadline is required",
        code: "custom",
      })
    }
  })

export type TaskFormInput = z.input<typeof taskSchema>
export type TaskSchema = z.output<typeof taskSchema>

const TaskForm = ({ form }: { form: UseFormReturn<TaskFormInput> }) => {
  const selectedType = useWatch({
    control: form.control,
    name: "type",
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-5">
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
          <Button type="submit">Add Task</Button>
        </div>
      </form>
    </Form>
  )
}

export default TaskForm
