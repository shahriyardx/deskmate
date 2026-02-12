import { auth } from "@/lib/auth"
import { createTRPCRouter, protectedProcedure } from "../init"
import { headers } from "next/headers"

export const githubRouter = createTRPCRouter({
  getOpenPullRequests: protectedProcedure.query(async () => {
    const { accessToken } = await auth.api.getAccessToken({
      body: { providerId: "github" },
      headers: await headers(),
    })

    const response = await fetch(
      "https://api.github.com/search/issues?q=is:pr+is:open+user:@me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    )

    const data = await response.json()
    return data as {
      total_count: number
      items: {
        id: number
        title: string
        body: string
        html_url: string
        repository_url: string
        user: {
          login: string
        }
      }[]
    }
  }),

  getOpenIssues: protectedProcedure.query(async () => {
    const { accessToken } = await auth.api.getAccessToken({
      body: { providerId: "github" },
      headers: await headers(),
    })

    const response = await fetch(
      `https://api.github.com/search/issues?q=is:issue+is:open+user:@me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    )

    const data = (await response.json()) as {
      total_count: number
      items: {
        id: number
        title: string
        body: string
        html_url: string
        repository_url: string
        user: {
          login: string
        }
      }[]
    }

    return data
  }),
})
