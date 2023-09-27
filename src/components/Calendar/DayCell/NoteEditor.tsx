"use client";
import styled from "@emotion/styled";

import { $getRoot, type LexicalEditor } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { CalendarSheetClose } from "@/components/UI/CalendarSheet";
import { Button } from "@/components/UI/Button";
import { default as LexicalEditorComponent } from "@/components/Editor";

import { type NotesData } from "@/types/note";
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
  const { setNotes } = useNotes();

  function isEditorEmpty() {
    return editor.getEditorState().read(() => {
      const root = $getRoot();
      const rootFirstChild = root.getFirstChild();
      if (!rootFirstChild) return true;

      /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
      const fcEmpty = rootFirstChild.isEmpty() as boolean;
      const isEmpty = fcEmpty && root.getChildrenSize() === 1;
      return isEmpty;
    });
  }

  function deleteYearIfEmpty(newNotes: NotesData, year: number) {
    const yearIsEmpty = Object.keys(newNotes[year] ?? {}).length === 0;

    if (yearIsEmpty) {
      delete newNotes[year];
    }
  }

  function deleteMonthIfEmpty(
    newNotes: NotesData,
    year: number,
    month: number
  ) {
    const monthIsEmpty =
      Object.keys(newNotes[year]?.[month] ?? {}).length === 0;

    if (monthIsEmpty) {
      delete newNotes[year]?.[month];
      deleteYearIfEmpty(newNotes, year);
    }
  }

  function saveNote(editor: LexicalEditor) {
    setNotes((prevNotes) => {
      const editorStateJson = JSON.stringify(editor.getEditorState());

      const month = currentDate.getMonth();
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();

      const newNotes = {
        ...prevNotes,
      };

      if (isEditorEmpty()) {
        delete newNotes[year]?.[month]?.[day];
        deleteMonthIfEmpty(newNotes, year, month);
      } else {
        newNotes[year] = {
          ...newNotes[year],
          [month]: {
            ...newNotes[year]?.[month],
            [day]: { text: editorStateJson },
          },
        };
      }

      localStorage.setItem("machen-data", JSON.stringify(newNotes));

      return newNotes;
    });
  }

  function deleteNote() {
    setNotes((prevNotes) => {
      const month = currentDate.getMonth();
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();

      const newNotes = {
        ...prevNotes,
      };
      delete newNotes[year]?.[month]?.[day];

      deleteMonthIfEmpty(newNotes, year, month);

      localStorage.setItem("machen-data", JSON.stringify(newNotes));
      return newNotes;
    });
  }

  return (
    <>
      <LexicalEditorComponent editorStateString={text} />

      <ButtonWrapper>
        <CalendarSheetClose asChild>
          <Button aria-label="Close editor">Close</Button>
        </CalendarSheetClose>
        <CalendarSheetClose asChild>
          <Button onClick={() => saveNote(editor)}>Save</Button>
        </CalendarSheetClose>
        <CalendarSheetClose asChild>
          <Button onClick={deleteNote} variant="destructive">
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
