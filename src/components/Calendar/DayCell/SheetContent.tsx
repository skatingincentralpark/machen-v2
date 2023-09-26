"use client";
import styled from "@emotion/styled";

import {
  SheetClose,
  SheetContent,
  SheetContentInner,
  SheetDescription,
  SheetOverlay,
  SheetTitle,
} from "@/components/UI/Sheet";
import { type NoteEditorProps } from "./NoteEditor";

import { media } from "@/lib/media-queries";
import dynamic from "next/dynamic";

const NoteEditor = dynamic(() => import("./NoteEditor"), {
  ssr: false,
  loading: () => <Loading />,
});

const Loading = () => <div>Loading...</div>;

interface Props extends NoteEditorProps {
  localeDateString: string;
}

const DayCellSheetContent = ({ localeDateString, ...props }: Props) => {
  return (
    <SheetContent>
      <SheetContentInnerV2 startRow={2}>
        <Inner>
          <SheetTitle>Note for date: {localeDateString}</SheetTitle>
          <SheetDescription className="sr-only">
            Edit your note here
          </SheetDescription>
          <NoteEditor {...props} />
        </Inner>
      </SheetContentInnerV2>

      <SheetClose asChild>
        <SheetOverlay />
      </SheetClose>
    </SheetContent>
  );
};

export default DayCellSheetContent;

const SheetContentInnerV2 = styled(SheetContentInner)`
  background-color: var(--subtle-off-white-coloring);
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
  width: 100%;

  ${media.sm} {
    margin: 1rem;
    height: calc(100% - 2rem);
    width: calc(100% - 2rem);
  }
`;
