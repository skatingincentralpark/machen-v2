"use client";
import styled from "@emotion/styled";
import {
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "./UI/Popover";
import { useNotes } from "@/context/NotesContext";
import { Button } from "./UI/Button";

const HeaderMenu = () => {
  const { setDummyNotes } = useNotes();

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <HeaderMenuButton>
          <Circle />
        </HeaderMenuButton>
      </PopoverTrigger>
      <Anchor />
      <PopoverPortal>
        <HeaderMenuContent>
          <PopoverClose asChild className="sr-only">
            <button>Close</button>
          </PopoverClose>
          <p>Set dummy notes for testing</p>
          <PopoverClose asChild>
            <HeaderButton
              onClick={setDummyNotes}
              aria-label="Clear local storage and set some dummy notes"
            >
              Set Dummy Notes
            </HeaderButton>
          </PopoverClose>
        </HeaderMenuContent>
      </PopoverPortal>
    </PopoverRoot>
  );
};

export default HeaderMenu;

const HeaderMenuButton = styled.button`
  padding: 1.5rem 2rem;
  background-color: transparent;

  &:active > * {
    transform: scale(0.5);
    background: white;
  }
`;
const Anchor = styled(PopoverAnchor)`
  position: fixed;
  top: 0;
  left: 0;
`;
const Circle = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  background: black;
  border-radius: 50%;
  transition: 0.5s;
`;
const HeaderMenuContent = styled(PopoverContent)`
  width: 100vw;
  height: 50vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #f2f2f2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  gap: 1rem;
`;
const HeaderButton = styled(Button)`
  width: fit-content;
`;
