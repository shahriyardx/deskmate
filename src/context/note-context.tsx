"use client"

import { NoteFormInput } from "@/app/_schema"
import { Note } from "@/generated/prisma/client"
import { trpc } from "@/trpc/client"
import { UseMutateFunction } from "@tanstack/react-query"
import { ComponentProps, createContext, useContext } from "react"
import { toast } from "sonner"

const NoteContext = createContext<{
  notes: Note[] | undefined
  refetchNotes: () => void
  addNote: (note: NoteFormInput, callback: () => void) => void
  addNotePending: boolean
  deleteNote: UseMutateFunction<Note, unknown, { id: string }, unknown>
}>({
  notes: undefined,
  refetchNotes: () => {},
  addNote: () => {},
  addNotePending: false,
  deleteNote: () => {},
})

export const NoteProvider = ({ children }: ComponentProps<"div">) => {
  const { data, refetch: refetchNotes } = trpc.note.myNotes.useQuery(
    undefined,
    {
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  )

  const { mutate: addNoteMutation, isPending: addNotePending } =
    trpc.note.addNote.useMutation({
      onSuccess: () => {
        toast.success("Note added successfully")
        refetchNotes()
      },
      onError: () => {
        toast.error("Failed to add note")
      },
    })

  const addNote = (note: NoteFormInput, callback: () => void) =>
    addNoteMutation(note, { onSuccess: callback })

  const { mutate: deleteNote } = trpc.note.deleteNote.useMutation({
    onSuccess: () => {
      refetchNotes()
      toast.success("Note deleted")
    },
    onError: () => toast.error("Failed to delete note"),
  })

  return (
    <NoteContext.Provider
      value={{
        notes: data,
        refetchNotes,
        addNote,
        addNotePending,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}

export const useNoteContext = () => {
  const context = useContext(NoteContext)

  return context
}
