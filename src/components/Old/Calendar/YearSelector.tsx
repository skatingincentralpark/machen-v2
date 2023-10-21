"use client";
import styled from "@emotion/styled";
import {
  CalendarSheet,
  CalendarSheetClose,
  CalendarSheetContent,
  CalendarSheetContentInner,
  CalendarSheetDescription,
  CalendarSheetOverlay,
  CalendarSheetTitle,
  CalendarSheetTrigger,
} from "@/components/UI/CalendarSheet";
import { setYear } from "date-fns";
import { Button } from "../UI/Button";
import { useDate } from "@/context/DateContext";

const YearSelector = () => {
  const { currentDate, setCurrentDate } = useDate();
  const years = [2017, 2018, 2019, 2021, 2022, 2023, 2024];
  const currentYear = currentDate.getFullYear();

  return (
    <CalendarSheet>
      <CalendarSheetTrigger asChild>
        <YearTrigger title="Select a year">
          <div>{currentYear}</div>
        </YearTrigger>
      </CalendarSheetTrigger>

      <CalendarSheetContent>
        <Inner>
          <CalendarSheetTitle className="sr-only">
            Select Year
          </CalendarSheetTitle>
          <CalendarSheetDescription className="sr-only">
            Change the year here
          </CalendarSheetDescription>

          <ButtonContainer>
            <CalendarSheetClose asChild>
              <Button aria-label="Close">Close</Button>
            </CalendarSheetClose>
            {years.map((y) => {
              return (
                <Button
                  key={y}
                  variant={currentYear === y ? "active" : "primary"}
                  onClick={() => setCurrentDate(setYear(currentDate, y))}
                  aria-label={`Select ${y}`}
                  className={currentYear === y ? "active" : ""}
                >
                  {y}
                </Button>
              );
            })}
          </ButtonContainer>
        </Inner>

        <CalendarSheetClose asChild>
          <CalendarSheetOverlay />
        </CalendarSheetClose>
      </CalendarSheetContent>
    </CalendarSheet>
  );
};

export default YearSelector;

const YearTrigger = styled.button`
  outline: 1px solid black;
  outline-offset: -0.5px;
  grid-row-start: 13;
  grid-row-end: 19;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    writing-mode: vertical-rl;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Inner = styled(CalendarSheetContentInner)`
  padding: 1rem;
`;
