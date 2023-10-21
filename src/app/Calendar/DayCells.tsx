"use client";
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
import { useDate } from "@/context/DateContext";
import { styleTokens } from "@/lib/style-tokens";
import { NOTES_DATA_V2 } from "@/lib/data-calendar-v2";
import DayCell from "./DayCell";

export default function DayCells() {
  const { currentDate } = useDate();

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
    const notesForDay = NOTES_DATA_V2?.[year]?.[month]?.[date.getDate()];

    if (notesForDay) {
      day.text = notesForDay.text;
    }

    return day;
  });

  return (
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
