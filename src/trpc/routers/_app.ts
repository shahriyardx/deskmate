import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "../init"
import { taskRouter } from "./task.router"

export const appRouter = createTRPCRouter({
  task: taskRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
