"use client";
import styled from "@emotion/styled";

import { $getRoot } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { CalendarSheetClose } from "@/components/UI/CalendarSheet";
import { Button } from "@/components/UI/Button";
import { default as LexicalEditorComponent } from "@/components/Editor";

import LexicalComposer from "@/components/Editor/LexicalComposer";
import { useNotes } from "@/context/NotesContext";

export interface NoteEditorProps {
  currentDate: Date;
  text: string | undefined;
}

const NoteEditor = (props: NoteEditorProps) => {
  return (
    <LexicalComposer>
      <WrappedComponents {...props} />
    </LexicalComposer>
  );
};

const WrappedComponents = ({ currentDate, text }: NoteEditorProps) => {
  const [editor] = useLexicalComposerContext();
  const { saveNote, deleteNote } = useNotes();

  return (
    <>
      <LexicalEditorComponent editorStateString={text} />

      <ButtonWrapper>
        <CalendarSheetClose asChild>
          <Button aria-label="Close editor">Close</Button>
        </CalendarSheetClose>
        <CalendarSheetClose asChild>
          <Button onClick={() => saveNote(editor, currentDate, $getRoot)}>
            Save
          </Button>
        </CalendarSheetClose>
        <CalendarSheetClose asChild>
          <Button onClick={() => deleteNote(currentDate)} variant="destructive">
            Delete Note
          </Button>
        </CalendarSheetClose>
      </ButtonWrapper>
    </>
  );
};

export default NoteEditor;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
