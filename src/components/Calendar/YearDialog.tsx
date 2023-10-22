import React from "react";
import { DialogContent, DialogRoot, DialogTrigger } from "../UI/Dialog";
import styled from "@emotion/styled";
import { ButtonBaseMonthYear } from "../UI/Button";
import { styleTokens } from "@/lib/style-tokens";
import { useDate } from "@/context/DateContext";
import { setYear } from "date-fns";

function getYearsArray() {
  const currentYear = new Date().getFullYear();
  const startYear = 2017;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
}

export default function YearDialog() {
  const { currentDate, setCurrentDate } = useDate();
  const years = getYearsArray();
  const currentYear = currentDate.getFullYear();

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <VerticalButton variant="default">
          <div>{currentYear}</div>
        </VerticalButton>
      </DialogTrigger>
      <Content>
        {years.map((y) => (
          <VerticalButton
            key={`year-btn-${y}`}
            onClick={() => setCurrentDate(setYear(currentDate, y))}
            variant={currentYear === y ? "selected" : "default"}
          >
            <div>{y}</div>
          </VerticalButton>
        ))}
      </Content>
    </DialogRoot>
  );
}

const Content = styled(DialogContent)`
  background-color: red;
  height: 100%;
  position: absolute;
  left: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;
interface VerticalButtonProps {
  variant: "selected" | "default";
}
const verticalButtonVariants = {
  default: {
    bgColor: "",
    color: "",
    activeBgColor: "",
  },
  selected: {
    bgColor: styleTokens.color.gray[400],
    color: styleTokens.color.white,
    activeBgColor: styleTokens.color.slate[300],
  },
} as const;
const VerticalButton = styled(ButtonBaseMonthYear)<VerticalButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  outline: 1px solid ${styleTokens.color.gray[300]};
  outline-offset: -0.5px;
  background-color: ${({ variant }) => verticalButtonVariants[variant].bgColor};
  color: ${({ variant }) => verticalButtonVariants[variant].color};

  & > div {
    writing-mode: vertical-rl;
  }
`;
