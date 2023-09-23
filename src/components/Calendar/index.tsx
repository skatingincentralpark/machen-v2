"use client";
import styled from "@emotion/styled";
import { useState } from "react";
import { addMonths } from "date-fns";

import Months from "@/components/Calendar/Months";
import Weekdays from "@/components/Calendar/Weekdays";
import DayCells from "@/components/Calendar/DayCells";
import Notes from "@/components/Calendar/Notes";

import { media } from "@/lib/media-queries";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const previousMonth = () => setCurrentDate(addMonths(currentDate, -1));

  return (
    <CalendarWrapper>
      <ButtonWrapper>
        <button onClick={previousMonth}>Back</button>
        <button onClick={nextMonth}>Forward</button>
      </ButtonWrapper>
      <Months />
      <Weekdays />
      <DayCells currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <Notes />
    </CalendarWrapper>
  );
};

export default Calendar;

const ButtonWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 20rem;
`;

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
