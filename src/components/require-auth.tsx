import React from "react"
import { useAuth } from "@/context/auth-context"
import { AuthPending } from "./forms/login-form"
import LoginForm from "./forms/login-form"

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isPending, data } = useAuth()
  if (isPending) return <AuthPending />
  if (!data) return <LoginForm />

  return <>{children}</>
}

export default RequireAuth
