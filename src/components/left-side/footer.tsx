import React from "react"

import { useAuth } from "@/context/auth-context"
import { Fullscreen, LogOutIcon, Maximize, UserIcon } from "lucide-react"
import { Button } from "../ui/button"
import { authClient } from "@/lib/auth/auth-client"
import { useFullScreen } from "@/hooks/use-fullscreen"

const Footer = () => {
  const { data } = useAuth({ required: true })
  const { fullscreen, toggleFullScreen } = useFullScreen()

  return (
    <div className="flex items-center justify-between mt-auto">
      <Button variant={"outline"}>
        <UserIcon size={12} />
        <span>{data?.user.name}</span>
      </Button>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => authClient.signOut()}
          type="button"
          variant={"outline"}
          size={"icon"}
        >
          <LogOutIcon size={15} />
        </Button>
        <Button
          onClick={toggleFullScreen}
          type="button"
          variant={"outline"}
          size={"icon"}
        >
          {fullscreen ? <Fullscreen size={15} /> : <Maximize size={15} />}
        </Button>
      </div>
    </div>
  )
}

export default Footer
