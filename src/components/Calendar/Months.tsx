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

const Months = () => {
  return (
    <MonthLabels>
      {months.map((month, index) => (
        <MonthLabel key={index}>{month[0]}</MonthLabel>
      ))}
      <YearWrapper />
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
const YearWrapper = styled.div`
  outline: 1px solid black;
  outline-offset: -0.5px;
  grid-row-start: 13;
  grid-row-end: 19;
`;
