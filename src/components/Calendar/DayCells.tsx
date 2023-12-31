"use client";
import styled from "@emotion/styled";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import DayCell from "@/components/Calendar/DayCell";
import { useNotes } from "@/context/NotesContext";
import { useDate } from "@/context/DateContext";

const DayCells = () => {
  const { notes } = useNotes();
  const { currentDate } = useDate();

  interface Day {
    text: string | undefined;
    date: Date;
  }

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startOfFirstWeek = startOfWeek(firstDayOfMonth);
  const endOfLastWeek = endOfWeek(lastDayOfMonth);

  const datesInMonth = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });

  /** To ensure 42 cells always */
  const extraDatesInMonth =
    datesInMonth.length === 35
      ? eachDayOfInterval({
          start: addDays(endOfLastWeek, 1),
          end: endOfWeek(addDays(endOfLastWeek, 1)),
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
