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
            },
          },
          {
            type: "range",
            starts_at: {
              gte: startOfTomorrow,
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

        if (!task.starts_at) return 0
        return task.starts_at.getTime()
      }

      return getTime(a) - getTime(b)
    })

    const groupedTasks = upcomingTasks.reduce(
      (acc, task) => {
        const taskDate =
          task.type === "deadline" ? task.ends_at : task.starts_at

        if (!taskDate) return acc

        const date = new Date(taskDate)
        date.setHours(0, 0, 0, 0)

        const key = date.getTime() // number

        if (!acc[key]) {
          acc[key] = []
        }

        acc[key].push(task)

        return acc
      },
      {} as Record<number, typeof upcomingTasks>,
    )

    return {
      todayTasks: sortedTodayTasks,
      upcomingTasks: {
        count: upcomingTasks.length,
        tasks: groupedTasks,
      },
    }
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
  deleteTask: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx
      const task = await prisma.task.delete({
        where: {
          id: input.id,
          userId: session.user.id,
        },
      })
      return task
    }),
})
