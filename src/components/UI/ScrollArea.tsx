import styled from "@emotion/styled";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

interface Viewport {
  padding?: string;
}
interface Props {
  children: React.ReactNode;
  viewport?: Viewport;
  orientation?: "vertical" | "horizontal";
}

export const ScrollArea = ({ children, viewport, orientation }: Props) => (
  <ScrollAreaRoot>
    <ScrollAreaViewport {...viewport}>{children}</ScrollAreaViewport>
    <ScrollAreaScrollBar orientation={orientation || "vertical"}>
      <ScrollAreaThumb />
    </ScrollAreaScrollBar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
);

const ScrollAreaRoot = styled(ScrollAreaPrimitive.Root)`
  position: relative;
  overflow: hidden;
  --scrollbar-size: 10px;
  height: 100%;
  border-radius: inherit;
`;

const ScrollAreaViewport = styled(ScrollAreaPrimitive.Viewport)<Viewport>`
  position: relative;
  overflow: auto;
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  padding: ${(props) => props.padding || 0};

  & > div {
    height: 100%;
  }
`;

const ScrollAreaScrollBar = styled(ScrollAreaPrimitive.Scrollbar)`
  display: flex;
  user-select: none;
  touch-action: none;
  padding: 2px;
  transition: background 160ms ease-out;

  &[data-orientation="vertical"] {
    width: var(--scrollbar-size);
  }
  &[data-orientation="horizontal"] {
    flex-direction: column;
    height: var(--scrollbar-size);
  }
`;
const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb)`
  flex: 1;
  background: gray;
  position: relative;
`;
const ScrollAreaCorner = styled(ScrollAreaPrimitive.Corner)``;
