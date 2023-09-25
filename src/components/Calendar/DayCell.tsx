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
import { Button } from "@/components/UI/Button";

import { media } from "@/lib/media-queries";
import { weekdays } from "@/lib/date";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
  loading: () => <Loading />,
});

const Loading = () => <div>Loading...</div>;

interface Props {
  date: Date;
  currentDate: Date;
  onClick: (date: Date) => void;
}

const DayCell = ({ date, currentDate, onClick }: Props) => {
  const localeDateString = date.toLocaleDateString(undefined, {
    dateStyle: "long",
  });

  const weekday = weekdays[date.getDay()];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Cell
          onClick={() => onClick(date)}
          highlighted={
            date.toLocaleDateString() === currentDate.toLocaleDateString()
          }
          aria-label={`Select ${weekday}, ${localeDateString}`}
        >
          {date.getDate()}
        </Cell>
      </SheetTrigger>

      <SheetContent>
        <SheetContentInnerV2 startRow={2}>
          <Inner>
            <SheetTitle>Note for date: {localeDateString}</SheetTitle>
            <SheetDescription className="sr-only">
              Edit your note here
            </SheetDescription>

            <Editor />

            <ButtonWrapper>
              <SheetClose asChild>
                <Button aria-label="Close">Close</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button>Save changes</Button>
              </SheetClose>
            </ButtonWrapper>
          </Inner>
        </SheetContentInnerV2>

        <SheetClose asChild>
          <SheetOverlay />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default DayCell;

const SheetContentInnerV2 = styled(SheetContentInner)`
  background-color: var(--subtle-off-white-coloring);
`;
const ButtonWrapper = styled.div`
  display: flex;

  flex-direction: row;
  gap: 0.5rem;
`;
const Inner = styled.div`
  max-width: 50rem;
  background-color: #fff;
  padding: 1rem;
  margin: 0;
  border: 1px solid #ccc;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  height: 100%;

  ${media.sm} {
    margin: 1rem;
    height: calc(100% - 2rem);
  }
`;
const Cell = styled.button<{ highlighted: boolean }>`
  outline: 1px solid black;
  outline-offset: -0.5px;
  aspect-ratio: initial;
  width: 100%;
  background-color: ${({ highlighted }) =>
    highlighted ? "var(--highlight)" : "white"};
  display: flex;
  padding: 0.5rem;

  ${media.sm} {
    aspect-ratio: 1;
  }

  & > div {
    padding: 0.2rem;
  }

  &:focus {
    z-index: 2;
  }
`;
