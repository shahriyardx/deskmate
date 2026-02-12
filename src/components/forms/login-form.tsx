"use client"

import React from "react"
import { Button } from "../ui/button"
import { DiscordIcon } from "../icons/discord"
import { Github, Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth/auth-client"
import Image from "next/image"

const LoginForm = () => {
  return (
    <div className="w-full h-svh grid place-items-center">
      <div className="flex items-center gap-5 flex-col">
        <Image
          width={128}
          height={128}
          src="/logo.png"
          className="w-24 h-24"
          alt="Logo"
        />
        <p className="text-2xl font-bold">Sign in to Deskmate</p>
        <Button
          type="button"
          onClick={() => authClient.signIn.social({ provider: "github" })}
        >
          <Github />
          Sign in with github
        </Button>
      </div>
    </div>
  )
}

export const AuthPending = () => {
  return (
    <div className="w-full h-svh grid place-items-center">
      <div className="flex items-center gap-1">
        <Loader2 className="animate-spin" />
        Loading...
      </div>
    </div>
  )
}

export default LoginForm
