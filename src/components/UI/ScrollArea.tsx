import styled from "@emotion/styled";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

export const ScrollArea = ({ children }: { children: React.ReactNode }) => (
  <ScrollAreaRoot>
    <ScrollAreaViewport>{children}</ScrollAreaViewport>
    <ScrollAreaScrollBar orientation="vertical">
      <ScrollAreaThumb />
    </ScrollAreaScrollBar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
);

const ScrollAreaRoot = styled(ScrollAreaPrimitive.Root)`
  position: relative;
  overflow: hidden;
  --scrollbar-size: 10px;
`;

const ScrollAreaViewport = styled(ScrollAreaPrimitive.Viewport)`
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  padding-right: 2px;
`;

const ScrollAreaScrollBar = styled(ScrollAreaPrimitive.Scrollbar)`
  display: flex;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;
  padding: 2px;
  background: lightgray;
  transition: background 160ms ease-out;

  &:hover {
    background: #b8b8b8;
  }
  &[data-orientation="vertical"] {
    width: var(--scrollbar-size);
  }
  &[data-orientation="horizontal"] {
    flex-direction: column;
    height: var(--scrollbar-size);
  }
`;
const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb)`
  & {
    flex: 1;
    background: gray;
    position: relative;
  }
  /* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
`;
const ScrollAreaCorner = styled(ScrollAreaPrimitive.Corner)``;
