"use client";
import styled from "@emotion/styled";
import { type Dispatch, type SetStateAction } from "react";
import { setMonth } from "date-fns";
import YearSelector from "@/components/Calendar/YearSelector";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

const Months = ({ currentDate, setCurrentDate }: Props) => {
  return (
    <MonthLabels aria-label="Select a month">
      {months.map((month, index) => (
        <MonthLabel
          key={index}
          highlighted={currentDate.getMonth() === index}
          onClick={() => setCurrentDate(setMonth(currentDate, index))}
          aria-label={`Select ${month}`}
        >
          {month[0]}
        </MonthLabel>
      ))}
      <YearSelector currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </MonthLabels>
  );
};

export default Months;

const MonthLabels = styled.div`
  outline: 1px solid black;
  outline-offset: -0.5px;
  grid-row-start: 2;
  display: grid;
  grid-template-rows: repeat(18, 1fr);
  font-weight: bold;
`;
const MonthLabel = styled.button<{ highlighted: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  outline: 1px solid black;
  outline-offset: -0.5px;
  background-color: ${({ highlighted }) =>
    highlighted ? "var(--highlight)" : "white"};
`;
