"use client";
import styled from "@emotion/styled";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetContentInner,
  SheetDescription,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/UI/Sheet";

import { media } from "@/lib/media-queries";
import { weekdays } from "@/lib/date";

import dynamic from "next/dynamic";

import { type Dispatch, type SetStateAction } from "react";
import { type NotesData } from "@/types/note";
import { type LexicalEditor } from "lexical";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
  loading: () => <Loading />,
});

const Loading = () => <div>Loading...</div>;

interface Props {
  date: Date;
  currentDate: Date;
  onClick: (date: Date) => void;
  text: string | undefined;
  setNotes: Dispatch<SetStateAction<NotesData>>;
}

const DayCell = ({ date, currentDate, onClick, text, setNotes }: Props) => {
  const localeDateString = date.toLocaleDateString(undefined, {
    dateStyle: "long",
  });

  const weekday = weekdays[date.getDay()];

  function saveNote(editor: LexicalEditor, isEmpty: () => boolean) {
    setNotes((prevNotes) => {
      const editorStateJson = JSON.stringify(editor.getEditorState());

      const month = currentDate.getMonth();
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();

      const newNotes = {
        ...prevNotes,
      };

      if (isEmpty()) {
        delete newNotes[year]?.[month]?.[day];
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
      localStorage.setItem("machen-data", JSON.stringify(newNotes));
      return newNotes;
    });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Cell
          onClick={() => onClick(date)}
          isSelected={
            date.toLocaleDateString() === currentDate.toLocaleDateString()
          }
          hasNote={!!text}
          aria-label={`Select ${weekday}, ${localeDateString}`}
        >
          {date.getDate()}
        </Cell>
      </SheetTrigger>

      <SheetContent>
        <SheetContentInnerV2 startRow={2}>
          <Inner>
            <SheetTitle>Note for date: {localeDateString}</SheetTitle>
            <SheetDescription className="sr-only">
              Edit your note here
            </SheetDescription>

            <Editor
              editorStateString={text}
              save={saveNote}
              deleteText={deleteNote}
            />
          </Inner>
        </SheetContentInnerV2>

        <SheetClose asChild>
          <SheetOverlay />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default DayCell;

const SheetContentInnerV2 = styled(SheetContentInner)`
  background-color: var(--subtle-off-white-coloring);
`;
const Inner = styled.div`
  max-width: 50rem;
  background-color: #fff;
  padding: 1rem;
  margin: 0;
  border: 1px solid #ccc;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  height: 100%;
  width: 100%;

  ${media.sm} {
    margin: 1rem;
    height: calc(100% - 2rem);
    width: calc(100% - 2rem);
  }
`;
const Cell = styled.button<{ isSelected: boolean; hasNote: boolean }>`
  outline: 1px solid black;
  outline-offset: -0.5px;
  aspect-ratio: initial;
  width: 100%;
  color: ${({ isSelected }) => (isSelected ? "red" : "#000")};
  background-color: ${({ hasNote }) => (hasNote ? "var(--highlight)" : "#fff")};
  display: flex;
  padding: 0.5rem;
  transition: var(--cell-transition);

  ${media.sm} {
    aspect-ratio: 1;
  }

  & > div {
    padding: 0.2rem;
  }

  &:focus {
    z-index: 2;
  }
`;
