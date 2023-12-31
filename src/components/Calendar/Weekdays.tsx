"use client";
import { media } from "@/lib/media-queries";
import styled from "@emotion/styled";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Weekdays = () => {
  return (
    <DayLabels aria-label="Select a day">
      {days.map((day, index) => (
        <DayLabel key={index} aria-hidden>
          <span>{day.slice(0, 1)}</span>
          <span>{day.slice(1, 3)}</span>
        </DayLabel>
      ))}
    </DayLabels>
  );
};

export default Weekdays;

const DayLabels = styled.div`
  font-weight: bold;
  outline: 1px solid black;
  outline-offset: -0.5px;
  grid-column: 2 / 9;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  overflow: hidden;
  border-radius: var(--border-radius) var(--border-radius) 0 0;

  ${media.md} {
    border-radius: var(--border-radius) 0 0 0;
  }
`;
const DayLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.2rem;
  text-align: center;
  outline: 1px solid black;
  outline-offset: -0.5px;

  & > span:last-of-type {
    display: none;

    ${media.xs} {
      display: block;
    }
  }
`;
