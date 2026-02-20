"use client"

import { trpc } from "@/trpc/client"
import { CircleDot } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

const OpenIssues = () => {
  const { data, isLoading } = trpc.github.getOpenIssues.useQuery()
  if (isLoading || !data) return null
  console.log(data)
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <p className="flex items-center gap-2 hover:underline cursor-pointer">
            <CircleDot size={18} /> {data.total_count} Issues are open
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Open Issues</DialogTitle>
            <DialogDescription>
              Issues waiting for your review
            </DialogDescription>
          </DialogHeader>

          <div className="no-scrollbar max-h-[50vh] overflow-y-auto space-y-5">
            {data?.items.map((issue) => {
              const repo = issue.repository_url.split("/").slice(-2).join("/")
              return (
                <div key={issue.id}>
                  <div>
                    <Link target="_blank" href={issue.html_url}>
                      <h2 className="font-semibold">{issue.title}</h2>
                    </Link>
                    <p className="text-sm text-muted-foreground w-full max-w-full line-clamp-1">
                      {issue.body}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <span className="font-semibold">{issue.user.login}</span>{" "}
                      on{" "}
                      <Link
                        target="_blank"
                        className="hover:underline"
                        href={issue.repository_url}
                      >
                        {repo}
                      </Link>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OpenIssues
