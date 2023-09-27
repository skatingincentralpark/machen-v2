"use client";
import styled from "@emotion/styled";
import {
  CalendarSheet,
  CalendarSheetClose,
  CalendarSheetContent,
  CalendarSheetContentInner,
  CalendarSheetOverlay,
  CalendarSheetTitle,
  CalendarSheetTrigger,
} from "@/components/UI/CalendarSheet";
import { media } from "@/lib/media-queries";
import { useNotes } from "@/context/NotesContext";
import { type NotesData } from "@/types/note";
import { ScrollArea } from "@/components/UI/ScrollArea";
import { Button } from "@/components/UI/Button";

import dynamic from "next/dynamic";

const NoteViewer = dynamic(() => import("./NoteViewer"), {
  ssr: false,
  loading: () => <Loading />,
});

const Loading = () => <LoadingWrapper>Loading...</LoadingWrapper>;
const LoadingWrapper = styled.div`
  padding: 1rem;
  background: #fff;
  height: 10rem;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const NotesList = () => {
  return (
    <CalendarSheet>
      <CalendarSheetTrigger asChild>
        <Trigger>All Notes</Trigger>
      </CalendarSheetTrigger>

      <CalendarSheetContent>
        <NotesListContent />
      </CalendarSheetContent>
    </CalendarSheet>
  );
};

export default NotesList;

const Trigger = styled.button`
  outline: 1px solid black;
  outline-offset: -0.5px;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 2 / 9;

  ${media.md} {
    grid-column: auto;
  }
`;

const Inner = styled(CalendarSheetContentInner)`
  padding: 1rem;
  background-color: var(--subtle-off-white-coloring);
`;

const NotesListContent = () => {
  const { notes } = useNotes();

  interface Note {
    date: Date;
    text: string;
  }

  function convertNotesDataToArray(data: NotesData): Note[] {
    const notesArray: Note[] = [];

    for (const year in data) {
      for (const month in data[Number(year)]) {
        for (const day in data[Number(year)]?.[Number(month)]) {
          const note = data[Number(year)]?.[Number(month)]?.[Number(day)];
          // Need to add 1 to month because Date() expects 0-11, but getMonth() returns 0-12 LOL
          const monthNonZeroIndexed = Number(month) + 1;
          const date = new Date(`${year}-${monthNonZeroIndexed}-${day}`);

          if (!note) continue;
          notesArray.push({ date, text: note.text });
        }
      }
    }

    return notesArray;
  }

  const notesArray = convertNotesDataToArray(notes);

  return (
    <>
      <Inner startRow={2}>
        <CalendarSheetTitle className="sr-only">
          All Your Notes
        </CalendarSheetTitle>

        <CalendarSheetClose asChild>
          <Button>Close</Button>
        </CalendarSheetClose>

        <ScrollArea viewport={{ border: "none" }}>
          <ScrollAreaInner>
            {notesArray.length === 0 && (
              <p>You haven&apos;t written any notes yet.</p>
            )}

            {notesArray.map((note) => (
              <NoteViewer
                editorStateString={note.text}
                key={note.date.toLocaleDateString()}
                date={note.date}
              />
            ))}
          </ScrollAreaInner>
        </ScrollArea>
      </Inner>

      <CalendarSheetClose asChild>
        <CalendarSheetOverlay />
      </CalendarSheetClose>
    </>
  );
};

const ScrollAreaInner = styled.div`
  padding-right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 50rem;

  ${media.sm} {
    padding-right: 1rem;
  }
`;
