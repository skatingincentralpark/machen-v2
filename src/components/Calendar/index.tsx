"use client";
import styled from "@emotion/styled";
import { useState } from "react";

import Months from "@/components/Calendar/Months";
import Weekdays from "@/components/Calendar/Weekdays";
import DayCells from "@/components/Calendar/DayCells";
import Notes from "@/components/Calendar/Notes";

import { media } from "@/lib/media-queries";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <CalendarWrapper>
      <Months currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <Weekdays />
      <DayCells currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <Notes currentDate={currentDate} />
    </CalendarWrapper>
  );
};

export default Calendar;

const CalendarWrapper = styled.div`
  position: relative;
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

  ${media.md} {
    grid-template-columns: 2rem repeat(7, 1fr) 15rem;
  }

  ${media.sm} {
    height: auto;
  }
`;
