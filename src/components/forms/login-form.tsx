"use client"

import React from "react"
import { Button } from "../ui/button"
import { DiscordIcon } from "../icons/discord"
import { Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth/auth-client"

const LoginForm = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <Button
        type="button"
        onClick={() => authClient.signIn.social({ provider: "discord" })}
      >
        <DiscordIcon />
        Sign in with discord
      </Button>
    </div>
  )
}

export const AuthPending = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex items-center gap-1">
        <Loader2 className="animate-spin" />
        Loading...
      </div>
    </div>
  )
}

export default LoginForm
