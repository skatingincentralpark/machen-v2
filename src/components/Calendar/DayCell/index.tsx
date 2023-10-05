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
import { useState } from "react";

interface Props {
  date: Date;
  currentDate: Date;
  text: string | undefined;
}

const DayCell = ({ date, currentDate, text }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentDate } = useDate();
  const localeDateString = date.toLocaleDateString(undefined, {
    dateStyle: "long",
  });

  const weekday = weekdays[date.getDay()];
  const notCurrentMonth = date.getMonth() !== currentDate.getMonth();
  const getVariant = () => {
    if (notCurrentMonth) return "muted";
    if (text) return "highlight";
    return "default";
  };

  return (
    <CalendarSheet
      open={isOpen}
      onOpenChange={() => !notCurrentMonth && setIsOpen((prev) => !prev)}
    >
      <CalendarSheetTrigger asChild>
        <Cell
          onClick={() => {
            setCurrentDate(date);
          }}
          isSelected={
            date.toLocaleDateString() === currentDate.toLocaleDateString()
          }
          variant={getVariant()}
          aria-label={`Select ${weekday}, ${localeDateString}`}
        >
          {date.getDate()}
        </Cell>
      </CalendarSheetTrigger>
      {isOpen && (
        <DayCellCalendarSheetContent
          currentDate={currentDate}
          text={text}
          localeDateString={localeDateString}
        />
      )}
    </CalendarSheet>
  );
};

export default DayCell;

const variants = {
  default: "#fff",
  highlight: "var(--highlight)",
  muted: "#d3d3d3",
};

const Cell = styled.button<{
  isSelected: boolean;
  variant: keyof typeof variants;
}>`
  outline: 1px solid black;
  outline-offset: -0.5px;
  aspect-ratio: initial;
  width: 100%;
  color: ${({ isSelected }) => (isSelected ? "red" : "#000")};
  background-color: ${({ variant }) => variants[variant]};
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
