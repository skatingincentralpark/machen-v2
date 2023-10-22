import { useDate } from "@/context/DateContext";
import { DialogTrigger, DialogPortal, DialogRoot } from "../UI/Dialog";
import PlainTextEditor, { EditorDialogContent } from "./Editor";
import { useState } from "react";
import { NoteForSidebar } from "./Sidebar";
import { ButtonBase } from "../UI/Button";
import styled from "@emotion/styled";
import { styleTokens } from "@/lib/style-tokens";

export default function SidebarRow({ note }: { note: NoteForSidebar }) {
  const { setCurrentDate } = useDate();
  const [open, setOpen] = useState(false);
  const splitDate = note.dateShort.split(" ");

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Row onClick={() => setCurrentDate(note.date)}>
          <RowInner>
            <span>
              <strong>{splitDate[0]} </strong>
              {splitDate[1]}
            </span>

            <span>{note.title || "Untitled"}</span>
          </RowInner>
        </Row>
      </DialogTrigger>
      <DialogPortal>
        <EditorDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <PlainTextEditor
            content={note.content}
            title={note.title}
            close={() => setOpen(false)}
          />
        </EditorDialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}

const Row = styled(ButtonBase)`
  border-top: 1px solid ${styleTokens.color.gray[200]};
  width: 100%;
`;
const RowInner = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: ${styleTokens.space[4]} ${styleTokens.space[8]};
  display: block;
  text-align: left;

  & > span:first-of-type {
    margin-right: ${styleTokens.space[4]};
    color: ${styleTokens.color.slate[300]};
  }
`;
