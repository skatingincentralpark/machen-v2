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

interface Props {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

const DayCells = ({ currentDate, setCurrentDate }: Props) => {
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const datesInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(lastDayOfMonth),
  });

  /** To ensure 42 cells always */
  const extraCells = eachDayOfInterval({
    start: subWeeks(startOfWeek(firstDayOfMonth), 1),
    end: subDays(startOfWeek(firstDayOfMonth), 1),
  });

  return (
    <>
      <Cells>
        {datesInMonth.length === 35 &&
          extraCells.map((cell, index) => (
            <DayCell
              key={`${cell.getMonth()}/${index}`}
              currentDate={currentDate}
              date={cell}
              onClick={() => setCurrentDate(cell)}
            />
          ))}

        {datesInMonth.map((cell, index) => (
          <DayCell
            key={`${cell.getMonth()}/${index}`}
            currentDate={currentDate}
            date={cell}
            onClick={() => setCurrentDate(cell)}
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
