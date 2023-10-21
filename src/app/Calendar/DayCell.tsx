import { styleTokens } from "@/lib/style-tokens";
import styled from "@emotion/styled";
import { DialogRoot, DialogTrigger } from "../UI/Dialog";
import Editor from "./Editor";
import { useDate } from "@/context/DateContext";

interface Props {
  date: Date;
  currentDate: Date;
  text: string | undefined;
}

export default function DayCell({ date, currentDate, text }: Props) {
  const notCurrentMonth = date.getMonth() !== currentDate.getMonth();
  const isToday = date.toDateString() === new Date().toDateString();
  const hasNote = !!text;
  const cellDay = date.getDay();
  const isWeekend = cellDay === 0 || cellDay === 6;
  const variant = isToday
    ? "today"
    : hasNote
    ? "hasNote"
    : isWeekend
    ? "isWeekend"
    : "default";

  const { setCurrentDate } = useDate();

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Cell muted={notCurrentMonth} onClick={() => setCurrentDate(date)}>
          <DateBadge variant={variant}>{date.getDate()}</DateBadge>
        </Cell>
      </DialogTrigger>
      <Editor />
    </DialogRoot>
  );
}

interface CellProps {
  muted: boolean;
}
const Cell = styled.button<CellProps>`
  outline: 1px solid ${styleTokens.color.gray[200]};
  background-color: ${({ muted }) =>
    muted ? styleTokens.color.gray[100] : styleTokens.color.white};
  outline-offset: -0.5px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: ${styleTokens.space[1]};
  height: fit-content;
  aspect-ratio: 1;
  color: ${styleTokens.color.gray["400"]};
  transition: padding 0.2s ease-in-out;

  ${styleTokens.media.sm} {
    padding: ${styleTokens.space[2]};
    height: 100%;
    aspect-ratio: initial;
  }

  &:active {
    background-color: ${styleTokens.color.gray[200]};
  }
`;
// type BadgeVariants  = "today" | "hasNote" | "default";
const badgeVariants = {
  isWeekend: {
    backgroundColor: "none",
    color: styleTokens.color.slate["200"],
  },
  default: {
    backgroundColor: "none",
    color: "inherit",
  },
  hasNote: {
    backgroundColor: styleTokens.color.gray[300],
    color: styleTokens.color.slate["300"],
  },
  today: {
    backgroundColor: styleTokens.color.blue,
    color: styleTokens.color.white,
  },
} as const;
interface DateBadgeProps {
  variant: keyof typeof badgeVariants;
}
const DateBadge = styled.div<DateBadgeProps>`
  background-color: ${({ variant }) => badgeVariants[variant].backgroundColor};
  color: ${({ variant }) => badgeVariants[variant].color};
  border-radius: 50%;
  aspect-ratio: 1;
  padding: ${styleTokens.space[0]};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: ${styleTokens.size["2xl"]};
  font-weight: normal;
  transition: font-size 0.2s ease-in-out, background-color 0.2s ease-in-out;

  ${styleTokens.media.sm} {
    padding: ${styleTokens.space[2]};
    height: fit-content;
    width: fit-content;
    font-size: ${styleTokens.size["lg"]};
    font-weight: bold;
  }
`;
