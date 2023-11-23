"use client";
import styled from "@emotion/styled";

import {
  CalendarSheetClose,
  CalendarSheetContent,
  CalendarSheetContentInner,
  CalendarSheetDescription,
  CalendarSheetOverlay,
  CalendarSheetTitle,
} from "@/components/UI/CalendarSheet";
import { type NoteEditorProps } from "./NoteEditor";

import { media } from "@/lib/media-queries";
import dynamic from "next/dynamic";
import { type TransitionStatus } from "react-transition-state";

const NoteEditor = dynamic(() => import("./NoteEditor"), {
  ssr: false,
  loading: () => <Loading />,
});

const Loading = () => <div role="progressbar">Loading...</div>;

interface Props extends NoteEditorProps {
  localeDateString: string;
  transitionStatus: TransitionStatus;
}

const DayCellCalendarSheetContent = ({
  localeDateString,
  transitionStatus,
  ...props
}: Props) => {
  return (
    <CalendarSheetContent>
      <CalendarSheetContentInnerV2 startRow={2} status={transitionStatus}>
        <Inner>
          <CalendarSheetTitle>
            Note for date: {localeDateString}
          </CalendarSheetTitle>
          <CalendarSheetDescription className="sr-only">
            Edit your note here
          </CalendarSheetDescription>
          <NoteEditor {...props} />
        </Inner>
      </CalendarSheetContentInnerV2>

      <CalendarSheetClose asChild>
        <CalendarSheetOverlay />
      </CalendarSheetClose>
    </CalendarSheetContent>
  );
};

export default DayCellCalendarSheetContent;

const CalendarSheetContentInnerV2 = styled(CalendarSheetContentInner)`
  background-color: var(--subtle-off-white-coloring);
`;
const Inner = styled.div`
  max-width: 50rem;
  background-color: #fff;
  padding: 1rem;
  margin: 0;
  border-radius: var(--border-radius);

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
