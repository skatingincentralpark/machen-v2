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
import { ScrollArea } from "@/components/UI/ScrollArea";
import { media } from "@/lib/media-queries";

interface Props {
  date: Date;
  currentDate: Date;
  onClick: (date: Date) => void;
}

const DayCell = ({ date, currentDate, onClick }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Cell
          onClick={() => onClick(date)}
          highlighted={
            date.toLocaleDateString() === currentDate.toLocaleDateString()
          }
        >
          {date.getDate()}
        </Cell>
      </SheetTrigger>

      <SheetContent>
        <SheetContentInner startRow={2}>
          <ScrollArea>
            <SheetTitle>
              Note for date:{" "}
              {date.toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            </SheetTitle>
            <SheetDescription className="sr-only">
              Edit your note here
            </SheetDescription>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
              quod labore qui accusantium deleniti voluptas quaerat nostrum
              voluptates incidunt necessitatibus rem fugiat, quis non dolor ab
              quae natus ad. Mollitia?
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor,
              voluptas ad quisquam voluptatibus nisi sapiente autem nostrum
              consectetur libero eius hic quia quo, quasi dolores, provident
              quibusdam ullam laborum ut? Error culpa sapiente dolorem molestiae
              cumque nostrum?
            </p>
            <p>
              Quasi eaque quis cumque dignissimos, exercitationem accusamus? Ut
              expedita ipsam incidunt reprehenderit harum est, amet
              necessitatibus sapiente minus voluptate, facere aliquam alias
              voluptatum.
            </p>
            <p>
              Quasi eaque quis cumque dignissimos, exercitationem accusamus? Ut
              expedita ipsam incidunt reprehenderit harum est, amet
              necessitatibus sapiente minus voluptate, facere aliquam alias
              voluptatum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
              quod labore qui accusantium deleniti voluptas quaerat nostrum
              voluptates incidunt necessitatibus rem fugiat, quis non dolor ab
              quae natus ad. Mollitia?
            </p>
            <SheetClose asChild>
              <button>Save changes</button>
            </SheetClose>
            <SheetClose asChild>
              <button aria-label="Close">Close</button>
            </SheetClose>
          </ScrollArea>
        </SheetContentInner>

        <SheetClose asChild>
          <SheetOverlay />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default DayCell;

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
