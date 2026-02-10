import { taskSchema } from "@/app/_schema"
import { createTRPCRouter, protectedProcedure } from "../init"
import { prisma } from "@/lib/db"

export const taskRouter = createTRPCRouter({
  addTask: protectedProcedure
    .input(taskSchema)
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx
      const task = await prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          type: input.type,
          starts_at: input.starts_at,
          ends_at: input.ends_at,
          remind_hours: input.remind_hours,
          is_completed: false,
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
    const tasks = await prisma.task.findMany({
      where: {
        user: {
          id: session.user.id,
        },
      },
    })
    return tasks
  }),
})
