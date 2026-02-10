"use client"

import { authClient } from "@/lib/auth/auth-client"
import { Session, User } from "better-auth"
import { ComponentProps, createContext, useContext } from "react"

const AuthContext = createContext<{
  data: UseSessionReturn
  isPending: boolean
  isRefetching: boolean
}>({ data: null, isPending: true, isRefetching: false })

type UseSessionReturn = {
  user: User
  session: Session
} | null

export const AuthProvider = ({ children }: ComponentProps<"div">) => {
  const { data, isPending, isRefetching } = authClient.useSession()

  return (
    <AuthContext.Provider value={{ data, isPending, isRefetching }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ({ required = false }: { required?: boolean } = {}) => {
  const context = useContext(AuthContext)

  if (required && !context?.data) {
    throw new Error("No auth context found")
  }

  return {
    ...context,
    data: required ? (context.data as UseSessionReturn) : context.data,
  }
}
