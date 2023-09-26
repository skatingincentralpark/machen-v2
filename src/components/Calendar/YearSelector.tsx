"use client";
import styled from "@emotion/styled";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetContentInner,
  SheetDescription,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/UI/Sheet";
import { type Dispatch, type SetStateAction } from "react";
import { setYear } from "date-fns";
import { Button } from "../UI/Button";

interface Props {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

const YearSelector = ({ currentDate, setCurrentDate }: Props) => {
  const years = [2017, 2018, 2019, 2021, 2022, 2023, 2024];
  const currentYear = currentDate.getFullYear();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <YearTrigger>
          <div>{currentYear}</div>
        </YearTrigger>
      </SheetTrigger>

      <SheetContent>
        <Inner>
          <SheetTitle className="sr-only">Select Year</SheetTitle>
          <SheetDescription className="sr-only">
            Change the year here
          </SheetDescription>

          <ButtonContainer>
            <SheetClose asChild>
              <Button aria-label="Close">Close</Button>
            </SheetClose>
            {years.map((y) => {
              return (
                <YearButton
                  key={y}
                  highlighted={currentYear === y}
                  onClick={() => setCurrentDate(setYear(currentDate, y))}
                  aria-label={`Select ${y}`}
                >
                  {y}
                </YearButton>
              );
            })}
          </ButtonContainer>
        </Inner>

        <SheetClose asChild>
          <SheetOverlay />
        </SheetClose>
      </SheetContent>
    </Sheet>
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

const Inner = styled(SheetContentInner)`
  padding: 1rem;
`;

const YearButton = styled(Button)<{ highlighted: boolean }>`
  background-color: ${({ highlighted }) =>
    highlighted ? "var(--highlight)" : "white"};
`;
