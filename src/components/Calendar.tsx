"use client";
import styled from "@emotion/styled";

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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Calendar = () => {
  const cells = [...Array(42).keys()];

  return (
    <CalendarWrapper>
      <MonthLabels>
        {months.map((month, index) => (
          <MonthLabel key={index}>{month[0]}</MonthLabel>
        ))}
        <YearWrapper />
      </MonthLabels>
      <DayLabels>
        {days.map((day, index) => (
          <DayLabel key={index}>
            <span>{day.slice(0, 1)}</span>
            <span>{day.slice(1, 3)}</span>
          </DayLabel>
        ))}
      </DayLabels>
      <DayCells>
        {cells.map((cell, index) => (
          <DayCell key={index}>
            <div>{cell}</div>
          </DayCell>
        ))}
      </DayCells>
      <Notes>alksdnslk</Notes>
    </CalendarWrapper>
  );
};

export default Calendar;

const media = {
  ["xs"]: "@media (min-width: 350px)",
  ["sm"]: "@media (min-width: 520px)",
  ["md"]: "@media (min-width: 740px)",
  ["lg"]: "@media (min-width: 960px)",
  ["xl"]: "@media (min-width: 1180px)",
  ["2xl"]: "@media (min-width: 1400px)",
  ["3xl"]: "@media (min-width: 1620px)",
} as const;

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: 2rem auto;
  grid-template-rows: 2rem auto;
  max-width: 800px;
  box-sizing: border-box;
  font-size: 14px;
  max-width: 800px;
  height: 80vh;

  ${media["3xl"]} {
    max-width: 1200px;
  }

  ${media.sm} {
    height: auto;
  }
`;

const Notes = styled.div`
  outline: 1px solid black;
  outline-offset: -0.5px;
  width: 200px;
  grid-column: 9 / 10;
  grid-row: 2 / 3;
  padding: 0.2rem;
  display: none;

  ${media.md} {
    display: block;
  }
`;

const DayLabels = styled.div`
  font-weight: bold;
  outline: 1px solid black;
  outline-offset: -0.5px;
  grid-column: 2 / 9;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const MonthLabels = styled.div`
  outline: 1px solid black;
  outline-offset: -0.5px;
  grid-row-start: 2;
  display: grid;
  grid-template-rows: repeat(18, 1fr);
`;
const DayCells = styled.div`
  outline: 1px solid black;
  outline-offset: -0.5px;
  grid-column: 2 / 9;
  grid-row-start: 2;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
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
const MonthLabel = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  outline: 1px solid black;
  outline-offset: -0.5px;
`;
const DayCell = styled.div`
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

const YearWrapper = styled.div`
  outline: 1px solid black;
  outline-offset: -0.5px;
  grid-row-start: 13;
  grid-row-end: 19;
`;
