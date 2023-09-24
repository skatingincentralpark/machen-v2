"use client";
import styled from "@emotion/styled";

import {
  SheetClose,
  SheetContentInner,
  SheetDescription,
  SheetOverlay,
  SheetTitle,
} from "@/components/UI/Sheet";
import { ScrollArea } from "@/components/UI/ScrollArea";
import Editor from "@/components/Editor";

const DayCellSheetContent = ({
  localeDateString,
}: {
  localeDateString: string;
}) => {
  return (
    <>
      <SheetContentInner startRow={2}>
        <ScrollArea>
          <ScrollAreaInner>
            <SheetTitle>Note for date: {localeDateString}</SheetTitle>
            <SheetDescription className="sr-only">
              Edit your note here
            </SheetDescription>

            <Editor />

            <SheetClose asChild>
              <button aria-label="Close">Close</button>
            </SheetClose>
            <SheetClose asChild>
              <button>Save changes</button>
            </SheetClose>
          </ScrollAreaInner>
        </ScrollArea>
      </SheetContentInner>

      <SheetClose asChild>
        <SheetOverlay />
      </SheetClose>
    </>
  );
};

export default DayCellSheetContent;

const ScrollAreaInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;
