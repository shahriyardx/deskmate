"use client";

import DateAndTime from "@/components/date-and-time";
import TaskForm, {
  TaskFormInput,
  taskSchema,
} from "@/components/forms/task-form";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Page = () => {
  const form = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      type: "deadline",
      remind_hours: 0,
    },
  });
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="p-10">
        <DateAndTime />
      </div>
      <div>
        <ScrollArea className="w-full h-screen p-5 border-l">
          <ScrollBar orientation="vertical" />

          <div className="flex justify-between items-center gap-5">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <Button size={"sm"} variant={"secondary"}>
              <PlusIcon />
              New Task
            </Button>
          </div>

          <div>
            <TaskForm form={form} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;
