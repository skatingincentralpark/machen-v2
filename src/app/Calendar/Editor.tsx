import styled from "@emotion/styled";
import { DialogClose, DialogContent } from "../UI/Dialog";
import { styleTokens } from "@/lib/style-tokens";
import { useDate } from "@/context/DateContext";
import { ChevronRight } from "lucide-react";
import { useNotesV2 } from "@/context/NotesContextV2";
import { ButtonBase } from "../UI/Button";
import { useEffect, useRef } from "react";

export default function Editor({
  title,
  content,
}: {
  title: string | undefined;
  content: string | undefined;
}) {
  const { medDateString, currentDate } = useDate();
  const { saveNote } = useNotesV2();
  const dateStringSplit = medDateString.split(" ");

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  console.log("rendering editor");

  const handleSave = () => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (!title && !content)
      return console.error("title and content are both empty");

    /**
     * title and no content should be allowed
     * content and no title should be allowed
     */
    if (title && content) {
      saveNote(title, content, currentDate);
    }
  };

  return (
    <Content>
      <Left>
        <h2>
          <strong>
            {dateStringSplit[0]} {dateStringSplit[1]}{" "}
          </strong>
          {dateStringSplit[2]}
        </h2>
        <DialogClose asChild>
          <button>
            <ChevronRight />
          </button>
        </DialogClose>
      </Left>
      <Main>
        <Input ref={titleRef} placeholder="Title" defaultValue={title}></Input>
        <TextArea
          ref={contentRef}
          placeholder="Write something here..."
          defaultValue={content}
          name=""
          id=""
        ></TextArea>
        <DialogClose asChild>
          <ButtonBase onClick={handleSave}>Save</ButtonBase>
        </DialogClose>
        <DialogClose asChild>
          <ButtonBase>Delete</ButtonBase>
        </DialogClose>
      </Main>
    </Content>
  );
}

const Content = styled(DialogContent)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;

  background: linear-gradient(270deg, #dde3e4, #dcedf0);
  background-size: 600% 600%;

  animation: AnimationName 30s ease infinite;

  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  display: flex;
`;
const Left = styled.div`
  background-color: ${styleTokens.color.white};
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  padding: ${styleTokens.space[4]} ${styleTokens.space[2]};
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > h2 {
    font-weight: normal;
  }

  & > svg {
    width: 100%;
  }
`;
const Main = styled.div`
  padding: ${styleTokens.space[4]};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30rem;
  height: 100%;
`;
const TextArea = styled.textarea`
  padding: ${styleTokens.space[4]} ${styleTokens.space[2]};
  background-color: transparent;
  border: 1px dashed ${styleTokens.color.slate[300]};
  height: 100%;

  font-family: "Courier New", Courier, monospace;

  &:focus {
    border-color: ${styleTokens.color.gray[400]};
    outline: none;
  }

  ${styleTokens.media.sm} {
    max-height: 30rem;
  }
`;
const Input = styled.input`
  padding: ${styleTokens.space[4]} ${styleTokens.space[2]};
  background-color: transparent;
  border: 1px dashed ${styleTokens.color.slate[300]};
  border-bottom: none;

  font-family: "Courier New", Courier, monospace;

  &:focus {
    border-color: ${styleTokens.color.gray[400]};
    outline: none;
  }
`;
