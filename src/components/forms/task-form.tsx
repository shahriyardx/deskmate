"use client"

import z from "zod"
import { UseFormReturn, useWatch } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { DateTimePicker } from "../ui/date-time-picker"
import { Button } from "../ui/button"
import { se } from "date-fns/locale"
import { cn } from "@/lib/utils"

export const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.enum(["deadline", "range"]),
  starts_at: z.date(),
  ends_at: z.date(),
  remind_hours: z.coerce.number(),
})

export type TaskFormInput = z.input<typeof taskSchema>
export type TaskSchema = z.output<typeof taskSchema>

const TaskForm = ({ form }: { form: UseFormReturn<TaskFormInput> }) => {
  const selectedType = useWatch({
    control: form.control,
    name: "type",
  })
  console.log(selectedType)
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

        <div
          className={cn(selectedType === "range" && "grid grid-cols-2 gap-5")}
        >
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
        </div>

        <div>
          <Button type="submit">Add Task</Button>
        </div>
      </form>
    </Form>
  )
}

export default TaskForm
