"use server"

import { TaskSchema } from "@/app/_schema"
import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth/auth-client"
import { prisma } from "@/lib/db"
import { headers } from "next/headers"

export async function addTaskAction(data: TaskSchema) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return {
      success: false,
      error: "Unauthorized",
    }
  }

  const user = session.user

  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      starts_at: data.starts_at,
      ends_at: data.ends_at,
      remind_hours: data.remind_hours,
      is_completed: false,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  return { success: true, task }
}
