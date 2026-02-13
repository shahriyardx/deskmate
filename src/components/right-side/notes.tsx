"use client"

import { Button } from "../ui/button"
import { PlusIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRightContext } from "@/context/right-context"
import Menu from "./menu"
import { useNoteContext } from "@/context/note-context"

const NotesView = () => {
  const { setView } = useRightContext()
  const { notes } = useNoteContext()
  console.log(notes)
  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <div className="flex items-center gap-2">
          <Menu />
          <h1 className="text-xl font-semibold">Notes</h1>
        </div>
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => setView("add-note")}
        >
          <PlusIcon />
          Add Note
        </Button>
      </div>

      <Separator className="my-3" />
      <div className="columns-2 space-y-4">
        {notes?.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-lg bg-secondary/50 break-inside-avoid"
          >
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <p>
              <pre className="text-muted-foreground line-clamp-10 whitespace-pre-line">
                {note.description}
              </pre>
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default NotesView
