import styled from "@emotion/styled";
import { DialogClose, DialogContent } from "../UI/Dialog";
import { styleTokens } from "@/lib/style-tokens";
import { useDate } from "@/context/DateContext";
import { ChevronRight } from "lucide-react";
import { useNotesV2 } from "@/context/NotesContextV2";
import { ButtonBase } from "../UI/Button";
import { useEffect, useRef, useState } from "react";

export default function PlainTextEditor({
  title,
  content,
  close,
}: {
  title: string | undefined;
  content: string | undefined;
  close: () => void;
}) {
  const { medDateString, currentDate } = useDate();
  const { saveNote, deleteNote } = useNotesV2();
  const dateStringSplit = medDateString.split(" ");

  const initialEditorEmpty = !title && !content;

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.value;

    if (!content) {
      setError("Content is required");
      return contentRef.current?.focus();
    }

    saveNote(title, content, currentDate);
    close();
  };

  return (
    <>
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
      <Form onSubmit={(e) => e.preventDefault()}>
        <Input ref={titleRef} placeholder="Title" defaultValue={title}></Input>
        <TextArea
          ref={contentRef}
          placeholder="Write something here..."
          defaultValue={content}
          name=""
          id=""
        />
        {error && <Error>{error}</Error>}

        <ButtonWrapper>
          <Button onClick={handleSave}>Save</Button>
          {!initialEditorEmpty && (
            <DialogClose asChild>
              <Button onClick={() => deleteNote(currentDate)}>Delete</Button>
            </DialogClose>
          )}
        </ButtonWrapper>
      </Form>
    </>
  );
}

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
const Form = styled.form`
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
const ButtonWrapper = styled.div`
  margin-top: ${styleTokens.space[4]};
  display: flex;
  gap: ${styleTokens.space[2]};
`;
const Button = styled(ButtonBase)`
  padding: ${styleTokens.space[2]} ${styleTokens.space[4]};
  background-color: transparent;
  border: 1px dashed ${styleTokens.color.slate[300]};
  color: ${styleTokens.color.gray[400]};
  flex-grow: 1;
  text-align: center;
  justify-content: center;
`;
const Error = styled.p`
  color: ${styleTokens.color.orange};
  font-size: ${styleTokens.size.xs};
`;

export const EditorDialogContent = styled(DialogContent)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100dvh;
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
