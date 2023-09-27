"use client";
import styled from "@emotion/styled";

import {
  CalendarSheet,
  CalendarSheetTrigger,
} from "@/components/UI/CalendarSheet";

import { media } from "@/lib/media-queries";
import { weekdays } from "@/lib/date";

import DayCellCalendarSheetContent from "./SheetContent";
import { useDate } from "@/context/DateContext";

interface Props {
  date: Date;
  currentDate: Date;
  text: string | undefined;
}

const DayCell = ({ date, currentDate, text }: Props) => {
  const { setCurrentDate } = useDate();
  const localeDateString = date.toLocaleDateString(undefined, {
    dateStyle: "long",
  });

  const weekday = weekdays[date.getDay()];

  return (
    <CalendarSheet>
      <CalendarSheetTrigger asChild>
        <Cell
          onClick={() => setCurrentDate(date)}
          isSelected={
            date.toLocaleDateString() === currentDate.toLocaleDateString()
          }
          hasNote={!!text}
          aria-label={`Select ${weekday}, ${localeDateString}`}
        >
          {date.getDate()}
        </Cell>
      </CalendarSheetTrigger>

      <DayCellCalendarSheetContent
        currentDate={currentDate}
        text={text}
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
