import { taskSchema } from "@/app/_schema"
import { createTRPCRouter, protectedProcedure } from "../init"
import { prisma } from "@/lib/db"
import z from "zod"
import { Task } from "@/generated/prisma/client"

export const taskRouter = createTRPCRouter({
  addTask: protectedProcedure
    .input(taskSchema)
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx
      const task = await prisma.task.create({
        data: {
          ...input,
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      })
      return task
    }),
  myTasks: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx
    const now = new Date()

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    )

    const endOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    )

    const startOfTomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0,
    )

    const endOfTomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      23,
      59,
      59,
      999,
    )

    const todayTasks = await prisma.task.findMany({
      where: {
        is_completed: false,
        userId: session.user.id,
        OR: [
          {
            type: "deadline",
            ends_at: {
              gte: startOfToday,
              lte: endOfToday,
            },
          },
          {
            type: "range",
            starts_at: {
              gte: startOfToday,
              lte: endOfToday,
            },
          },
        ],
      },
    })

    const upcomingTasks = await prisma.task.findMany({
      where: {
        is_completed: false,
        userId: session.user.id,
        OR: [
          {
            type: "deadline",
            ends_at: {
              gte: startOfTomorrow,
              lte: endOfTomorrow,
            },
          },
          {
            type: "range",
            starts_at: {
              gte: startOfTomorrow,
              lte: endOfTomorrow,
            },
          },
        ],
      },
    })

    const sortedTodayTasks = todayTasks.sort((a, b) => {
      const getTime = (task: Task) => {
        if (task.type === "deadline") {
          if (!task.ends_at) return 0
          return task.ends_at < now
            ? task.ends_at.getTime() - 1e15
            : task.ends_at.getTime()
        }
        // Range tasks
        if (!task.starts_at) return 0
        return task.starts_at.getTime()
      }

      return getTime(a) - getTime(b)
    })

    const sortedUpcomingTasks = upcomingTasks.sort((a, b) => {
      const getTime = (task: Task) => {
        if (task.type === "deadline") {
          if (!task.starts_at || !task.ends_at) return 0
          return task.ends_at < now
            ? task.ends_at.getTime() - 1e15
            : task.ends_at.getTime()
        }

        if (!task.starts_at) return 0
        return task.starts_at.getTime()
      }

      return getTime(a) - getTime(b)
    })

    return { todayTasks: sortedTodayTasks, upcomingTasks: sortedUpcomingTasks }
  }),
  markAsDone: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx
      const task = await prisma.task.update({
        where: {
          id: input.id,
          userId: session.user.id,
        },
        data: {
          is_completed: true,
        },
      })
      return task
    }),
})
