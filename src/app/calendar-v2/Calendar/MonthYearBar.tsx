import styled from "@emotion/styled";
import { months } from "@/lib/date";
import { styleTokens } from "@/lib/style-tokens";

export default function MonthYearSelector() {
  return (
    <Wrapper>
      {months.map((month, index) => (
        <MonthButton key={index}>{month[0]}</MonthButton>
      ))}
      <YearTrigger>
        <div>2022</div>
      </YearTrigger>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
`;
const ButtonBase = styled.button`
  color: ${styleTokens.color.gray[400]};
  background-color: ${styleTokens.color.gray[100]};
  border-right: 1px solid ${styleTokens.color.gray[300]};
  font-weight: bold;
  height: 100%;

  &:active {
    background-color: ${styleTokens.color.gray[300]};
  }
`;
const MonthButton = styled(ButtonBase)`
  text-transform: uppercase;
  aspect-ratio: 1;
  max-height: 3rem;
  outline: 1px solid ${styleTokens.color.gray[300]};
  outline-offset: -0.5px;
`;
const YearTrigger = styled(ButtonBase)`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    writing-mode: vertical-rl;
  }
`;
