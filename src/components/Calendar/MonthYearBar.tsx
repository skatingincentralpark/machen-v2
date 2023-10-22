import styled from "@emotion/styled";
import { months } from "@/lib/date";
import { styleTokens } from "@/lib/style-tokens";
import { useDate } from "@/context/DateContext";
import { setMonth } from "date-fns";
import YearDialog from "./YearDialog";
import { ButtonBaseMonthYear } from "../UI/Button";

export default function MonthYearSelector() {
  const { currentDate, setCurrentDate } = useDate();

  return (
    <Wrapper>
      {months.map((month, index) => (
        <MonthButton
          onClick={() => setCurrentDate(setMonth(currentDate, index))}
          variant={currentDate.getMonth() === index ? "selected" : "default"}
          key={index}
        >
          {month[0]}
        </MonthButton>
      ))}
      <YearDialog />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;

  outline: 1px solid ${styleTokens.color.gray[300]};
  outline-offset: -0.5px;
`;
interface MonthButtonProps {
  variant: "selected" | "default";
}
const monthButtonVariants = {
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
const MonthButton = styled(ButtonBaseMonthYear)<MonthButtonProps>`
  text-transform: uppercase;
  aspect-ratio: 1;
  max-height: 3rem;
  outline: 1px solid ${styleTokens.color.gray[300]};
  outline-offset: -0.5px;
  background-color: ${({ variant }) => monthButtonVariants[variant].bgColor};
  color: ${({ variant }) => monthButtonVariants[variant].color};

  &:active {
    background-color: ${({ variant }) =>
      monthButtonVariants[variant].activeBgColor};
  }
`;
