import { noteSchema } from "@/app/_schema"
import { createTRPCRouter, protectedProcedure } from "../init"
import { prisma } from "@/lib/db"
import z from "zod"

export const noteRouter = createTRPCRouter({
  addNote: protectedProcedure
    .input(noteSchema)
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx
      const note = await prisma.note.create({
        data: {
          ...input,
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      })
      return note
    }),
  myNotes: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx

    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return notes
  }),
  deleteNote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx
      const note = await prisma.note.delete({
        where: {
          id: input.id,
          userId: session.user.id,
        },
      })
      return note
    }),
})
