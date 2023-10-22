import PlainTextEditor, {
  EditorDialogContent,
} from "@/components/Calendar/Editor";
import { DialogRoot, DialogTrigger } from "../UI/Dialog";
import { type ReactNode, useState } from "react";
import { useNotes } from "@/context/NotesContext";

export default function TodaysNoteDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { todaysNote } = useNotes();

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <EditorDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <PlainTextEditor
          content={todaysNote?.content}
          title={todaysNote?.title}
          close={() => setOpen(false)}
        />
      </EditorDialogContent>
    </DialogRoot>
  );
}
