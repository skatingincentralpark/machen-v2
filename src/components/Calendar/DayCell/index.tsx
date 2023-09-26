"use client";
import styled from "@emotion/styled";

import {
  CalendarSheet,
  CalendarSheetTrigger,
} from "@/components/UI/CalendarSheet";

import { media } from "@/lib/media-queries";
import { weekdays } from "@/lib/date";

import { type Dispatch, type SetStateAction } from "react";
import { type NotesData } from "@/types/note";
import DayCellSheetContent from "./SheetContent";

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

  return (
    <CalendarSheet>
      <CalendarSheetTrigger asChild>
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
      </CalendarSheetTrigger>

      <DayCellSheetContent
        currentDate={currentDate}
        text={text}
        setNotes={setNotes}
        localeDateString={localeDateString}
      />
    </CalendarSheet>
  );
};

export default DayCell;

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
