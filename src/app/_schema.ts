import z from "zod"

export const taskSchema = z
  .object({
    title: z.string("title is required").min(10),
    description: z.string().default(""),
    type: z.enum(["deadline", "range"]),
    starts_at: z.date().optional(),
    ends_at: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "range") {
      if (!data.starts_at) {
        ctx.addIssue({
          path: ["starts_at"],
          message: "Start time is required for a time range",
          code: "custom",
        })
      }

      if (!data.ends_at) {
        ctx.addIssue({
          path: ["ends_at"],
          message: "End time is required for a time range",
          code: "custom",
        })
      }

      // Ensure start ≤ end
      if (data.starts_at && data.ends_at && data.starts_at > data.ends_at) {
        ctx.addIssue({
          path: ["ends_at"],
          message: "End time must be after start time",
          code: "custom",
        })
      }
    }

    // Deadline type
    if (data.type === "deadline" && !data.ends_at) {
      ctx.addIssue({
        path: ["ends_at"],
        message: "Deadline is required",
        code: "custom",
      })
    }
  })

export type TaskFormInput = z.input<typeof taskSchema>
export type TaskSchema = z.output<typeof taskSchema>
