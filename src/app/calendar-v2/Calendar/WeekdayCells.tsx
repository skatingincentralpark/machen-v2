"use client";

import { styleTokens } from "@/lib/style-tokens";
import styled from "@emotion/styled";
import { weekdays } from "@/lib/date";

export default function WeekdayCells() {
  const isWeekend = (day: string) => day === "Saturday" || day === "Sunday";

  return (
    <DayLabels>
      {weekdays.map((day, index) => (
        <DayLabel key={index} aria-hidden muted={isWeekend(day)}>
          <span>{day.slice(0, 3)}</span>
          <span>{day.slice(3, day.length)}</span>
        </DayLabel>
      ))}
    </DayLabels>
  );
}

const DayLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding-top: ${styleTokens.space[2]};
  padding-bottom: ${styleTokens.space[2]};
  color: ${styleTokens.color.gray[400]};
  font-weight: normal;
`;
interface DayLabelProps {
  muted: boolean;
}
const DayLabel = styled.div<DayLabelProps>`
  display: flex;
  justify-content: center;
  text-align: center;
  color: ${({ muted }) => (muted ? styleTokens.color.gray[300] : "inherit")};

  & > span:last-of-type {
    display: none;

    ${styleTokens.media.md} {
      display: block;
    }
  }
`;
