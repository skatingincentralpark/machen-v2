"use client";
import styled from "@emotion/styled";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useDate } from "@/context/DateContext";
import { styleTokens } from "@/lib/style-tokens";
import DayCell from "./DayCell";
import { useNotesV2 } from "@/context/NotesContextV2";

export default function DayCells() {
  const { currentDate } = useDate();
  const { notes } = useNotesV2();

  interface Day {
    title: string | undefined;
    content: string | undefined;
    date: Date;
  }

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const datesInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(lastDayOfMonth),
  });

  /** To ensure 42 cells always */
  const lastDayOfDates = datesInMonth[datesInMonth.length - 1];
  const needsExtraCells = datesInMonth.length === 35 && lastDayOfDates;
  const extraDatesInMonth =
    (needsExtraCells &&
      eachDayOfInterval({
        start: add(lastDayOfDates, { days: 1 }),
        end: add(lastDayOfDates, { days: 7 }),
      })) ||
    [];

  const cells = [...datesInMonth, ...extraDatesInMonth].map((date) => {
    const day: Day = {
      title: undefined,
      content: undefined,
      date,
    };

    const month = date.getMonth();
    const year = date.getFullYear();
    const notesForDay = notes?.[year]?.[month]?.[date.getDate()];

    if (notesForDay) {
      day.content = notesForDay.content;
      day.title = notesForDay.title;
    }

    return day;
  });

  return (
    <Cells>
      {cells.map((cell, index) => (
        <DayCell
          key={`cell-${cell.date.getMonth()}/${index}`}
          currentDate={currentDate}
          date={cell.date}
          title={cell.title}
          content={cell.content}
        />
      ))}
    </Cells>
  );
}

const Cells = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: initial;

  ${styleTokens.media.sm} {
    height: 100%;
  }
`;
