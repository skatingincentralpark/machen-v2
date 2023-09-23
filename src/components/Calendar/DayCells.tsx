"use client";
import { Dispatch, SetStateAction } from "react";
import { media } from "@/lib/media-queries";
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

  const extraCells = eachDayOfInterval({
    start: subWeeks(startOfWeek(firstDayOfMonth), 1),
    end: subDays(startOfWeek(firstDayOfMonth), 1),
  });

  const cells = datesInMonth.map((date) => date.getDate());

  return (
    <Cells>
      {datesInMonth.length === 35 &&
        extraCells.map((cell, index) => (
          <Cell key={index}>
            <div>{cell.getDate()}</div>
          </Cell>
        ))}

      {cells.map((cell, index) => (
        <Cell key={index}>
          <div>{cell}</div>
        </Cell>
      ))}
    </Cells>
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

const Cell = styled.div`
  outline: 1px solid black;
  outline-offset: -0.5px;
  aspect-ratio: initial;
  width: 100%;

  ${media.sm} {
    aspect-ratio: 1;
  }

  & > div {
    padding: 0.2rem;
  }
`;
