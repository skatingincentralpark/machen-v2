"use client";
import styled from "@emotion/styled";
import { setMonth } from "date-fns";
import YearSelector from "@/components/Calendar/YearSelector";
import { useDate } from "@/context/DateContext";

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

const Months = () => {
  const { currentDate, setCurrentDate } = useDate();

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
      <YearSelector />
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

  overflow: hidden;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
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
  transition: var(--cell-transition);
`;
