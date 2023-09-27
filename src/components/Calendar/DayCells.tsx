"use client";
import { type Dispatch, type SetStateAction } from "react";
import styled from "@emotion/styled";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
  subWeeks,
} from "date-fns";
import DayCell from "@/components/Calendar/DayCell";
import { useNotes } from "@/context/NotesContext";

interface Props {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

const DayCells = ({ currentDate, setCurrentDate }: Props) => {
  const { notes } = useNotes();

  interface Day {
    text: string | undefined;
    date: Date;
  }

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const datesInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(lastDayOfMonth),
  });

  /** To ensure 42 cells always */
  const extraDatesInMonth =
    datesInMonth.length === 35
      ? eachDayOfInterval({
          start: subWeeks(startOfWeek(firstDayOfMonth), 1),
          end: subDays(startOfWeek(firstDayOfMonth), 1),
        })
      : [];

  const cells = [...datesInMonth, ...extraDatesInMonth].map((date) => {
    const day: Day = {
      text: undefined,
      date,
    };

    const month = date.getMonth();
    const year = date.getFullYear();
    const notesForDay = notes?.[year]?.[month]?.[date.getDate()];

    if (notesForDay) {
      day.text = notesForDay.text;
    }

    return day;
  });

  return (
    <>
      <Cells>
        {cells.map((cell, index) => (
          <DayCell
            key={`${cell.date.getMonth()}/${index}`}
            currentDate={currentDate}
            date={cell.date}
            onClick={() => setCurrentDate(cell.date)}
            text={cell.text}
          />
        ))}
      </Cells>
    </>
  );
};

export default DayCells;

const Cells = styled.div`
  outline: 1px solid black;
  outline-offset: -0.5px;
  grid-column: 2 / 9;
  grid-row-start: 2;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
