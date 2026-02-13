"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { ChevronLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRightContext } from "@/context/right-context"
import { NoteFormInput, noteSchema } from "@/app/_schema"
import Menu from "./menu"
import NoteForm from "../forms/note-form"
import { useNoteContext } from "@/context/note-context"

const AddNoteView = () => {
  const { setView } = useRightContext()
  const { addNote, refetchNotes, addNotePending } = useNoteContext()

  const form = useForm<NoteFormInput>({
    resolver: zodResolver(noteSchema),
  })

  const onSubmit = async (data: NoteFormInput) => {
    addNote(data, () => refetchNotes())
  }

  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <div className="flex items-center gap-2">
          <Menu />
          <h1 className="text-xl font-semibold">Add Note</h1>
        </div>
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => setView("notes")}
        >
          <ChevronLeft />
          Go Back
        </Button>
      </div>
      <Separator className="my-3" />
      <NoteForm form={form} onSubmit={onSubmit} isLoading={addNotePending} />
    </>
  )
}

export default AddNoteView
