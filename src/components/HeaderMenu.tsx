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
          <InfoText>Click the circle for some information!</InfoText>
        </HeaderMenuButton>
      </PopoverTrigger>
      <Anchor />
      <PopoverPortal>
        <HeaderMenuContent>
          <TextContainer>
            <p>
              This web app allows you to record daily notes. It uses{" "}
              <a
                href="https://lexical.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lexical
              </a>
              , as the rich text editor.
            </p>
            <p>You should be able to use the app with just your keyboard.</p>
            <p>
              <strong>Navigate</strong>: `tab` and `shift + tab`{" "}
            </p>
            <p>
              <strong>Select</strong>: `space` or `enter`
            </p>
            <p>
              In some cases you may need to use the arrow keys, such as
              selecting text type in editor menu
            </p>
          </TextContainer>
          <ActionContainer>
            <PopoverClose asChild>
              <Button>Close</Button>
            </PopoverClose>
            <PopoverClose asChild>
              <HeaderButton
                onClick={setDummyNotes}
                aria-label="Clear local storage and set some dummy notes"
              >
                Set Dummy Notes
              </HeaderButton>
            </PopoverClose>
          </ActionContainer>
        </HeaderMenuContent>
      </PopoverPortal>
    </PopoverRoot>
  );
};

export default HeaderMenu;

const TextContainer = styled.div`
  max-width: 20rem;
  text-align: right;
`;
const HeaderMenuButton = styled.button`
  padding: 1.5rem 2rem;
  background-color: transparent;
  position: relative;

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
  background-color: black;
  border-radius: 50%;
  transition: 0.5s;

  animation: colorChange 5s forwards;

  @keyframes colorChange {
    0% {
      background-color: darkorange;
    }
    100% {
      background-color: black;
    }
  }
`;
const HeaderMenuContent = styled(PopoverContent)`
  width: 100vw;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f2f2f2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
`;
const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const HeaderButton = styled(Button)`
  width: fit-content;
`;
const InfoText = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 100%;
  background-color: darkorange;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  width: 15rem;

  animation: fadeOut 5s forwards;
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
