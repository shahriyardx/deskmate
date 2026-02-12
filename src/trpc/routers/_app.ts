import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "../init"
import { taskRouter } from "./task.router"
import { githubRouter } from "./github.router"

export const appRouter = createTRPCRouter({
  task: taskRouter,
  github: githubRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
