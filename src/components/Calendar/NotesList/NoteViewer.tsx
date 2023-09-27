"use client";
import styled from "@emotion/styled";

import { default as LexicalEditorComponent } from "@/components/Editor";
import LexicalComposer from "@/components/Editor/LexicalComposer";
import { Button } from "@/components/UI/Button";
import { useNotes } from "@/context/NotesContext";

export interface NoteEditorProps {
  editorStateString: string | undefined;
  date: Date;
}

const NoteViewer = (props: NoteEditorProps) => {
  return (
    <LexicalComposer readOnly>
      <WrappedComponents {...props} />
    </LexicalComposer>
  );
};

const WrappedComponents = ({ editorStateString, date }: NoteEditorProps) => {
  const { deleteNote } = useNotes();
  const localeDateString = date.toLocaleDateString(undefined, {
    dateStyle: "long",
  });

  return (
    <>
      <NoteHeader>
        <DateText>{localeDateString}</DateText>
        <DeleteButton onClick={() => deleteNote(date)} variant="destructive">
          Delete
        </DeleteButton>
      </NoteHeader>
      <LexicalEditorComponent editorStateString={editorStateString} readOnly />
    </>
  );
};

export default NoteViewer;

const DateText = styled.h3`
  font-size: 1.2rem;
`;
const NoteHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const DeleteButton = styled(Button)`
  height: fit-content;
`;
