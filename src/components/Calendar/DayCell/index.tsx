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
import { useEffect, useState } from "react";
import useTransition from "react-transition-state";

interface Props {
  date: Date;
  currentDate: Date;
  text: string | undefined;
}

const DayCell = ({ date, currentDate, text }: Props) => {
  const [isRendered, setIsRendered] = useState(false);
  const { setCurrentDate } = useDate();
  const localeDateString = date.toLocaleDateString(undefined, {
    dateStyle: "long",
  });
  const prerenderedDateString = date.toUTCString();

  const weekday = weekdays[date.getDay()];
  const notCurrentMonth = date.getMonth() !== currentDate.getMonth();
  const getVariant = () => {
    if (notCurrentMonth) return "muted";
    if (text) return "highlight";
    return "default";
  };

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const [{ status, isMounted }, toggle] = useTransition({
    timeout: {
      enter: 200,
      exit: 200,
    },
    mountOnEnter: true,
    unmountOnExit: true,
    preEnter: true,
  });

  return (
    <CalendarSheet open={isMounted} onOpenChange={toggle}>
      <CalendarSheetTrigger asChild>
        <Cell
          role="gridcell"
          name="day-cell"
          data-testid="day-cell"
          onClick={(e) => {
            // Prevent editor from opening if not current month
            notCurrentMonth && e.preventDefault();
            setCurrentDate(date);
          }}
          isSelected={
            date.toLocaleDateString() === currentDate.toLocaleDateString()
          }
          variant={getVariant()}
          aria-label={
            isRendered
              ? `Select ${weekday}, ${localeDateString}`
              : `Select ${prerenderedDateString}`
          }
          className={text !== undefined ? "has-note" : ""}
          title={text !== undefined ? "has-note" : ""}
          // Prevent screen readers from reading out-of-month cells
          // Also helps with finding cells with notes in the current month when testing
          aria-hidden={notCurrentMonth}
        >
          {date.getDate()}
        </Cell>
      </CalendarSheetTrigger>
      {isMounted && (
        <DayCellCalendarSheetContent
          transitionStatus={status}
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
