import styled from "@emotion/styled";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import type { TransitionStatus } from "react-transition-state";

export interface Transition {
  status: TransitionStatus;
  duration?: number;
}
interface SheetProps extends Transition {
  startRow?: number;
  endRow?: number;
  startCol?: number;
  endCol?: number;
}

export const CalendarSheet = SheetPrimitive.Root;
export const CalendarSheetTrigger = SheetPrimitive.Trigger;
export const CalendarSheetClose = SheetPrimitive.Close;
export const CalendarSheetContent = styled(SheetPrimitive.Content)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  display: grid;
  grid-template-columns: 2rem auto;
  grid-template-rows: 2rem repeat(6, 1fr);
  overflow: hidden;
`;
export const CalendarSheetContentInner = styled.div<SheetProps>`
  pointer-events: auto;
  grid-column: ${({ startCol = 2, endCol = 3 }) => `${startCol} / ${endCol}`};
  grid-row: ${({ startRow = 5, endRow = 8 }) => `${startRow} / ${endRow}`};
  background-color: #fff;
  outline: 1px solid black;
  outline-offset: -0.5px;
  z-index: 1;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  transition: ${({ duration }) =>
    `opacity ${duration ?? 200}ms cubic-bezier(0.25, 1, 0.5, 1), 
    transform ${duration ?? 200}ms cubic-bezier(0.25, 1, 0.5, 1)
    `};

  ${({ status }) =>
    (status === "preEnter" || status === "exiting") &&
    `
      opacity: 0;
      transform: translateY(100%);
    `}
`;
export const CalendarSheetOverlay = styled(SheetPrimitive.Overlay)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;
export const CalendarSheetPortal = SheetPrimitive.Portal;
export const CalendarSheetTitle = SheetPrimitive.Title;
export const CalendarSheetDescription = SheetPrimitive.Description;
