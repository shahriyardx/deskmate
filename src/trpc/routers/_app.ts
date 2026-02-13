import { createTRPCRouter } from "../init"
import { taskRouter } from "./task.router"
import { githubRouter } from "./github.router"
import { noteRouter } from "./note.router"

export const appRouter = createTRPCRouter({
  task: taskRouter,
  github: githubRouter,
  note: noteRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
