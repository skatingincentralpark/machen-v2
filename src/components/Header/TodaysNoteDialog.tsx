import PlainTextEditor, {
  EditorDialogContent,
} from "@/components/Calendar/Editor";
import { DialogRoot, DialogTrigger } from "../UI/Dialog";
import { ReactNode, useState } from "react";
import { useNotesV2 } from "@/context/NotesContext";

export default function TodaysNoteDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { todaysNote } = useNotesV2();

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
