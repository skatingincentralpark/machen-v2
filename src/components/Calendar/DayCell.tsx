import { styleTokens } from "@/lib/style-tokens";
import styled from "@emotion/styled";
import { DialogRoot, DialogTrigger } from "../UI/Dialog";
import { useDate } from "@/context/DateContext";
import PlainTextEditor, { EditorDialogContent } from "./Editor";
import { useState } from "react";

interface Props {
  date: Date;
  currentDate: Date;
  content: string | undefined;
  title: string | undefined;
}

export default function DayCell({ date, currentDate, content, title }: Props) {
  const notCurrentMonth = date.getMonth() !== currentDate.getMonth();

  function getVariant(): keyof typeof badgeVariants {
    const isToday = date.toDateString() === new Date().toDateString();
    const hasNote = !!content;
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    const variant = isToday
      ? "today"
      : hasNote
      ? "hasNote"
      : isWeekend
      ? "isWeekend"
      : "default";

    return variant;
  }

  const { setCurrentDate } = useDate();
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot
      open={open}
      onOpenChange={() => !notCurrentMonth && setOpen((x) => !x)}
    >
      <DialogTrigger asChild>
        <Cell muted={notCurrentMonth} onClick={() => setCurrentDate(date)}>
          <DateBadge variant={getVariant()}>{date.getDate()}</DateBadge>
        </Cell>
      </DialogTrigger>
      <EditorDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <PlainTextEditor
          content={content}
          title={title}
          close={() => setOpen(false)}
        />
      </EditorDialogContent>
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
const badgeVariants = {
  isWeekend: {
    backgroundColor: "none",
    color: styleTokens.color.slate["200"],
    outlineColor: "none",
  },
  default: {
    backgroundColor: "none",
    color: "inherit",
    outlineColor: "none",
  },
  hasNote: {
    backgroundColor: styleTokens.color.gray[300],
    color: styleTokens.color.slate["300"],
    outlineColor: styleTokens.color.slate[300],
  },
  today: {
    backgroundColor: styleTokens.color.blue,
    color: styleTokens.color.white,
    outlineColor: "none",
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
  outline: 1px solid transparent;
  outline-color: ${({ variant }) => badgeVariants[variant].outlineColor};

  ${styleTokens.media.sm} {
    padding: ${styleTokens.space[2]};
    height: fit-content;
    width: fit-content;
    font-size: ${styleTokens.size["lg"]};
    font-weight: bold;
  }
`;
